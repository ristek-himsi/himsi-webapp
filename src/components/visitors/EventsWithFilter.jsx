// src/components/visitors/EventsWithFilter.jsx
'use client';
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo, useRef, useCallback } from "react"; // Import useCallback
import EventCard from "./EventCard"; // Pastikan path ini benar
import { ChevronLeft, ChevronRight } from "lucide-react"; // Import icons dari lucide-react

const EventsWithFilter = ({ initialEvents }) => {
  // State untuk filter status dan tipe acara
  const [filterStatus, setFilterStatus] = useState("ALL_STATUS");
  const [filterType, setFilterType] = useState("ALL_TYPE"); // Pastikan nama state ini benar

  // State untuk loading dan data acara
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]); // State untuk menyimpan semua acara yang sudah diurutkan

  // === State & Constants untuk Pagination ===
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Jumlah item per halaman (misal: 9 untuk grid 3x3)
  // =========================================

  // Ref untuk elemen yang akan di-scroll ke atas saat halaman atau filter berubah
  const topOfListRef = useRef(null);

  // Effect untuk memproses initial data (sorting) saat komponen pertama kali mount
  useEffect(() => {
    if (initialEvents) {
      const sortedInitialEvents = [...initialEvents].sort((a, b) => {
         // Prioritas sorting: UPCOMING > ONGOING > COMPLETED > lainnya
         const statusOrder = { UPCOMING: 1, ONGOING: 2, COMPLETED: 3 };
         const aStatusOrder = statusOrder[a.status] || 4; // Default order 4 jika status tidak dikenali
         const bStatusOrder = statusOrder[b.status] || 4;

         const statusComparison = aStatusOrder - bStatusOrder;
         if (statusComparison !== 0) {
             return statusComparison; // Urutkan berdasarkan status jika berbeda
         }
         // Jika status sama, urutkan berdasarkan tanggal mulai Descending (terbaru dulu)
         const aStartDate = new Date(a.startDate);
         const bStartDate = new Date(b.startDate);

         // Handle potential invalid dates safely
         const aTime = isNaN(aStartDate.getTime()) ? 0 : aStartDate.getTime();
         const bTime = isNaN(bStartDate.getTime()) ? 0 : bStartDate.getTime();

         return bTime - aTime; // Sort by timestamp value
      });

      setEvents(sortedInitialEvents);
      setIsLoading(false);
    } else {
       console.warn("initialEvents data is null or undefined. Displaying empty list.");
       setEvents([]);
       setIsLoading(false);
    }
  }, [initialEvents]); // Hanya dijalankan ulang jika initialEvents berubah

  // Effect untuk mereset halaman ke-1 setiap kali filter berubah
  useEffect(() => {
      setCurrentPage(1); // Reset ke halaman pertama
      // Scroll ke atas daftar saat filter berubah
      // Gunakan setTimeout dengan 0ms delay untuk memastikan DOM sudah diperbarui setelah state berubah
      requestAnimationFrame(() => {
           topOfListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
  }, [filterStatus, filterType]); // Bergantung hanya pada filterStatus dan filterType

  // Effect tambahan untuk scroll ke atas saat halaman berubah akibat KLIK pagination
  useEffect(() => {
      // Pastikan ref sudah ada
      if (topOfListRef.current) {
           requestAnimationFrame(() => {
                topOfListRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
           });
      }
  }, [currentPage]); // Bergantung hanya pada currentPage


  // Memoized calculation of filtered events based on status and type filters
  const filteredEvents = useMemo(() => {
      let currentEvents = events; // Start with the sorted list

      // Apply status filter
      if (filterStatus !== "ALL_STATUS") {
          currentEvents = currentEvents.filter((event) => event.status === filterStatus);
      }

      // Apply type filter
      if (filterType !== "ALL_TYPE") {
          currentEvents = currentEvents.filter((event) => {
              // Safely check for the sifest relation
              const isEventSIFest = !!event?.sifest; // True if event.sifest exists and is truthy
              if (filterType === "SIFEST") {
                  return isEventSIFest; // Include only if it has sifest relation
              } else if (filterType === "REGULER") { // Menggunakan 'REGULER' sesuai ID filterTypeOptions
                  return !isEventSIFest; // Include only if it does NOT have sifest relation
              }
              return true; // Should not be reached with valid filterType
          });
      }

      return currentEvents;

  }, [events, filterStatus, filterType]); // Recalculate when source events or filters change

  // === Logic Pagination ===
  const totalItems = filteredEvents.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Memoized calculation of events to display on the current page
  const paginatedEvents = useMemo(() => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      // Pastikan endIndex tidak melebihi jumlah item yang difilter
      const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
      return filteredEvents.slice(startIndex, endIndex);
  }, [filteredEvents, currentPage, itemsPerPage, totalItems]); // totalItems added as dependency


  // Options for Status Filter
  const filterStatusOptions = useMemo(() => [
    { id: "ALL_STATUS", label: "Semua Status" },
    { id: "UPCOMING", label: "Akan Datang" },
    { id: "ONGOING", label: "Sedang Berlangsung" },
    { id: "COMPLETED", label: "Telah Selesai" } // Pastikan sesuai Prisma enum EVENT_STATUS
  ], []); // Memoize to prevent re-creation on every render

  // Options for Type Filter
  const filterTypeOptions = useMemo(() => [
      { id: "ALL_TYPE", label: "Semua Tipe" },
      { id: "SIFEST", label: "Acara SIFest" },
      { id: "REGULER", label: "Acara Reguler" } // Menggunakan 'REGULER' sebagai ID
  ], []); // Memoize to prevent re-creation on every render


  // Function to generate page numbers array for pagination controls display
  const getPageNumbers = useCallback((currentPage, totalPages, maxButtons = 7) => {
      const pageNumbers = [];
      const halfButtons = Math.floor((maxButtons - 3) / 2); // Tombol di satu sisi (...)

      if (totalPages <= 1) { // Handle case with 0 or 1 total pages
          return []; // No pagination needed
      }

      if (totalPages <= maxButtons) {
          // Jika total halaman sedikit, tampilkan semua nomor
          for (let i = 1; i <= totalPages; i++) {
              pageNumbers.push(i);
          }
      } else {
          // Jika total halaman banyak, tampilkan range dengan '...'
          let startPage = Math.max(2, currentPage - halfButtons);
          let endPage = Math.min(totalPages - 1, currentPage + halfButtons);

           // Sesuaikan range jika terlalu dekat ke awal atau akhir
           if (startPage <= 2) { // Jika range dimulai di atau sebelum halaman 2
               endPage = Math.min(totalPages - 1, maxButtons - 1); // Pastikan jumlah tombol di tengah + halaman 1 cukup
               startPage = 2; // Pastikan mulai dari 2
           }
           if (endPage >= totalPages - 1) { // Jika range berakhir di atau setelah halaman total-1
               startPage = Math.max(2, totalPages - maxButtons + 2); // Pastikan jumlah tombol di awal + halaman total cukup
               endPage = totalPages - 1; // Pastikan sampai totalPages - 1
           }

          // Selalu tambahkan halaman pertama
          pageNumbers.push(1);

          // Tambahkan '...' pertama jika range tidak dimulai setelah halaman 1
          if (startPage > 2) {
              pageNumbers.push('...');
          }

          // Tambahkan nomor halaman di range tengah
          for (let i = startPage; i <= endPage; i++) {
              pageNumbers.push(i);
          }

          // Tambahkan '...' kedua jika range tidak berakhir sebelum halaman terakhir
          if (endPage < totalPages - 1) {
              pageNumbers.push('...');
          }

          // Selalu tambahkan halaman terakhir
          pageNumbers.push(totalPages);
      }

      return pageNumbers;
  }, []); // Dependencies kosong karena hanya bergantung pada input args (currentPage, totalPages, maxButtons)

  // Dapatkan nomor halaman yang akan ditampilkan (memoized karena bergantung pada state)
  const pageNumbersToDisplay = useMemo(() => getPageNumbers(currentPage, totalPages), [currentPage, totalPages, getPageNumbers]);


  return (
    <div className="min-h-screen py-12 sm:py-16 mt-8 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Invisible anchor element to scroll to */}
        {/* Add pt/mt to offset fixed header if any. Adjust values based on your header height. */}
        <div ref={topOfListRef} className="pt-12 sm:pt-16 lg:pt-20 -mt-12 sm:-mt-16 lg:-mt-20"></div>

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
          <div className="w-20 h-1 bg-sky-500 mx-auto rounded-full"></div>
        </motion.div>
        {/* End Header Section */}

        {/* Filter Buttons Section */}
        <div className="mb-10 sm:mb-12 md:mb-16">
            {/* Status Filter Buttons Group */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.15 }}
               className="mb-6"
            >
                <p className="text-sm sm:text-base font-semibold text-slate-700 mb-3 text-center sm:text-left">Status:</p>
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 sm:gap-3">
                    {filterStatusOptions.map((statusOption) => (
                        <motion.button
                           key={statusOption.id}
                           onClick={() => setFilterStatus(statusOption.id)}
                           whileHover={{ y: -2, boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}
                           whileTap={{ scale: 0.97 }}
                           className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-md cursor-pointer text-xs sm:text-sm font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 ${
                               filterStatus === statusOption.id
                                 ? "bg-slate-700 text-white shadow-sm"
                                 : "bg-transparent text-slate-700 border border-slate-300 hover:bg-slate-100"
                           }`}
                        >
                           {statusOption.label}
                        </motion.button>
                    ))}
                </div>
            </motion.div>

            {/* Type Filter Buttons Group */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.25 }}
               className="mb-6 md:mb-8"
            >
                <p className="text-sm sm:text-base font-semibold text-slate-700 mb-3 text-center sm:text-left">Tipe Acara:</p>
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 sm:gap-3">
                    {filterTypeOptions.map((typeOption) => (
                        <motion.button
                           key={typeOption.id}
                           onClick={() => setFilterType(typeOption.id)}
                           whileHover={{ y: -2, boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}
                           whileTap={{ scale: 0.97 }}
                           className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-md cursor-pointer text-xs sm:text-sm font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                               filterType === typeOption.id // <-- DIPERBAIKI: Menggunakan filterType
                                 ? "bg-purple-600 text-white shadow-sm"
                                 : "bg-transparent text-purple-700 border border-purple-300 hover:bg-purple-100"
                           }`}
                        >
                           {typeOption.label}
                        </motion.button>
                    ))}
                </div>
            </motion.div>
        </div>
        {/* End Filter Buttons Section */}


        {/* Conditional Rendering: Loading, Empty State, or Event List */}
        {isLoading ? (
          // Loading State
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="w-10 h-10 border-4 border-slate-300 border-t-sky-500 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-600 text-sm">Memuat acara...</p>
          </motion.div>
        ) : filteredEvents.length === 0 ? (
          // Empty State (No events match filters)
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
              Saat ini tidak ada acara yang cocok dengan filter Anda.
            </p>
          </motion.div>
        ) : (
          // Event List and Pagination
          <> {/* Fragment membungkus grid acara dan kontrol pagination */}
              <AnimatePresence mode="wait">
                {/* motion.div untuk grid acara */}
                <motion.div
                  key={`${filterStatus}-${filterType}-${currentPage}`} // Key berubah saat filter atau halaman berubah
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, staggerChildren: 0.08 }}
                >
                  {/* Map paginatedEvents untuk menampilkan acara di halaman saat ini */}
                  {paginatedEvents.map((event, index) => (
                    <EventCard key={event.id} event={event} index={index} />
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* === Pagination Controls === */}
              {/* Tampilkan pagination hanya jika ada lebih dari 1 halaman */}
              {totalPages > 1 && (
                <nav className="mt-12 sm:mt-16 flex justify-center" aria-label="Pagination">
                  <ul className="inline-flex items-center -space-x-px rounded-md overflow-hidden border border-slate-300 shadow-sm"> {/* Menambahkan styling border dan shadow */}
                    {/* Tombol Previous */}
                    <li>
                      <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="flex items-center justify-center px-3 h-8 sm:px-4 sm:h-10 leading-tight text-slate-500 bg-white hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50 disabled:pointer-events-none"
                        aria-label="Previous Page"
                      >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="sr-only sm:not-sr-only ml-1">Previous</span>
                      </button>
                    </li>

                    {/* Nomor Halaman */}
                    {pageNumbersToDisplay.map((pageNumber, index) => (
                        <li key={index}> {/* Gunakan index sebagai key */}
                            {pageNumber === '...' ? (
                                <span className="flex items-center justify-center px-3 h-8 sm:px-4 sm:h-10 leading-tight text-slate-700 bg-white cursor-default">...</span>
                            ) : (
                                <button
                                    onClick={() => setCurrentPage(pageNumber)}
                                    aria-current={currentPage === pageNumber ? 'page' : undefined}
                                    className={`flex items-center justify-center px-3 h-8 sm:px-4 sm:h-10 leading-tight transition-colors duration-200 ${
                                        currentPage === pageNumber
                                            ? "bg-sky-50 border-sky-500 text-sky-600 hover:bg-sky-100 font-semibold" // Aktif
                                            : "text-slate-700 bg-white hover:bg-slate-100 hover:text-slate-700" // Inaktif
                                    }`}
                                >
                                    {pageNumber}
                                </button>
                            )}
                        </li>
                    ))}

                    {/* Tombol Next */}
                    <li>
                      <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="flex items-center justify-center px-3 h-8 sm:px-4 sm:h-10 leading-tight text-slate-500 bg-white hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50 disabled:pointer-events-none"
                        aria-label="Next Page"
                      >
                        <span className="sr-only sm:not-sr-only mr-1">Next</span>
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
              {/* =============================== */}
          </>
        )}
        {/* End Conditional Rendering */}

      </div> {/* End max-w-7xl div */}
    </div> // End outer div
  ); // End return statement
}; // End component function

export default EventsWithFilter;