// src/components/ProgramFilterWrapper.js
'use client';

import React, { useState, useEffect } from "react"; // Tambahkan useEffect
import { ProgramCard } from "./ProgramCard";
import { ProgramFilter } from "./ProgramFilter"; // Asumsikan ProgramFilter sudah ada dan berfungsi
import { motion, AnimatePresence } from "framer-motion"; // Impor untuk animasi

export const ProgramFilterWrapper = ({ initialPrograms }) => {
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [programs, setPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Tambahkan state loading

  useEffect(() => {
    // Set initial programs dan selesaikan loading
    // Anda mungkin ingin menyortir initialPrograms di sini jika belum
    if (initialPrograms) {
        const sortedInitialPrograms = [...initialPrograms].sort((a,b) => new Date(b.startDate) - new Date(a.startDate)); // Contoh sortir
        setPrograms(sortedInitialPrograms);
    }
    setIsLoading(false);
  }, [initialPrograms]);
  
  const filteredPrograms = selectedStatus === "ALL" 
    ? programs 
    : programs.filter(program => program.status === selectedStatus);

  // Teks untuk filter agar konsisten dengan ProgramCard
  const filterOptions = [
    { id: "ALL", label: "Semua Program" },
    { id: "UPCOMING", label: "Akan Datang" },
    { id: "ONGOING", label: "Sedang Berlangsung" },
    { id: "COMPLETED", label: "Telah Selesai" } // Menggunakan COMPLETED
  ];

  // Helper function untuk teks status di pesan kosong
  const getStatusTextForEmptyMessage = (status) => {
    const option = filterOptions.find(opt => opt.id === status);
    return option ? option.label.toLowerCase().replace(" program", "").replace("sedang ", "").replace("telah ", "") : "tersedia";
  };

  return (
    // Container utama dengan padding dan sedikit latar
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-slate-50/50 min-h-[60vh]"> {/* Latar lebih lembut */}
      <div className="max-w-7xl mx-auto">
        {/* Asumsikan ProgramFilter adalah komponen tombol filter */}
        <ProgramFilter 
          selectedStatus={selectedStatus} 
          setSelectedStatus={setSelectedStatus}
          filterOptions={filterOptions} // Kirim filterOptions ke komponen filter
          // Anda mungkin perlu menyesuaikan prop untuk ProgramFilter
        />
        
        {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
                <p className="text-slate-600 text-sm">Memuat program...</p>
            </div>
        ) : (
            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedStatus} // Penting untuk re-trigger animasi saat filter berubah
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-10"
                >
                {filteredPrograms.length > 0 ? (
                    filteredPrograms.map((program, index) => (
                        // Jika ingin animasi individual card, bungkus ProgramCard dengan motion.div lagi
                        // Namun, animasi pada grid parent sudah cukup baik.
                        <ProgramCard key={program.id} program={program} />
                    ))
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="col-span-full text-center py-16 sm:py-20"
                    >
                        <svg className="w-16 h-16 text-slate-300 mx-auto mb-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-slate-500 text-base sm:text-lg">
                            Tidak ada program {getStatusTextForEmptyMessage(selectedStatus)} yang ditemukan saat ini.
                        </p>
                    </motion.div>
                )}
                </motion.div>
            </AnimatePresence>
        )}
      </div>
    </div>
  );
};