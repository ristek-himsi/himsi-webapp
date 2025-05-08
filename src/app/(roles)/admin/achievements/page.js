"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Plus, Eye } from "lucide-react";

const AchievementsPage = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [achievementToDelete, setAchievementToDelete] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/achievements");
        const data = await res.json();

        if (data.success) {
          setAchievements(data.data);
        } else {
          setError(data.message || "Gagal memuat data pencapaian");
        }
      } catch (err) {
        setError("Terjadi kesalahan saat memuat data: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  const handleOpenDeleteModal = (achievement) => {
    setAchievementToDelete(achievement);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setAchievementToDelete(null);
  };

  const handleDeleteAchievement = async () => {
    if (!achievementToDelete) return;

    try {
      const res = await fetch(`/api/achievements/${achievementToDelete.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        setAchievements(achievements.filter((ach) => ach.id !== achievementToDelete.id));
        handleCloseDeleteModal();
      } else {
        setError(data.message || "Gagal menghapus pencapaian");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat menghapus pencapaian: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 bg-gray-50">
        <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Daftar Pencapaian</h1>
          <div className="h-10 w-32 bg-blue-100 rounded-lg animate-pulse"></div>
        </div>
        <div className="sm:hidden space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white shadow-md p-4 rounded-lg animate-pulse">
              <div className="space-y-3">
                <div className="h-5 bg-blue-100 rounded w-3/4"></div>
                <div className="h-4 bg-blue-100 rounded w-1/2"></div>
                <div className="h-4 bg-blue-100 rounded w-1/4"></div>
                <div className="flex space-x-3">
                  <div className="h-8 bg-blue-100 rounded w-16"></div>
                  <div className="h-8 bg-blue-100 rounded w-16"></div>
                  <div className="h-8 bg-blue-100 rounded w-16"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="hidden sm:block bg-white shadow-md rounded-lg overflow-hidden">
          <div role="table" aria-describedby="achievements-table" className="min-w-full divide-y divide-gray-200">
            <div role="rowgroup" className="bg-blue-50">
              <div role="row" className="flex">
                <div role="columnheader" className="px-4 py-3 text-left text-sm font-semibold text-blue-900 flex-1">
                  Judul
                </div>
                <div role="columnheader" className="px-4 py-3 text-left text-sm font-semibold text-blue-900 flex-1">
                  Divisi
                </div>
                <div role="columnheader" className="px-4 py-3 text-left text-sm font-semibold text-blue-900 flex-1">
                  Tanggal
                </div>
                <div role="columnheader" className="px-4 py-3 text-left text-sm font-semibold text-blue-900 flex-1">
                  Aksi
                </div>
              </div>
            </div>
            <div role="rowgroup">
              {[...Array(3)].map((_, index) => (
                <div key={index} role="row" className="flex">
                  <div role="cell" className="px-4 py-3 flex-1">
                    <div className="h-4 bg-blue-100 rounded w-3/4 animate-pulse"></div>
                  </div>
                  <div role="cell" className="px-4 py-3 flex-1">
                    <div className="h-4 bg-blue-100 rounded w-1/2 animate-pulse"></div>
                  </div>
                  <div role="cell" className="px-4 py-3 flex-1">
                    <div className="h-4 bg-blue-100 rounded w-1/4 animate-pulse"></div>
                  </div>
                  <div role="cell" className="px-4 py-3 flex-1">
                    <div className="flex space-x-4">
                      <div className="h-4 bg-blue-100 rounded w-4 animate-pulse"></div>
                      <div className="h-4 bg-blue-100 rounded w-4 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Daftar Pencapaian</h1>
        <button onClick={() => router.push("/admin/achievements/create")} className="flex items-center px-5 py-2.5 bg-blue-900 text-white rounded-lg hover:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Tambah Pencapaian
        </button>
      </div>

      {achievements.length === 0 ? (
        <div className="bg-yellow-50 shadow-md rounded-lg p-5 border border-yellow-200 text-yellow-900">
          <p className="text-base">Tidak ada pencapaian yang ditemukan. Silakan tambah pencapaian baru.</p>
        </div>
      ) : (
        <div className="sm:hidden space-y-4">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-base font-semibold text-gray-900">{achievement.title}</h3>
              <p className="text-sm text-gray-600 mt-1">Divisi: {achievement.division?.name}</p>
              <p className="text-sm text-gray-600 mt-1">Tanggal: {new Date(achievement.date).toLocaleDateString()}</p>
              <div className="mt-3 flex space-x-3">
                <button
                  onClick={() => router.push(`/admin/achievements/${achievement.id}`)}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center"
                >
                  <Eye className="w-4 h-4 mr-1" /> Detail
                </button>
                <button
                  onClick={() => router.push(`/admin/achievements/${achievement.id}/edit`)}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center"
                >
                  <Pencil className="w-4 h-4 mr-1" /> Edit
                </button>
                <button onClick={() => handleOpenDeleteModal(achievement)} className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center">
                  <Trash2 className="w-4 h-4 mr-1" /> Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {achievements.length > 0 && (
        <div className="hidden sm:block bg-white shadow-md rounded-lg overflow-hidden">
          <div role="table" aria-describedby="achievements-table" className="min-w-full divide-y divide-gray-200">
            <div role="rowgroup" className="bg-blue-50">
              <div role="row" className="flex">
                <div role="columnheader" className="px-4 py-3 text-left text-sm font-semibold text-blue-900 flex-1">
                  Judul
                </div>
                <div role="columnheader" className="px-4 py-3 text-left text-sm font-semibold text-blue-900 flex-1">
                  Divisi
                </div>
                <div role="columnheader" className="px-4 py-3 text-left text-sm font-semibold text-blue-900 flex-1">
                  Tanggal
                </div>
                <div role="columnheader" className="px-4 py-3 text-left text-sm font-semibold text-blue-900 flex-1">
                  Aksi
                </div>
              </div>
            </div>
            <div role="rowgroup">
              {achievements.map((achievement) => (
                <div key={achievement.id} role="row" className="flex odd:bg-white even:bg-blue-25 hover:bg-blue-100 transition-colors">
                  <div role="cell" className="px-4 py-3 text-base text-gray-900 flex-1">
                    {achievement.title}
                  </div>
                  <div role="cell" className="px-4 py-3 text-base text-gray-900 flex-1">
                    {achievement.division?.name}
                  </div>
                  <div role="cell" className="px-4 py-3 text-base text-gray-900 flex-1">
                    {new Date(achievement.date).toLocaleDateString()}
                  </div>
                  <div role="cell" className="px-4 py-3 flex space-x-3 flex-1">
                    <button
                      onClick={() => router.push(`/admin/achievements/${achievement.id}`)}
                      className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center"
                    >
                      <Eye className="w-4 h-4 mr-1" /> Detail
                    </button>
                    <button
                      onClick={() => router.push(`/admin/achievements/${achievement.id}/edit`)}
                      className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center"
                    >
                      <Pencil className="w-4 h-4 mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => handleOpenDeleteModal(achievement)}
                      className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center"
                    >
                      <Trash2 className="w-4 h-4 mr-1" /> Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-5 sm:p-6 max-w-sm sm:max-w-md w-full shadow-xl">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Konfirmasi Hapus</h3>
            <p className="text-base text-gray-600 mb-6">Apakah Anda yakin ingin menghapus pencapaian "{achievementToDelete?.title}"? Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex justify-end space-x-3">
              <button onClick={handleCloseDeleteModal} className="py-2.5 px-5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                Batal
              </button>
              <button onClick={handleDeleteAchievement} className="py-2.5 px-5 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementsPage;
