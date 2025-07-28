import React from "react";
import Link from "next/link";
import { getDivisionByLeaderId } from "../members/libs/data";
import { getAchievemntByDivisionId } from "./libs/data";
import { getImageUrl } from "@/lib/supabase";
import DeleteAchievementButton from "./components/DeleteAchievementButton";

export const dynamic = "force-dynamic";

const Page = async () => {
  const divisionId = await getDivisionByLeaderId();

  let achievement = [];
  let errorFetching = null;

  if (divisionId) {
    try {
      achievement = await getAchievemntByDivisionId(parseInt(divisionId));
      console.log(`Fetched ${achievement.length} achievements for division ID: ${divisionId}`);
    } catch (error) {
      console.error("Error fetching achievements:", error);
      errorFetching = "Gagal memuat data pencapaian. Silakan coba lagi nanti.";
    }
  } else {
    console.warn("Leader division ID not found. Cannot fetch achievements.");
    errorFetching = "Anda tidak terasosiasi dengan divisi. Tidak dapat menampilkan pencapaian.";
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Tanggal tidak tersedia";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Tanggal tidak valid";
      return date.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (e) {
      console.error("Error formatting date:", e);
      return "Tanggal tidak valid";
    }
  };

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      {/* Header dengan tombol tambah - Responsive */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Pencapaian Divisi</h1>
        {divisionId && (
          <Link
            href="/leader/achievement/add"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Tambah Pencapaian
          </Link>
        )}
      </div>

      {/* Error message - Responsive */}
      {errorFetching && <div className="p-3 sm:p-4 mb-4 sm:mb-6 bg-red-100 text-red-700 rounded-md text-sm sm:text-base">{errorFetching}</div>}

      {/* Achievement Grid - Responsive */}
      {!errorFetching && achievement && achievement.length > 0 ? (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {achievement.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Gambar Achievement - Responsive height */}
              <div className="relative h-40 sm:h-48 bg-gray-200">
                {item?.imageUrl ? (
                  <img src={getImageUrl(item.imageUrl, "achievements")} alt={item.title || "Achievement Image"} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg className="w-8 h-8 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
              </div>

              {/* Konten - Responsive padding */}
              <div className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-800 line-clamp-2">{item.title}</h2>

                <p className="text-gray-600 mb-3 sm:mb-4 line-clamp-3 text-sm sm:text-base">{item.description}</p>

                {/* Tanggal - Responsive */}
                <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  {formatDate(item.date)}
                </div>

                {/* Action buttons - Responsive */}
                {divisionId && (
                  <div className="flex flex-col sm:flex-row gap-2 mb-3 sm:mb-4">
                    <Link
                      href={`/leader/achievement/edit/${item.id}`}
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-2 sm:px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base"
                    >
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <span className="hidden xs:inline sm:inline">Edit</span>
                    </Link>
                    <DeleteAchievementButton achievementId={item.id} />
                  </div>
                )}

                {/* Metadata - Responsive */}
                <div className="text-xs text-gray-400 border-t pt-2 sm:pt-3">
                  <p>Dibuat: {formatDate(item.createdAt)}</p>
                  {new Date(item.updatedAt).getTime() > new Date(item.createdAt).getTime() && <p>Diperbarui: {formatDate(item.updatedAt)}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : !errorFetching && achievement?.length === 0 ? (
        // Empty state - Responsive
        <div className="text-center py-8 sm:py-12 px-4">
          <div className="mb-4">
            <svg className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
          </div>
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2 sm:mb-4">Belum Ada Pencapaian</h3>
          <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6">Divisi ini belum memiliki pencapaian yang tercatat.</p>
          {divisionId && (
            <Link href="/leader/achievement/add" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Tambah Pencapaian Pertama
            </Link>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Page;
