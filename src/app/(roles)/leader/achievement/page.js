import React from "react";
import Link from "next/link";
// VERIFIKASI PATH IMPORT DATA SESUAI STRUKTUR PROJECT ANDA
import { getDivisionByLeaderId } from "../members/libs/data"; // Path relatif untuk getDivisionByLeaderId
import { getAchievemntByDivisionId } from "./libs/data"; // Path relatif untuk getAchievemntByDivisionId
import { getImageUrl } from "@/lib/supabase";
import DeleteAchievementButton from "./components/DeleteAchievementButton";

// Tandai rute ini sebagai dinamis karena mungkin menggunakan cookie/sesi untuk mendapatkan leader ID
export const dynamic = "force-dynamic"; // <-- Tambahkan baris ini

const Page = async () => {
  // Ganti nama fungsi dari 'page' menjadi 'Page'

  // Dapatkan ID divisi leader. Ini bisa mengembalikan null jika user tidak login,
  // bukan leader, atau leader tidak terasosiasi dengan divisi.
  const divisionId = await getDivisionByLeaderId();

  let achievement = [];
  let errorFetching = null;

  // --- PENTING: Cek apakah divisionId valid SEBELUM query Prisma ---
  if (divisionId) {
    // Hanya panggil fungsi data jika divisionId ditemukan dan valid (bukan null/undefined)
    try {
      // getAchievemntByDivisionId perlu memastikan menerima number atau handle non-number input
      // Jika getDivisionByLeaderId sudah menjamin Int atau null, parseInt di sini aman atau di dalam fungsi data.
      // Kita asumsikan getAchievemntByDivisionId mengharapkan number.
      achievement = await getAchievemntByDivisionId(parseInt(divisionId)); // Pastikan di-parse ke Int
      console.log(`Fetched ${achievement.length} achievements for division ID: ${divisionId}`); // Log jumlah achievement
    } catch (error) {
      console.error("Error fetching achievements:", error);
      // Tangani error fetching dari Prisma atau fungsi data
      errorFetching = "Gagal memuat data pencapaian. Silakan coba lagi nanti."; // Pesan error generic untuk user
    }
  } else {
    // Jika divisionId null/undefined (leader tidak ditemukan atau tidak punya divisi)
    console.warn("Leader division ID not found. Cannot fetch achievements.");
    errorFetching = "Anda tidak terasosiasi dengan divisi. Tidak dapat menampilkan pencapaian.";
    // achievement tetap array kosong []
  }
  // --- AKHIR PENGECEKAN divisionId ---

  // Helper untuk format tanggal (bisa dipindah ke util jika sering digunakan)
  const formatDate = (dateString) => {
    if (!dateString) return "Tanggal tidak tersedia";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Tanggal tidak valid"; // Cek validitas objek Date
      return date.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (e) {
      console.error("Error formatting date:", e); // Log error parsing
      return "Tanggal tidak valid";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header dengan tombol tambah */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-center">Pencapaian Divisi</h1>
        {/* Tampilkan tombol tambah hanya jika divisionId ditemukan (user leader yang terasosiasi) */}
        {divisionId && (
          <Link href="/leader/achievement/add" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Tambah Pencapaian
          </Link>
        )}
      </div>

      {/* Tampilkan pesan error jika ada */}
      {errorFetching && <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-md">{errorFetching}</div>}

      {/* Tampilkan daftar achievement atau pesan kosong */}
      {/* Render list hanya jika TIDAK ada error fetching *dan* achievement TIDAK kosong */}
      {
        !errorFetching && achievement && achievement.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {achievement.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Gambar Achievement */}
                <div className="relative h-48 bg-gray-200">
                  {/* Pastikan getImageUrl ada dan path 'achievements' benar */}
                  {/* Tambahkan alt text fallback dan error handling gambar */}
                  {item?.imageUrl ? (
                    <img
                      src={getImageUrl(item.imageUrl, "achievements")}
                      alt={item.title || "Achievement Image"}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder-image.fallback.png";
                      }}
                    /> // Ganti dengan path gambar fallback yang sesuai
                  ) : (
                    // Tampilkan placeholder jika imageUrl kosong
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

                {/* Konten */}
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-3 text-gray-800">{item.title}</h2>

                  {/* Gunakan item.description langsung, line-clamp di handle CSS */}
                  <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>

                  {/* Tanggal */}
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 20 002 2h12a2 20 002-2V6a2 20 00-2-2h-1V3a1 10 10-2 0v1H7V3a1 10 00-1-1zm0 5a1 10 000 2h8a1 10 100-2H6z" clipRule="evenodd" />
                    </svg>
                    {formatDate(item.date)}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2 mb-4">
                    {/* Tampilkan tombol edit/delete hanya jika divisionId valid */}
                    {divisionId && (
                      <>
                        <Link
                          href={`/leader/achievement/edit/${item.id}`}
                          className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </Link>
                        {/* DeleteAchievementButton adalah client component, pastikan props achievementId benar */}
                        {/* Wrap dalam form jika DeleteAchievementButton menggunakan action */}
                        <DeleteAchievementButton achievementId={item.id} />
                      </>
                    )}
                  </div>

                  {/* Metadata */}
                  <div className="text-xs text-gray-400 border-t pt-3">
                    <p>Dibuat: {formatDate(item.createdAt)}</p>
                    {/* Bandingkan objek Date atau getTime() untuk akurasi */}
                    {new Date(item.updatedAt).getTime() > new Date(item.createdAt).getTime() && <p>Diperbarui: {formatDate(item.updatedAt)}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : !errorFetching && achievement?.length === 0 ? ( // Tampilkan pesan kosong hanya jika tidak ada error dan achievement 0
          <div className="text-center py-12">
            <div className="mb-4">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Belum Ada Pencapaian</h3>
            <p className="text-gray-500 mb-6">Divisi ini belum memiliki pencapaian yang tercatat.</p>
            {/* Tampilkan tombol tambah hanya jika divisionId ditemukan */}
            {divisionId && (
              <Link href="/leader/achievement/add" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Tambah Pencapaian Pertama
              </Link>
            )}
          </div>
        ) : null /* Jangan tampilkan apa-apa jika ada error fetching */
      }
    </div>
  );
};

// Export fungsi dengan nama yang benar (Page)
export default Page;
