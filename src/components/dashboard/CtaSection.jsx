// src/components/CtaSection.js
import Link from 'next/link';

const CtaSection = () => {
  return (
    <div className="bg-gradient-to-br from-blue-700 via-indigo-800 to-purple-900">
      {/* Padding vertikal dan horizontal disesuaikan */}
      <div className="max-w-4xl mx-auto text-center py-12 px-4 sm:py-20 md:py-24 lg:py-28 sm:px-6 lg:px-8">
        {/* Ukuran font h2 disesuaikan */}
        <h2 className="text-2xl font-extrabold text-white 
                       sm:text-3xl 
                       md:text-4xl 
                       lg:text-5xl">
          <span className="block">Punya Ide untuk Berkolaborasi?</span>
          {/* Margin atas dan ukuran teks span kedua disesuaikan */}
          <span className="block text-indigo-200 mt-1 sm:mt-2">Mari Wujudkan Bersama HIMSI.</span>
        </h2>
        {/* Ukuran font paragraf, margin atas, dan max-width disesuaikan */}
        <p className="mt-4 max-w-md mx-auto text-sm text-indigo-100 
                       sm:text-base sm:max-w-xl 
                       md:mt-6 md:text-lg md:max-w-2xl">
          Kami selalu terbuka untuk menjalin kemitraan dan kolaborasi yang inovatif dengan berbagai pihak, baik individu, komunitas, maupun institusi, untuk menciptakan dampak positif yang lebih luas di bidang teknologi informasi.
        </p>
        {/* Margin atas kontainer tombol dan layout tombol sudah cukup baik, hanya pastikan padding tombol juga responsif jika perlu */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center items-center sm:space-x-4 md:space-x-6 space-y-4 sm:space-y-0">
          <Link
            href="/contact?subject=Proposal Kolaborasi HIMSI"
            // Padding tombol dan ukuran font disesuaikan
            className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-2.5 sm:px-8 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md shadow-md text-indigo-700 bg-white hover:bg-indigo-50 transition-transform transform hover:scale-105 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white"
          >
            Ajukan Kolaborasi
          </Link>
          <Link
            href="/kontak" // Pastikan path konsisten (misal, /contact atau /kontak)
            // Padding tombol dan ukuran font disesuaikan
            className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-2.5 sm:px-8 sm:py-3 border-2 border-white text-sm sm:text-base font-medium rounded-md text-white hover:bg-white hover:text-indigo-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white"
          >
            Hubungi Kami
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;