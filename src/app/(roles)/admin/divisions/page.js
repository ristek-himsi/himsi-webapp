"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getImageUrl } from "@/lib/supabase";
import { UserIcon, FolderIcon } from "lucide-react"; // Import ikon

const DivisionsPage = () => {
  const [divisions, setDivisions] = useState([]);
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
        // Remove the division from the state
        setDivisions(divisions.filter((div) => div.id !== divisionToDelete.id));
        handleCloseDeleteModal();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Terjadi kesalahan saat menghapus divisi: " + err.message);
    }
  };

  // Function to get the appropriate image URL
  const getDivisionImageUrl = (logoUrl) => {
    if (!logoUrl) return "/placeholder-logo.png"; // Default placeholder if no logo

    if (logoUrl.startsWith("http")) {
      return logoUrl; // Already a complete URL
    }

    // Extract filename from path
    const fileName = logoUrl.includes("/") ? logoUrl.split("/").pop() : logoUrl;

    return getImageUrl(fileName, "divisi");
  };

  // Function to get user avatar
  const getUserAvatar = (photoUrl) => {
    if (!photoUrl) return "/placeholder-avatar.png";

    if (photoUrl.startsWith("http")) {
      return photoUrl;
    }

    return getImageUrl(photoUrl, "users");
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Daftar Divisi</h1>
          <div className="h-10 w-28 bg-gray-200 rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="border rounded-lg p-6 bg-white shadow-sm">
              <div className="animate-pulse flex flex-col space-y-4">
                <div className="rounded-full bg-gray-200 h-12 w-12 mx-auto"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="flex space-x-2 justify-center">
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
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
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Daftar Divisi</h1>
        <button onClick={() => router.push("/admin/divisions/create")} className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Tambah Divisi
        </button>
      </div>

      {divisions.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-md">
          <p>Tidak ada divisi yang ditemukan. Silakan tambah divisi baru.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {divisions.map((division) => (
            <div key={division.id} className="border rounded-lg p-6 bg-white shadow-sm">
              <div className="flex flex-col items-center mb-4">
                <div className="w-16 h-16 mb-2 relative">
                  <Image src={getDivisionImageUrl(division.logoUrl)} alt={`Logo ${division.name}`} fill className="object-contain" />
                </div>
                <h2 className="text-xl font-semibold text-center">{division.name}</h2>
              </div>

              <p className="text-gray-600 mb-4 text-sm line-clamp-3">{division.description}</p>

              {/* Informasi ketua divisi */}
              {division.leader && (
                <div className="flex items-center mt-4 mb-3 p-2 bg-blue-50 rounded-md">
                  <div className="w-10 h-10 relative mr-3">
                    <Image src={getUserAvatar(division.leader.photo_url)} alt={division.leader.name} fill className="object-cover rounded-full" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{division.leader.name}</p>
                    <p className="text-xs text-gray-500">Ketua Divisi</p>
                  </div>
                </div>
              )}

              {/* Jumlah anggota dan program */}
              <div className="flex justify-between my-3">
                <div className="flex items-center">
                  <UserIcon size={16} className="text-gray-500 mr-1" />
                  <span className="text-sm text-gray-600">
                    {division.memberCount} {division.memberCount === 1 ? "Anggota" : "Anggota"}
                  </span>
                </div>
                <div className="flex items-center">
                  <FolderIcon size={16} className="text-gray-500 mr-1" />
                  <span className="text-sm text-gray-600">
                    {division.programCount} {division.programCount === 1 ? "Program" : "Program"}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex justify-center space-x-2">
                <button onClick={() => router.push(`/admin/divisions/${division.id}`)} className="bg-blue-100 text-blue-700 py-1 px-3 rounded-md hover:bg-blue-200">
                  Detail
                </button>
                <button onClick={() => router.push(`/admin/divisions/${division.id}/edit`)} className="bg-yellow-100 text-yellow-700 py-1 px-3 rounded-md hover:bg-yellow-200">
                  Edit
                </button>
                <button onClick={() => handleOpenDeleteModal(division)} className="bg-red-100 text-red-700 py-1 px-3 rounded-md hover:bg-red-200">
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h3>
            <p className="mb-6">Apakah Anda yakin ingin menghapus divisi "{divisionToDelete?.name}"? Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex justify-end space-x-3">
              <button onClick={handleCloseDeleteModal} className="py-2 px-4 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
                Batal
              </button>
              <button onClick={handleDeleteDivision} className="py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700">
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
