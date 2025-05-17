"use client";

import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Plus, Eye } from "lucide-react";
import DeleteAchievementForm from "./components/DeleteAchievementForm";
import { getImageUrl } from "@/lib/supabase";
import Loading from "@/app/loading";

// Komponen untuk fetching dan menampilkan achievements
const AchievementsList = () => {
  const [achievements, setAchievements] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const router = useRouter();

  React.useEffect(() => {
    const fetchAchievements = async () => {
      setIsLoading(true);
      try {
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
        setIsLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  if (error) {
    return (
      <div className="bg-red-50 shadow-md rounded-lg p-5 border border-red-200 text-red-900">
        <p className="font-bold text-lg">Error</p>
        <p className="text-base">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {/* Loading skeleton for mobile view */}
        <div className="sm:hidden space-y-4">
          {[1, 2, 3].map((index) => (
            <div key={index} className="bg-white shadow-md p-4 rounded-lg animate-pulse">
              <div className="w-full h-32 bg-gray-200 rounded-md mb-3"></div>
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
              <div className="flex space-x-3 mt-3">
                <div className="h-9 bg-gray-200 rounded-lg w-1/2"></div>
                <div className="h-9 bg-gray-200 rounded-lg w-1/2"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading skeleton for desktop view (table) */}
        <div className="hidden sm:block bg-white shadow-md rounded-lg overflow-hidden">
          <div role="table" className="min-w-full divide-y divide-gray-200">
            <div role="rowgroup" className="bg-blue-50">
              <div role="row" className="flex">
                <div role="columnheader" className="px-4 py-3 text-left text-sm font-semibold text-blue-900 w-20">
                  Gambar
                </div>
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
              {[1, 2, 3, 4].map((index) => (
                <div key={index} role="row" className="flex odd:bg-white even:bg-blue-25 animate-pulse">
                  <div role="cell" className="px-4 py-3 w-20">
                    <div className="w-12 h-12 bg-gray-200 rounded"></div>
                  </div>
                  <div role="cell" className="px-4 py-3 flex-1">
                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  </div>
                  <div role="cell" className="px-4 py-3 flex-1">
                    <div className="h-5 bg-gray-200 rounded w-1/2"></div>
                  </div>
                  <div role="cell" className="px-4 py-3 flex-1">
                    <div className="h-5 bg-gray-200 rounded w-1/2"></div>
                  </div>
                  <div role="cell" className="px-4 py-3 flex space-x-3">
                    <div className="h-9 bg-gray-200 rounded-lg w-16"></div>
                    <div className="h-9 bg-gray-200 rounded-lg w-16"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {achievements.length === 0 ? (
        <div className="bg-yellow-50 shadow-md rounded-lg p-5 border border-yellow-200 text-yellow-900">
          <p className="text-base">Tidak ada pencapaian yang ditemukan. Silakan tambah pencapaian baru.</p>
        </div>
      ) : (
        <>
          <div className="sm:hidden space-y-4">
            {achievements.map((achievement) => {
              const AchievementPreviewImage = achievement.imageUrl ? getImageUrl(achievement.imageUrl, "achievements") : "/placeholder-image.jpg";
              return (
                <div key={achievement.id} className="bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition-shadow">
                  <img src={AchievementPreviewImage} alt={achievement.title} className="w-full h-32 object-cover rounded-md mb-3" />
                  <h3 className="text-base font-semibold text-gray-900">{achievement.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">Divisi: {achievement.division?.name}</p>
                  <p className="text-sm text-gray-600 mt-1">Tanggal: {new Date(achievement.date).toLocaleDateString()}</p>
                  <div className="mt-3 flex space-x-3">
                    <button
                      onClick={() => router.push(`/admin/achievements/${achievement.id}/edit`)}
                      className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full justify-center transition-colors flex items-center"
                    >
                      <Pencil className="w-4 h-4 mr-1" /> Edit
                    </button>
                    <DeleteAchievementForm id={achievement?.id} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="hidden sm:block bg-white shadow-md rounded-lg overflow-hidden">
            <div role="table" aria-describedby="achievements-table" className="min-w-full divide-y divide-gray-200">
              <div role="rowgroup" className="bg-blue-50">
                <div role="row" className="flex">
                  <div role="columnheader" className="px-4 py-3 text-left text-sm font-semibold text-blue-900 w-20">
                    Gambar
                  </div>
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
                {achievements.map((achievement) => {
                  const AchievementPreviewImage = achievement.imageUrl ? getImageUrl(achievement.imageUrl, "achievements") : "/placeholder-image.jpg";
                  return (
                    <div key={achievement.id} role="row" className="flex odd:bg-white even:bg-blue-25 hover:bg-blue-100 transition-colors">
                      <div role="cell" className="px-4 py-3 w-20">
                        <img src={AchievementPreviewImage} alt={achievement.title} className="w-12 h-12 object-cover rounded" />
                      </div>
                      <div role="cell" className="px-4 py-3 text-base text-gray-900 flex-1">
                        {achievement.title}
                      </div>
                      <div role="cell" className="px-4 py-3 text-base text-gray-900 flex-1">
                        {achievement.division?.name}
                      </div>
                      <div role="cell" className="px-4 py-3 text-base text-gray-900 flex-1">
                        {new Date(achievement.date).toLocaleDateString()}
                      </div>
                      <div role="cell" className="px-4 py-3 flex space-x-3">
                        <button
                          onClick={() => router.push(`/admin/achievements/${achievement.id}/edit`)}
                          className="px-3 cursor-pointer py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center w-full justify-center"
                        >
                          <Pencil className="w-4 h-4 mr-1" /> Edit
                        </button>
                        <DeleteAchievementForm id={achievement?.id} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

// Komponen Utama yang menggunakan Suspense
const AchievementsPage = () => {
  const router = useRouter();

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Daftar Pencapaian</h1>
        <button
          onClick={() => router.push("/admin/achievements/create")}
          className="flex cursor-pointer items-center px-5 py-2.5 bg-blue-900 text-white rounded-lg hover:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Tambah Pencapaian
        </button>
      </div>

      <Suspense fallback={<Loading />}>
        <AchievementsList />
      </Suspense>
    </div>
  );
};

export default AchievementsPage;
