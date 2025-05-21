// src/components/EventCard.js
'use client';
import Link from "next/link";
import Image from "next/image";
import { getImageUrl } from "@/lib/supabase"; // Pastikan path ini benar
import { motion } from "framer-motion";


const EventCard = ({ event, index }) => {
  // Fallback untuk properti event
  const eventName = event?.name || "Nama Acara";
  const eventDescription = event?.description || "Deskripsi acara tidak tersedia.";
  const eventLocation = event?.location || "Lokasi tidak diketahui";
  const eventStartDate = event?.startDate;
  const eventStatus = event?.status || "UPCOMING";
  const eventId = event?.id || "#";
  const eventImageUrl = event?.imageUrl;

  const statusConfig = {
    UPCOMING: {
      bgColor: "bg-sky-500", // Warna biru langit untuk upcoming
      textColor: "text-sky-50",
      icon: (
        <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      label: "Akan Datang"
    },
    ONGOING: {
      bgColor: "bg-emerald-500", // Warna hijau emerald untuk ongoing
      textColor: "text-emerald-50",
      icon: (
        <svg className="w-3.5 h-3.5 mr-1.5 animate-pulse" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path></svg>
      ),
      label: "Berlangsung"
    },
    PAST: {
      bgColor: "bg-slate-500", // Warna abu-abu netral untuk past
      textColor: "text-slate-50",
      icon: (
        <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      ),
      label: "Selesai"
    }
  };

  const status = statusConfig[eventStatus] || statusConfig.UPCOMING;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -25 }}
      transition={{ duration: 0.4, delay: index * 0.08 }} // Sedikit percepat delay
      className="group flex flex-col h-full" // Tambah flex flex-col h-full
    >
      {/* Card Container */}
      <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex flex-col flex-grow"> {/* flex-grow agar card mengisi h-full */}
        {/* Image Section */}
        <div className="relative h-52 sm:h-56 overflow-hidden"> {/* Sedikit lebih pendek */}
          <Image
            src={getImageUrl(eventImageUrl, "events")}
            alt={eventName}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110" // Efek zoom lebih halus
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div> {/* Gradien lebih kuat di bawah */}
          
          {/* Info di atas gambar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-1.5 line-clamp-2 leading-tight"> {/* line-clamp-2 agar judul bisa 2 baris */}
              {eventName}
            </h2>
            <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-medium ${status.bgColor} ${status.textColor} shadow-sm`}>
              {status.icon}
              {status.label}
            </div>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-4 sm:p-5 flex flex-col flex-grow"> {/* flex-grow agar konten mengisi sisa ruang */}
          <p className="text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed flex-grow"> {/* line-clamp-3, flex-grow agar deskripsi mengisi ruang */}
            {eventDescription}
          </p>
          
          {/* Meta Info */}
          <div className="space-y-2 mb-5 text-xs sm:text-sm text-slate-500">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              {eventStartDate ? new Date(eventStartDate).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short", // Bulan singkat lebih elegan
                year: "numeric",
              }) : "Tanggal akan diumumkan"}
            </div>
            
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span className="line-clamp-1">{eventLocation}</span>
            </div>
          </div>
          
          {/* Action Button */}
          <Link
            href={eventId === "#" ? "#" : `/events/${eventId}`}
            className={`block w-full text-center px-4 py-2.5 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors duration-300 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 ${eventId === "#" ? "opacity-60 pointer-events-none" : ""}`}
          >
            Lihat Detail
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;