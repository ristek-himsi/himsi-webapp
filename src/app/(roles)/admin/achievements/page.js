"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Plus } from "lucide-react";

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
      <div className="p-6">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Daftar Pencapaian</h1>
          <div className="h-10 w-28 bg-gray-200 rounded"></div>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Divisi</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[...Array(3)].map((_, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-4">
                      <div className="h-4 bg-gray-200 rounded w-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-4"></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
        <h1 className="text-2xl font-bold">Daftar Pencapaian</h1>
        <button onClick={() => router.push("/admin/achievements/create")} className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
          <Plus className="w-4 h-4 mr-2" />
          Tambah Pencapaian
        </button>
      </div>

      {achievements.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-md">
          <p>Tidak ada pencapaian yang ditemukan. Silakan tambah pencapaian baru.</p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Divisi</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {achievements.map((achievement) => (
                <tr key={achievement.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{achievement.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{achievement.division?.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(achievement.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button onClick={() => router.push(`/admin/achievements/${achievement.id}`)} className="text-blue-600 hover:text-blue-900 mr-4">
                      Detail
                    </button>
                    <button onClick={() => router.push(`/admin/achievements/${achievement.id}/edit`)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleOpenDeleteModal(achievement)} className="text-red-600 hover:text-red-900">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h3>
            <p className="mb-6">Apakah Anda yakin ingin menghapus pencapaian "{achievementToDelete?.title}"? Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex justify-end space-x-3">
              <button onClick={handleCloseDeleteModal} className="py-2 px-4 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
                Batal
              </button>
              <button onClick={handleDeleteAchievement} className="py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700">
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
