// src/components/ProgramFilterWrapper.js
'use client';

import React, { useState, useEffect } from "react";
import { ProgramCard } from "./ProgramCard";
import { ProgramFilter } from "./ProgramFilter";
import { motion, AnimatePresence } from "framer-motion";

export const ProgramFilterWrapper = ({ initialPrograms }) => {
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [programs, setPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (initialPrograms) {
      const sortedInitialPrograms = [...initialPrograms].sort((a,b) => new Date(b.startDate) - new Date(a.startDate));
      setPrograms(sortedInitialPrograms);
    }
    setIsLoading(false);
  }, [initialPrograms]);
  
  const filteredPrograms = selectedStatus === "ALL" 
    ? programs 
    : programs.filter(program => program.status === selectedStatus);

  const filterOptions = [
    { id: "ALL", label: "Semua Program" },
    { id: "UPCOMING", label: "Akan Datang" },
    { id: "ONGOING", label: "Sedang Berlangsung" },
    { id: "COMPLETED", label: "Telah Selesai" }
  ];

  const getStatusTextForEmptyMessage = (status) => {
    const option = filterOptions.find(opt => opt.id === status);
    return option ? option.label.toLowerCase().replace(" program", "").replace("sedang ", "").replace("telah ", "") : "tersedia";
  };

  return (
    <div className="px-3 sm:px-6 lg:px-8 pb-8 sm:pb-12 bg-slate-50/30 min-h-[60vh]">
      <div className="max-w-7xl mx-auto">
        {/* Filter Section */}
        <div className="mb-6 sm:mb-8">
          <ProgramFilter 
            selectedStatus={selectedStatus} 
            setSelectedStatus={setSelectedStatus}
            filterOptions={filterOptions}
          />
        </div>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 sm:py-20 text-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 border-4 border-slate-200 border-t-indigo-500 rounded-full animate-spin mb-3 sm:mb-4"></div>
            <p className="text-slate-600 text-xs sm:text-sm">Memuat program...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedStatus}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
            >
              {filteredPrograms.length > 0 ? (
                filteredPrograms.map((program, index) => (
                  <ProgramCard key={program.id} program={program} />
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="col-span-full text-center py-12 sm:py-16 lg:py-20"
                >
                  <svg className="w-12 h-12 sm:w-16 sm:h-16 text-slate-300 mx-auto mb-4 sm:mb-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-slate-500 text-sm sm:text-base lg:text-lg px-4">
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