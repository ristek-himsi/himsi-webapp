// src/components/HeroSection.js
import Link from 'next/link';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white overflow-hidden">
      {/* Optional: Background Image / Pattern */}
      {/* Pastikan gambar ini ada di public/images/ atau ganti path/hapus */}
      <div className="absolute inset-0 opacity-10 md:opacity-15">
        <Image
          src="/hero-background.jpg" // Contoh: /images/hero-background.jpg atau /images/hero-pattern.svg
          alt="Latar Belakang Hero"
          layout="fill"
          objectFit="cover"
          priority // Penting untuk LCP (Largest Contentful Paint)
          className="opacity-70" // Kurangi opacity gambar jika terlalu dominan
        />
      </div>
      
      {/* Konten Hero dengan padding dan ukuran teks responsif */}
      <div className="relative max-w-7xl mx-auto py-20 px-4 sm:py-28 md:py-32 lg:py-40 sm:px-6 lg:px-8 z-10">
        <div className="text-center">
          {/* Ukuran font h1 disesuaikan untuk mobile dan layar lebih besar */}
          <h1 className="text-3xl font-extrabold tracking-tight text-white 
                         sm:text-4xl 
                         md:text-5xl 
                         lg:text-6xl 
                         xl:text-7xl">
            <span className="block">Himpunan Mahasiswa</span>
            {/* 'xl:inline' agar 'Sistem Informasi' menjadi inline hanya di layar xl ke atas, di bawah itu tetap block */}
            <span className="block text-blue-300 hover:text-blue-200 transition-colors duration-300 mt-1 sm:mt-2 xl:inline xl:ml-3">Sistem Informasi</span>
          </h1>
          {/* Ukuran font paragraf dan margin disesuaikan */}
          <p className="mt-4 max-w-sm mx-auto text-base text-blue-100 
                         sm:text-lg sm:max-w-xl 
                         md:mt-6 md:text-xl md:max-w-3xl">
            UIN Raden Fatah Palembang - Bersama Membangun Generasi Teknologi Informasi Yang Unggul dan Berakhlak Mulia.
          </p>
          {/* Tombol CTA dengan layout responsif */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Tombol dibuat full-width di mobile (saat bertumpuk) dan auto-width di sm+ */}
            <Link
              href="/events"
              className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-700 bg-white hover:bg-blue-50 transition-transform transform hover:scale-105 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-700 focus:ring-white"
            >
              Jelajahi Kegiatan
            </Link>
            <Link
              href="/about" // Ganti ke halaman "Tentang Kami" jika ada
              className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-blue-800 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-700 focus:ring-white"
            >
              Tentang HIMSI
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;