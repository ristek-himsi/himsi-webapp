// src/components/EventsWithFilter.js
'use client';
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import EventCard from "./EventCard"; // Pastikan path ini benar

const EventsWithFilter = ({ initialEvents }) => {
  const [filter, setFilter] = useState("ALL");
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    if (initialEvents) {
      // Sortir initialEvents di sini jika perlu (misal berdasarkan tanggal terbaru)
      const sortedInitialEvents = [...initialEvents].sort((a,b) => new Date(b.startDate) - new Date(a.startDate));
      setEvents(sortedInitialEvents);
      setIsLoading(false);
    } else {
      // Handle jika initialEvents null/undefined, mungkin fetch di sini atau tampilkan error
      setIsLoading(false); // Pastikan loading selesai
    }
  }, [initialEvents]);
  
  const filteredEvents =
    filter === "ALL"
      ? events
      : events.filter((event) => event.status === filter);

  const filterOptions = [
    { id: "ALL", label: "Semua Acara" },
    { id: "UPCOMING", label: "Akan Datang" },
    { id: "ONGOING", label: "Sedang Berlangsung" },
    { id: "PAST", label: "Telah Selesai" }
  ];

  return (
    // Latar belakang utama lebih lembut
    <div className="min-h-screen py-12 sm:py-16 mt-8 px-4 sm:px-6 lg:px-8 bg-slate-50"> {/* Warna latar lebih netral */}
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-3">
            Jelajahi Acara Kami
          </h1>
          {/* Garis pemisah lebih halus */}
          <div className="w-20 h-1 bg-sky-500 mx-auto rounded-full"></div> 
        </motion.div>
        
        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-10 sm:mb-12 md:mb-16"
        >
          {filterOptions.map((status) => (
            <motion.button
              key={status.id}
              onClick={() => setFilter(status.id)}
              whileHover={{ y: -2, boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }} // Efek hover lebih halus
              whileTap={{ scale: 0.97 }}
              className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg cursor-pointer text-xs sm:text-sm font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 ${
                filter === status.id
                  ? "bg-slate-800 text-white shadow-md" // Tombol aktif
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 hover:border-slate-300" // Tombol non-aktif
              }`}
            >
              {status.label}
            </motion.button>
          ))}
        </motion.div>
        
        {/* Loading State */}
        {isLoading ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            {/* Spinner lebih modern */}
            <div className="w-10 h-10 border-4 border-slate-300 border-t-sky-500 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-600 text-sm">Memuat acara...</p>
          </motion.div>
        ) : filteredEvents.length === 0 ? (
          // State Kosong
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="max-w-md mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-slate-100 text-center"
          >
            <svg className="w-12 h-12 text-sky-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-slate-800 mb-1">Tidak Ada Acara</h3>
            <p className="text-slate-600 text-sm">
              Saat ini tidak ada acara yang{" "}
              {filter === "ALL" 
                ? "tersedia" 
                : filterOptions.find(f => f.id === filter)?.label.toLowerCase().replace(" acara", "").replace("sedang ","").replace("telah ","")
              }.
            </p>
          </motion.div>
        ) : (
          // Grid Event Card
          <AnimatePresence mode="wait"> {/* mode="wait" agar exit selesai sebelum enter dimulai */}
            <motion.div
              key={filter} // Tambahkan key agar AnimatePresence mendeteksi perubahan
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }} // Exit animation untuk seluruh grid
              transition={{ duration: 0.3, staggerChildren: 0.08 }} // Stagger untuk card
            >
              {filteredEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default EventsWithFilter;