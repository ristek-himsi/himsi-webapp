// src/components/visitors/EventCard.jsx
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
  const rawEventStatus = String(event?.status || "UPCOMING").toUpperCase(); // Ambil dan ubah ke uppercase
  const eventId = event?.id || "#";
  const eventImageUrl = event?.imageUrl;

  // Check if the event is part of SIFest
  const isSIFestEvent = !!event?.sifest;
  const sifestYear = event?.sifest?.year; // Safely get SIFest year


  const statusConfig = {
    UPCOMING: {
      bgColor: "bg-sky-500",
      textColor: "text-sky-50",
      icon: (
        <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      label: "Akan Datang"
    },
    ONGOING: {
      bgColor: "bg-emerald-500",
      textColor: "text-emerald-50",
      icon: (
        <svg className="w-3.5 h-3.5 mr-1.5 animate-pulse" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path></svg>
      ),
      label: "Berlangsung"
    },
    COMPLETED: { // Should match Prisma enum
      bgColor: "bg-slate-500",
      textColor: "text-slate-50",
      icon: (
        <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      ),
      label: "Selesai"
    }
    // Add a default case if rawEventStatus might be something else
    // default: { ... }
  };

  // Use rawEventStatus for lookup, fallback to UPCOMING if status is unexpected
  const status = statusConfig[rawEventStatus] || statusConfig.UPCOMING;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -25 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group flex flex-col h-full"
    >
      <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex flex-col flex-grow">
        <div className="relative h-52 sm:h-56 overflow-hidden">
          <Image
            src={getImageUrl(eventImageUrl, "events")}
            alt={eventName}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

          {/* SIFest Indicator Badge */}
          {isSIFestEvent && (
             <span className="absolute top-3 left-3 bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
                SIFest {sifestYear}
             </span>
          )}
          {/* --- End SIFest Indicator --- */}

          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-1.5 line-clamp-2 leading-tight">
              {eventName}
            </h2>
            {/* Status Pill */}
            <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-medium ${status.bgColor} ${status.textColor} shadow-sm`}>
              {status.icon}
              {status.label}
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-5 flex flex-col flex-grow">
          <p className="text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed flex-grow">
            {eventDescription}
          </p>

          <div className="space-y-2 mb-5 text-xs sm:text-sm text-slate-500">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              {eventStartDate ? new Date(eventStartDate).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short", // e.g., Jan, Feb
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