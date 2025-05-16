"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8 sm:px-6 sm:py-10">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-6 sm:p-8 text-center">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="w-12 h-12 sm:w-14 sm:h-14 text-amber-500" />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">404 - Halaman Tidak Ditemukan</h1>
        <p className="text-sm sm:text-base text-gray-600 mb-6">Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan. Silakan periksa URL atau kembali ke beranda.</p>
        <button onClick={() => router.push("/")} className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 w-full sm:w-auto">
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
