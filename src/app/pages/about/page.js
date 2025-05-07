"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

const AboutPage = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <Navbar />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Tentang HIMSI</h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Mengenal lebih dekat Himpunan Mahasiswa Sistem Informasi dan komitmen kami untuk mengembangkan ekosistem teknologi informasi yang inovatif dan berdampak.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Visi Kami</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">Menjadi organisasi kemahasiswaan yang unggul dalam mengembangkan potensi mahasiswa Sistem Informasi dan berkontribusi aktif dalam kemajuan teknologi informasi di Indonesia.</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Misi Kami</h2>
            <ul className="text-gray-600 space-y-3 list-disc pl-5">
              <li>Meningkatkan kualitas akademik dan soft skills mahasiswa Sistem Informasi</li>
              <li>Memfasilitasi pengembangan minat dan bakat mahasiswa di bidang teknologi informasi</li>
              <li>Membangun jaringan kerjasama dengan industri dan institusi terkait</li>
              <li>Berkontribusi dalam pemecahan masalah sosial melalui penerapan teknologi informasi</li>
            </ul>
          </div>
          <div className="bg-gray-100 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Sejarah HIMSI</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Didirikan pada tahun 2005, HIMSI telah menjadi rumah bagi ratusan mahasiswa Sistem Informasi yang berdedikasi untuk belajar, berkembang, dan memberikan dampak positif melalui teknologi.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Selama perjalanannya, HIMSI telah menyelenggarakan berbagai kegiatan unggulan seperti seminar teknologi, kompetisi programming, workshop pengembangan karir, dan program pengabdian masyarakat yang memanfaatkan teknologi
              informasi.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Struktur Organisasi</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-blue-600 text-2xl font-bold">KU</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Ketua Umum</h3>
            <p className="text-gray-600">Memimpin dan mengkoordinasikan seluruh kegiatan HIMSI</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-blue-600 text-2xl font-bold">AK</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Divisi Akademik</h3>
            <p className="text-gray-600">Bertanggung jawab atas program-program peningkatan akademik</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-blue-600 text-2xl font-bold">KM</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Divisi Kemahasiswaan</h3>
            <p className="text-gray-600">Mengelola kegiatan pengembangan soft skills dan kepemimpinan</p>
          </div>
        </div>
        <div className="mt-8">
          <a href="/pages/join" className="inline-block px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200">
            Bergabung dengan Kami
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
