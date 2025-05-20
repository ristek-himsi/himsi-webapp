"use client";

import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Plus, Eye } from "lucide-react";
import DeleteAchievementForm from "./components/DeleteAchievementForm";
import { getImageUrl } from "@/lib/supabase";
import Loading from "@/app/loading";
import Image from "next/image";

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
      <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 shadow-sm">
        <div className="flex items-center mb-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <p className="font-semibold">Error</p>
        </div>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {/* Loading skeleton for mobile view */}
        <div className="md:hidden space-y-4">
          {[1, 2, 3].map((index) => (
            <div key={index} className="bg-white shadow-sm p-4 rounded-lg animate-pulse">
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
        <div className="hidden md:block bg-white shadow-sm rounded-lg overflow-hidden">
          <div role="table" className="min-w-full divide-y divide-gray-200">
            <div role="rowgroup" className="bg-blue-50">
              <div role="row" className="flex">
                <div role="columnheader" className="px-4 py-3 text-left text-sm font-semibold text-blue-900 w-20">
                  Gambar
                </div>
                <div role="columnheader" className="px-4 py-3 text-left text-sm font-semibold text-blue-900 flex-1">
                  Judul
                </div>
                <div role="columnheader" className="px-4 py-3 text-left text-sm font-semibold text-blue-900 flex-1 hidden lg:block">
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
                  <div role="cell" className="px-4 py-3 flex-1 hidden lg:block">
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
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-lg p-4 shadow-sm">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
            </svg>
            <p className="text-sm">Tidak ada pencapaian yang ditemukan. Silakan tambah pencapaian baru.</p>
          </div>
        </div>
      ) : (
        <>
          {/* Mobile view - use grid with responsive columns */}
          <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {achievements.map((achievement) => {
              const achievementPreviewImage = achievement.imageUrl ? getImageUrl(achievement.imageUrl, "achievements") : "/placeholder-image.jpg";
              return (
                <div key={achievement.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                  <div className="relative w-full h-32 sm:h-40">
                    <Image src={achievementPreviewImage} alt={achievement.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 384px" priority />
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 line-clamp-1">{achievement.title}</h3>
                    <div className="mt-1 sm:mt-2 space-y-1">
                      <p className="text-xs sm:text-sm text-gray-600 flex items-center">
                        <span className="font-medium mr-1">Divisi:</span> {achievement.division?.name || "Tidak ada divisi"}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600 flex items-center">
                        <span className="font-medium mr-1">Tanggal:</span>{" "}
                        {new Date(achievement.date).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="mt-3 sm:mt-4 flex gap-2">
                      <button
                        onClick={() => router.push(`/admin/achievements/${achievement.id}/edit`)}
                        className="px-2 sm:px-3 py-1.5 sm:py-2 bg-blue-600 text-white text-xs sm:text-sm rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors flex items-center justify-center w-full"
                      >
                        <Pencil className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-1.5" /> Edit
                      </button>
                      <DeleteAchievementForm id={achievement?.id} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop view with responsive table */}
          <div className="hidden md:block bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 overflow-x-auto mx-3">
            <div role="table" aria-label="Daftar Pencapaian" className="w-full divide-y divide-gray-200">
              {/* Table header */}
              <div role="rowgroup" className="bg-blue-50">
                <div role="row" className="flex">
                  <div role="columnheader" className="px-3 lg:px-4 py-3 text-left text-xs lg:text-sm font-semibold text-blue-900 w-16 lg:w-24">
                    Gambar
                  </div>
                  <div role="columnheader" className="px-3 lg:px-4 py-3 text-left text-xs lg:text-sm font-semibold text-blue-900 flex-1">
                    Judul
                  </div>
                  <div role="columnheader" className="px-3 lg:px-4 py-3 text-left text-xs lg:text-sm font-semibold text-blue-900 flex-1 hidden lg:block">
                    Divisi
                  </div>
                  <div role="columnheader" className="px-3 lg:px-4 py-3 text-left text-xs lg:text-sm font-semibold text-blue-900 flex-1">
                    Tanggal
                  </div>
                  <div role="columnheader" className="px-3 lg:px-4 py-3 text-left text-xs lg:text-sm font-semibold text-blue-900 w-32 lg:w-48">
                    Aksi
                  </div>
                </div>
              </div>

              {/* Table body */}
              <div role="rowgroup">
                {achievements.map((achievement, index) => {
                  const achievementPreviewImage = achievement.imageUrl ? getImageUrl(achievement.imageUrl, "achievements") : "/placeholder-image.jpg";
                  return (
                    <div key={achievement.id} role="row" className={`flex items-center ${index % 2 === 0 ? "bg-white" : "bg-blue-50/30"} hover:bg-blue-50 transition-colors duration-150`}>
                      <div role="cell" className="px-3 lg:px-4 py-2 lg:py-3 w-16 lg:w-24">
                        <div className="relative h-10 w-10 lg:h-14 lg:w-14 rounded-md overflow-hidden">
                          <Image src={achievementPreviewImage} alt={achievement.title} fill className="object-cover" sizes="(max-width: 1024px) 40px, 56px" priority />
                        </div>
                      </div>
                      <div role="cell" className="px-3 lg:px-4 py-2 lg:py-3 text-xs lg:text-sm text-gray-900 flex-1 line-clamp-1">
                        {achievement.title}
                      </div>
                      <div role="cell" className="px-3 lg:px-4 py-2 lg:py-3 text-xs lg:text-sm text-gray-900 flex-1 hidden lg:block">
                        {achievement.division?.name || "Tidak ada divisi"}
                      </div>
                      <div role="cell" className="px-3 lg:px-4 py-2 lg:py-3 text-xs lg:text-sm text-gray-900 flex-1">
                        {new Date(achievement.date).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                      <div role="cell" className="px-3 lg:px-4 py-2 lg:py-3 flex gap-2 w-32 lg:w-48">
                        <button
                          onClick={() => router.push(`/admin/achievements/${achievement.id}/edit`)}
                          className="px-2 lg:px-3 py-1 lg:py-1.5 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors flex items-center justify-center flex-1"
                        >
                          <Pencil className="w-3 h-3 lg:w-3.5 lg:h-3.5 mr-1" /> Edit
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
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-1 py-2 sm:p-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Daftar Pencapaian</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Kelola pencapaian dan prestasi organisasi</p>
        </div>
        <button
          onClick={() => router.push("/admin/achievements/create")}
          className="inline-flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white text-xs sm:text-sm font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-1.5" />
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
