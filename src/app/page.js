import React from "react";

const HomePage = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Selamat Datang di HIMSI</h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Himpunan Mahasiswa Sistem Informasi adalah wadah bagi mahasiswa untuk mengembangkan potensi, berkolaborasi, dan berkontribusi dalam dunia teknologi informasi.
        </p>
        <div className="mt-8">
          <a href="/about" className="inline-block px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200">
            Pelajari Lebih Lanjut
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
