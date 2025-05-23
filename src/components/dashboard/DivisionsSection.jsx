// src/components/DivisionsSection.js
import Link from 'next/link';
import DivisionCard from './DivisionCard'; // Pastikan path ini benar

const DivisionsSection = ({ divisions }) => {
  const featuredDivisions = (divisions || []).slice(0, 3); // Ambil 3 divisi untuk ditampilkan

  return (
    // Padding vertikal dan horizontal disesuaikan
    <div className="py-12 sm:py-16 px-4 bg-white">
      {/* max-w-7xl sudah cukup baik, bisa dipertahankan */}
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          {/* Ukuran font h2 disesuaikan */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 sm:mb-3">
            Kenali <span className="text-blue-600">Divisi Kami</span>
          </h2>
          {/* Ukuran font paragraf dan margin disesuaikan */}
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto">
            Temukan berbagai divisi yang menjadi motor penggerak kegiatan dan inovasi di HIMSI.
          </p>
        </div>

        {featuredDivisions.length > 0 ? (
          // Grid untuk DivisionCard: gap disesuaikan
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-12 md:mb-16">
            {featuredDivisions.map((division) => (
              <DivisionCard key={division.id} division={division} />
            ))}
          </div>
        ) : (
          // State Kosong
          <div className="bg-blue-50 rounded-xl p-6 sm:p-8 text-center shadow-sm border border-blue-100 mb-10 sm:mb-12 md:mb-16">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 mx-auto mb-3 sm:mb-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
            </svg>
            <p className="text-base sm:text-lg md:text-xl font-medium text-gray-700">Informasi Divisi Belum Tersedia.</p>
            <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
              Silakan cek kembali nanti untuk detail mengenai divisi kami.
            </p>
          </div>
        )}

        {/* Tombol "Lihat Semua Divisi" */}
        {divisions && divisions.length > 3 && (
          <div className="text-center">
            <Link
              href="/divisi"
              className="w-full sm:w-auto inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 sm:px-10 rounded-lg transition-all transform hover:scale-105 duration-300 shadow-md hover:shadow-lg text-sm sm:text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
            >
              Lihat Semua Divisi
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DivisionsSection;