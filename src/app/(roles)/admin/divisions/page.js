"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getImageUrl } from "@/lib/supabase";
import { UserIcon, FolderIcon } from "lucide-react";

const DivisionsPage = () => {
  const [divisions, setDivisions] = useState([]);
  console.log(divisions);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [divisionToDelete, setDivisionToDelete] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/divisions");
        const data = await res.json();

        if (data.success) {
          setDivisions(data.data);
        } else {
          setError(data.message || "Gagal memuat data divisi");
        }
      } catch (err) {
        setError("Terjadi kesalahan saat memuat data: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDivisions();
  }, []);

  const handleOpenDeleteModal = (division) => {
    setDivisionToDelete(division);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setDivisionToDelete(null);
  };

  const handleDeleteDivision = async () => {
    if (!divisionToDelete) return;

    try {
      const res = await fetch(`/api/divisions/${divisionToDelete.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        setDivisions(divisions.filter((div) => div.id !== divisionToDelete.id));
        handleCloseDeleteModal();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Terjadi kesalahan saat menghapus divisi: " + err.message);
    }
  };

  const getDivisionImageUrl = (logoUrl) => {
    if (!logoUrl) return "/placeholder-logo.png";
    if (logoUrl.startsWith("http")) return logoUrl;
    const fileName = logoUrl.includes("/") ? logoUrl.split("/").pop() : logoUrl;
    return getImageUrl(fileName, "divisi");
  };

  const getUserAvatar = (photoUrl) => {
    if (!photoUrl) return "/placeholder-avatar.png";
    if (photoUrl.startsWith("http")) return photoUrl;
    return getImageUrl(photoUrl, "users");
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 bg-gray-50">
        <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Daftar Divisi</h1>
          <div className="h-10 w-32 bg-blue-100 rounded-lg animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="border rounded-lg p-4 sm:p-5 bg-white shadow-md">
              <div className="animate-pulse ease-in-out flex flex-col space-y-4">
                <div className="rounded-full bg-blue-100 h-12 w-12 sm:h-16 sm:w-16 mx-auto"></div>
                <div className="h-6 bg-blue-100 rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-blue-100 rounded w-full"></div>
                <div className="h-4 bg-blue-100 rounded w-full"></div>
                <div className="flex space-x-3 justify-center">
                  <div className="h-8 bg-blue-100 rounded w-20"></div>
                  <div className="h-8 bg-blue-100 rounded w-20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 bg-gray-50">
        <div className="bg-red-50 shadow-md rounded-lg p-5 border border-red-200 text-red-900">
          <p className="font-bold text-lg">Error</p>
          <p className="text-base">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Daftar Divisi</h1>
        <button
          onClick={() => router.push("/admin/divisions/create")}
          className="bg-blue-900 cursor-pointer text-white py-2 px-5 rounded-lg hover:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-base w-full sm:w-auto text-center"
        >
          Tambah Divisi
        </button>
      </div>

      {divisions.length === 0 ? (
        <div className="bg-yellow-50 shadow-md rounded-lg p-5 border border-yellow-200 text-yellow-900">
          <p className="text-base">Tidak ada divisi yang ditemukan. Silakan tambah divisi baru.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {divisions.map((division) => (
            <div key={division.id} className="border rounded-lg p-4 sm:p-5 bg-white shadow-md hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center mb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mb-3 relative">
                  <Image src={getImageUrl(division?.logoUrl, "divisi")} alt={`Logo ${division.name}`} fill className="object-contain" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 text-center">{division.name}</h2>
              </div>

              <p className="text-base text-gray-600 mb-4 line-clamp-4">{division.description}</p>

              {division.leader && (
                <div className="flex items-center mt-4 mb-3 p-3 bg-blue-100 rounded-lg">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 relative mr-3">
                    <Image src={getImageUrl(division?.leader?.photo_url, "users")} alt={division.leader.name} fill className="object-cover rounded-full" />
                  </div>
                  <div>
                    <p className="font-medium text-base">{division.leader.name}</p>
                    <p className="text-sm text-gray-600">Ketua Divisi</p>
                  </div>
                </div>
              )}

              <div className="flex justify-between my-3">
                <div className="flex items-center">
                  <UserIcon size={16} className="text-blue-600 mr-1" />
                  <span className="text-sm font-medium text-gray-700">
                    {division.memberCount} {division.memberCount === 1 ? "Anggota" : "Anggota"}
                  </span>
                </div>
                <div className="flex items-center">
                  <FolderIcon size={16} className="text-blue-600 mr-1" />
                  <span className="text-sm font-medium text-gray-700">
                    {division.programCount} {division.programCount === 1 ? "Program" : "Program"}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex justify-center space-x-3">
                <button
                  onClick={() => router.push(`/admin/divisions/${division.id}`)}
                  className="bg-blue-600 cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-base"
                >
                  Detail
                </button>
                <button
                  onClick={() => router.push(`/admin/divisions/${division.id}/edit`)}
                  className="bg-yellow-600 cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-yellow-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-base"
                >
                  Edit
                </button>
                <button onClick={() => handleOpenDeleteModal(division)} className="bg-red-600 cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-base">
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-5 sm:p-6 max-w-sm sm:max-w-md w-full shadow-xl">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Konfirmasi Hapus</h3>
            <p className="text-base text-gray-600 mb-6">Apakah Anda yakin ingin menghapus divisi "{divisionToDelete?.name}"? Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex justify-end space-x-3">
              <button onClick={handleCloseDeleteModal} className="py-2.5 px-5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                Batal
              </button>
              <button onClick={handleDeleteDivision} className="py-2.5 px-5 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DivisionsPage;
