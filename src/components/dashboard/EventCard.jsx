// src/components/EventCard.js
import Link from 'next/link';
import Image from 'next/image';

// Asumsikan getImageUrl ada di lib atau utils
import { getImageUrl } from '@/lib/supabase'; // atau path yang sesuai

const EventCard = ({ event }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "Tanggal tidak tersedia";
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const startDate = formatDate(event.startDate);
  const endDate = event.endDate && event.endDate !== event.startDate ? formatDate(event.endDate) : null;

  // Fallback untuk properti event jika tidak ada
  const eventName = event?.name || "Nama Acara Tidak Tersedia";
  const eventType = event?.type || "Umum";
  const eventLocation = event?.location || "Online";
  const eventDescription = event?.description || "Deskripsi acara belum tersedia.";
  const eventImageUrl = event?.imageUrl;
  const eventId = event?.id || "#"; // Fallback untuk link jika id tidak ada


  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full group transform hover:-translate-y-1">
      {/* Tinggi gambar disesuaikan: h-48 di mobile, sm:h-52, md:h-56 di layar lebih besar */}
      <div className="h-48 sm:h-52 md:h-56 relative overflow-hidden">
        <Image
          src={getImageUrl(eventImageUrl, "events")}
          alt={eventName}
          layout="fill"
          objectFit="cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw" // Perkiraan ukuran untuk optimasi
          className="group-hover:scale-105 transition-transform duration-500 ease-in-out"
        />
        {/* Overlay gradien untuk kontras teks pada gambar (opsional, tergantung gambar) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
        {/* Badge tipe acara dengan ukuran dan padding responsif */}
        <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 bg-blue-600 text-white px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold shadow-md uppercase tracking-wider">
          {eventType}
        </div>
      </div>
      {/* Padding konten disesuaikan: p-4 di mobile, sm:p-5 di layar lebih besar */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        {/* Judul acara dengan ukuran font responsif */}
        <h3 className="font-bold text-lg sm:text-xl mb-1.5 sm:mb-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
          {eventName}
        </h3>
        {/* Info tanggal dan lokasi dengan ukuran font dan ikon responsif */}
        <div className="space-y-1.5 sm:space-y-2 mb-2 sm:mb-3">
          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 text-blue-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span>
              {startDate} {endDate && ` - ${endDate}`}
            </span>
          </div>
          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 text-blue-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="line-clamp-1">{eventLocation}</span>
          </div>
        </div>
        {/* Deskripsi acara dengan ukuran font responsif */}
        <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4 line-clamp-3 flex-grow">
          {eventDescription}
        </p>
        {/* Tombol detail dengan padding dan ukuran font responsif */}
        <div className="flex justify-end mt-auto pt-3 sm:pt-4 border-t border-gray-100">
          <Link
            href={eventId === "#" ? "#" : `/events/${eventId}`}
            className={`inline-flex items-center text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-semibold group-hover:underline ${eventId === "#" ? "pointer-events-none opacity-50" : ""}`}
          >
            Detail Acara <span aria-hidden="true" className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;