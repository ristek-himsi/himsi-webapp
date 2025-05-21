// src/components/EventGallery.js
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation'; // Pastikan ini diimpor jika navigation: true
import 'swiper/css/pagination'; // Pastikan ini diimpor jika pagination: true
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

// Asumsikan getImageUrl ada di lib atau utils
import { getImageUrl } from '@/lib/supabase'; // atau path yang sesuai

// Placeholder jika getImageUrl tidak ada/untuk testing


const EventGallery = ({ events }) => {
  if (!events || events.length === 0) {
    return (
      <div className="text-center py-10 px-4 text-gray-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-lg font-medium">Galeri Event Kosong</p>
        <p className="text-sm text-gray-500">Tidak ada event untuk ditampilkan di galeri saat ini.</p>
      </div>
    );
  }

  // Ambil beberapa event terbaru untuk galeri, misal 5
  const galleryEvents = events
    .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
    .slice(0, 5);

  return (
    // Padding vertikal dan horizontal disesuaikan untuk mobile
    <div className="py-10 sm:py-12 md:py-16 lg:py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Margin bawah header dan ukuran teks disesuaikan */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 sm:mb-3">
            Galeri <span className="text-blue-600">Event</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-md sm:max-w-xl md:max-w-2xl mx-auto">
            Momen-momen tak terlupakan dari berbagai kegiatan yang telah kami selenggarakan.
          </p>
        </div>
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          navigation // Aktifkan jika CSS navigation diimpor dan diinginkan
          pagination={{ clickable: true }}
          loop={galleryEvents.length > 1} // Loop hanya jika ada lebih dari 1 slide
          autoplay={galleryEvents.length > 1 ? { delay: 4000, disableOnInteraction: false } : false} // Autoplay hanya jika ada lebih dari 1 slide
          effect="fade"
          fadeEffect={{
            crossFade: true
          }}
          // Aspek rasio default 16:9 (video) untuk mobile, lalu 16:7 untuk md ke atas
          className="rounded-xl shadow-2xl overflow-hidden aspect-video md:aspect-[16/7] lg:aspect-[18/7]"
        >
          {galleryEvents.map((event) => (
            <SwiperSlide key={event.id} className="relative group"> {/* Tambah group untuk hover image */}
              <Image
                src={getImageUrl(event.imageUrl, "events")} // Pastikan bucket 'events' sesuai
                alt={event.name || "Gambar Event"}
                layout="fill"
                objectFit="cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Memberikan hint ke browser
                className="brightness-[0.6] group-hover:brightness-75 transition-all duration-500 ease-in-out transform group-hover:scale-105" // Efek zoom pada hover
              />
              {/* Overlay dengan padding responsif */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-end items-start text-white">
                {/* Badge tipe event dengan ukuran teks responsif */}
                <span className="bg-blue-600 text-white px-2.5 py-1 sm:px-3 rounded-full text-[10px] sm:text-xs font-semibold mb-2 sm:mb-3 uppercase tracking-wider">
                  {event.type || "UMUM"}
                </span>
                {/* Judul event dengan ukuran teks responsif */}
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 line-clamp-2">
                  {event.name || "Nama Event Tidak Tersedia"}
                </h3>
                {/* Deskripsi tanggal dan lokasi dengan ukuran teks responsif */}
                <p className="text-xs sm:text-sm md:text-base text-gray-200 mb-3 sm:mb-4 line-clamp-2 md:line-clamp-3">
                  {new Date(event.startDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  {event.location && ` - ${event.location}`}
                </p>
                {/* Tombol dengan ukuran dan teks responsif */}
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
         {/* Kustomisasi navigasi dan paginasi Swiper jika perlu (biasanya di CSS global) */}
      </div>
    </div>
  );
};

export default EventGallery;