// src/components/dashboard/EventGallery.js
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

import { getImageUrl } from '@/lib/supabase';

const MAX_GALLERY_EVENTS = 6; // Tentukan jumlah maksimal event yang ingin ditampilkan

const EventGallery = ({ events: allEventsFromProps }) => { // Ubah nama prop untuk kejelasan

  if (!allEventsFromProps || allEventsFromProps.length === 0) {
    // Tampilan jika tidak ada event sama sekali yang diterima
    return (
      <div className="py-10 sm:py-12 md:py-16 lg:py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          {/* ... (SVG dan pesan untuk 'Tidak ada event sama sekali') ... */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
            Galeri Event
          </h2>
          <p className="text-sm sm:text-base text-gray-500">
            Tidak ada event untuk ditampilkan saat ini.
          </p>
        </div>
      </div>
    );
  }

  // 1. Filter events: hanya yang statusnya COMPLETED
  // 2. Urutkan berdasarkan tanggal selesai (endDate) atau tanggal mulai (startDate) terbaru
  // 3. Ambil sejumlah event teratas untuk galeri
  const galleryEvents = allEventsFromProps
    .filter(event => event.status === "COMPLETED") // Sesuai enum EVENT_STATUS
    .sort((a, b) => {
      // Prioritaskan endDate jika ada, jika tidak gunakan startDate
      const dateA = new Date(a.endDate || a.startDate);
      const dateB = new Date(b.endDate || b.startDate);
      return dateB - dateA; // Urutkan dari yang terbaru (descending)
    })
    .slice(0, MAX_GALLERY_EVENTS);

  if (galleryEvents.length === 0) {
    // Tampilan jika ada event, tapi tidak ada yang COMPLETED
    return (
      <div className="py-10 sm:py-12 md:py-16 lg:py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
            Galeri Event Selesai
          </h2>
          <p className="text-sm sm:text-base text-gray-500">
            Belum ada event yang telah selesai untuk ditampilkan di galeri saat ini.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 sm:py-12 md:py-16 lg:py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 sm:mb-3">
            Galeri <span className="text-blue-600">Event Selesai</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-md sm:max-w-xl md:max-w-2xl mx-auto">
            Momen-momen tak terlupakan dari berbagai kegiatan yang telah kami selenggarakan.
          </p>
        </div>
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          loop={galleryEvents.length > 1}
          autoplay={galleryEvents.length > 1 ? { delay: 4000, disableOnInteraction: false } : false}
          effect="fade"
          fadeEffect={{
            crossFade: true
          }}
          className="rounded-xl shadow-2xl overflow-hidden aspect-video md:aspect-[16/7] lg:aspect-[18/7]"
        >
          {galleryEvents.map((event) => (
            <SwiperSlide key={event.id} className="relative group">
              <Image
                src={getImageUrl(event.imageUrl, "events")}
                alt={event.name || "Gambar Event"}
                layout="fill"
                objectFit="cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                className="brightness-[0.6] group-hover:brightness-75 transition-all duration-500 ease-in-out transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-end items-start text-white">
                <span className="bg-blue-600 text-white px-2.5 py-1 sm:px-3 rounded-full text-[10px] sm:text-xs font-semibold mb-2 sm:mb-3 uppercase tracking-wider">
                  {event.type || "UMUM"}
                </span>
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 line-clamp-2">
                  {event.name || "Nama Event Tidak Tersedia"}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-200 mb-3 sm:mb-4 line-clamp-2 md:line-clamp-3">
                  Selesai pada: {new Date(event.endDate || event.startDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  {event.location && ` - ${event.location}`}
                </p>
                <Link
                  href={`/events/${event.id}`}
                  className="mt-auto bg-white text-blue-700 hover:bg-blue-100 font-semibold py-1.5 px-3 sm:py-2 sm:px-4 rounded-md transition-colors duration-300 text-xs sm:text-sm"
                >
                  Lihat Detail
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default EventGallery;