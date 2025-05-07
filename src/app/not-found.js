"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="w-16 h-16 text-yellow-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">404 - Halaman Tidak Ditemukan</h1>
        <p className="text-gray-600 mb-6">Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan. Silakan periksa URL atau kembali ke beranda.</p>
        <button onClick={() => router.push("/")} className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
