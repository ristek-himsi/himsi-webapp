"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getImageUrl } from "@/lib/supabase";
import { UserIcon, FolderIcon } from "lucide-react";
import Loading from "@/app/loading";

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
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 py-4 sm:py-6 px-4 sm:px-6">
        <div className="max-w-md sm:max-w-7xl mx-auto">
          <div className="bg-rose-50 shadow-sm rounded-md p-4 border border-rose-200 text-rose-800">
            <p className="font-semibold text-base sm:text-lg">Error</p>
            <p className="text-sm sm:text-base">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-4 sm:py-6 px-4 sm:px-6">
      <div className="max-w-md sm:max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">Daftar Divisi</h1>
          <button
            onClick={() => router.push("/admin/divisions/create")}
            className="w-full sm:w-auto px-5 py-2.5 bg-teal-600 text-white rounded-md hover:bg-teal-700 hover:scale-105 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-transform text-sm text-center"
          >
            Tambah Divisi
          </button>
        </div>

        {divisions.length === 0 ? (
          <div className="bg-amber-50 shadow-sm rounded-md p-4 border border-amber-200 text-amber-800">
            <p className="text-sm sm:text-base">Tidak ada divisi yang ditemukan. Silakan tambah divisi baru.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {divisions.map((division) => (
              <div key={division.id} className="border rounded-md p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col items-center mb-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mb-3 relative">
                    <Image src={getDivisionImageUrl(division?.logoUrl)} alt={`Logo ${division.name}`} fill className="object-contain" />
                  </div>
                  <h2 className="text-base sm:text-lg font-semibold text-slate-800 text-center">{division.name}</h2>
                </div>

                <p className="text-sm sm:text-base text-slate-600 mb-4 line-clamp-4">{division.description}</p>

                {division.leader && (
                  <div className="flex items-center mt-4 mb-3 p-3 bg-teal-50 rounded-md">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 relative mr-3">
                      <Image src={getUserAvatar(division?.leader?.photo_url)} alt={division.leader.name} fill className="object-cover rounded-full" />
                    </div>
                    <div>
                      <p className="font-medium text-sm sm:text-base text-slate-800">{division.leader.name}</p>
                      <p className="text-xs sm:text-sm text-slate-600">Ketua Divisi</p>
                    </div>
                  </div>
                )}

                <div className="flex justify-between my-3">
                  <div className="flex items-center">
                    <UserIcon size={14} className="text-teal-600 mr-1" />
                    <span className="text-xs sm:text-sm font-medium text-slate-700">
                      {division.memberCount} {division.memberCount === 1 ? "Anggota" : "Anggota"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FolderIcon size={14} className="text-teal-600 mr-1" />
                    <span className="text-xs sm:text-sm font-medium text-slate-700">
                      {division.programCount} {division.programCount === 1 ? "Program" : "Program"}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex flex-row justify-center space-x-2">
                  <button
                    onClick={() => router.push(`/admin/divisions/${division.id}`)}
                    className="px-3 w-1/3 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 hover:scale-105 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-transform text-xs"
                  >
                    Detail
                  </button>
                  <button
                    onClick={() => router.push(`/admin/divisions/${division.id}/edit`)}
                    className="px-3 py-2 w-1/3 bg-amber-600 text-white rounded-md hover:bg-amber-700 hover:scale-105 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-transform text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleOpenDeleteModal(division)}
                    className="px-3 w-1/3 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 hover:scale-105 focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 transition-transform text-xs"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {deleteModalOpen && (
          <div className="fixed inset-0 bg-slate-900 bg-opacity-50 flex items-center justify-center z-50 transition-all">
            <div className="bg-white rounded-md p-4 sm:p-6 max-w-sm sm:max-w-md w-full shadow-md">
              <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-4">Konfirmasi Hapus</h3>
              <p className="text-sm sm:text-base text-slate-600 mb-6">Apakah Anda yakin ingin menghapus divisi "{divisionToDelete?.name}"? Tindakan ini tidak dapat dibatalkan.</p>
              <div className="flex justify-end space-x-3">
                <button onClick={handleCloseDeleteModal} className="px-5 py-2.5 bg-teal-600 text-white rounded-md hover:bg-teal-700 hover:scale-105 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-transform text-sm">
                  Batal
                </button>
                <button onClick={handleDeleteDivision} className="px-5 py-2.5 bg-rose-600 text-white rounded-md hover:bg-rose-700 hover:scale-105 focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 transition-transform text-sm">
                  Hapus
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DivisionsPage;
