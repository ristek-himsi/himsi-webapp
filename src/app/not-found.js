"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen mt-14 flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-slate-100 px-6 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md bg-white rounded-2xl shadow-md overflow-hidden">
        {/* Top colored bar with blue gradient */}
        <div className="h-2 bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500"></div>

        <div className="p-6 sm:p-10">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.1,
            }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-100 rounded-full opacity-50 animate-ping"></div>
              <div className="relative bg-blue-50 rounded-full p-5">
                <AlertTriangle className="w-14 h-14 sm:w-16 sm:h-16 text-blue-500" strokeWidth={1.5} />
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.4 }}>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3 tracking-tight">404 - Halaman Tidak Ditemukan</h1>

            <p className="text-slate-600 mb-8 leading-relaxed">Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan. Silakan periksa URL atau kembali ke beranda.</p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/")}
                className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-6 rounded-xl text-sm font-medium transition-all duration-200 shadow-sm w-full hover:shadow-md"
              >
                <Home className="w-4 h-4 mr-2" />
                Kembali ke Beranda
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-6 text-center text-slate-500 text-sm">
        <p>
          Butuh bantuan?{" "}
          <a href="/kontak" className="text-blue-600 hover:text-blue-800 underline">
            Hubungi kami
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
