"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Calendar, MapPin, Users, ArrowLeft, Info, Search } from "lucide-react";
import { format } from "date-fns";
import { id as localeID } from "date-fns/locale";
import { getImageUrl } from "@/lib/supabase"; // Pastikan path ini benar

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export const EventDetailClient = ({ event }) => {
  const router = useRouter();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const formatDate = useCallback((dateString) => {
    if (!dateString) return "Tanggal tidak tersedia";
    try {
      const date = new Date(dateString);
      return format(date, "d MMMM yyyy", { locale: localeID });
    } catch (error) {
      console.error("Error formatting date:", dateString, error);
      return "Tanggal tidak valid";
    }
  }, []);

  const startDate = formatDate(event?.startDate);
  const endDate = formatDate(event?.endDate);

  const getStatusPill = (status) => {
    let bgColor, textColor, text;
    switch (status) {
      case "UPCOMING":
        bgColor = "bg-sky-100";
        textColor = "text-sky-700";
        text = "Akan Datang";
        break;
      case "ONGOING":
        bgColor = "bg-emerald-100";
        textColor = "text-emerald-700";
        text = "Sedang Berlangsung";
        break;
      case "PAST":
        bgColor = "bg-slate-100";
        textColor = "text-slate-700";
        text = "Telah Selesai";
        break;
      default:
        bgColor = "bg-gray-100";
        textColor = "text-gray-700";
        text = status || "Status Tidak Diketahui";
    }
    return (
      <span
        className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold ${bgColor} ${textColor} whitespace-nowrap`}
      >
        {text}
      </span>
    );
  };

  const handleRegistration = () => {
    const phoneNumber = "6281368859389"; // Ganti dengan nomor tujuan
    const message = `Halo, saya tertarik untuk mendaftar acara: *${event.name}*.\n\nTanggal: ${startDate} - ${endDate}\nLokasi: ${event.location}\n\nMohon informasi lebih lanjut mengenai pendaftaran. Terima kasih.`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const galleryItems = event?.gallery
    ?.filter(item => item?.imageUrl)
    .map((item) => ({
      src: getImageUrl(item.imageUrl, "events"),
      alt: item.caption || event.name || "Gambar Galeri",
      title: item.caption || "",
  })) || [];

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  if (!event) {
    return (
        <div className="bg-slate-50 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] text-center px-4 py-10"> {/* Disesuaikan min-h */}
            <Info className="w-16 h-16 text-gray-400 mb-4" />
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">Detail Acara Tidak Ditemukan</h2>
            <p className="text-gray-500 max-w-md mb-8">Maaf, kami tidak dapat menemukan detail untuk acara yang Anda cari. Mungkin acara tersebut telah dihapus atau URL tidak valid.</p>
        </div>
    );
  }
  
  return (
    <div className="bg-slate-50 mt-12 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        <article className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8"> {/* Pembagian 3:2 untuk gambar dan info */}
            
            {/* Kolom Gambar Utama (3/5 dari lebar di LG) */}
            <div className="lg:col-span-3 relative w-full bg-gray-200 aspect-[16/9] sm:aspect-[4/3] lg:aspect-[16/9]"> {/* Pertahankan rasio di LG */}
              {event.imageUrl ? (
                <Image
                  src={getImageUrl(event.imageUrl, "events")}
                  alt={`Gambar utama untuk ${event.name || "acara"}`}
                  fill
                  className="object-cover"
                  // Sizes: 100vw hingga LG. Di LG, sekitar 60% dari max-w-6xl (1152px) - gap.
                  // (1152px * 3/5) - (gap * 2/5) approx 670px.
                  sizes="(max-width: 1023px) 100vw, (min-width: 1024px) 670px"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center min-h-[250px] sm:min-h-[300px] lg:min-h-[400px]"> {/* Min height for placeholder */}
                  <Info className="h-16 w-16 sm:h-20 sm:w-20 text-gray-400" />
                </div>
              )}
            </div>

            {/* Kolom Informasi Acara (2/5 dari lebar di LG) */}
            <div className="lg:col-span-2 p-5 sm:p-6 md:p-8 lg:p-8 flex flex-col"> {/* lg:p-8 untuk padding konsisten, flex flex-col agar tombol daftar bisa di bawah */}
              <div className="flex-grow"> {/* Agar konten info memenuhi ruang sebelum tombol */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4 md:mb-5">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 leading-tight flex-1">
                    {event.name || "Nama Acara Tidak Tersedia"}
                  </h1>
                  <span>
                  {event.status && getStatusPill(event.status)}
                  </span>
                </div>

                <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
                  {event.description || "Deskripsi acara tidak tersedia saat ini."}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-1 gap-y-5 mb-8 sm:mb-10 border-t border-gray-200 pt-6 sm:pt-8"> {/* Detail jadi 1 kolom di info sempit */}
                  <div className="flex items-start space-x-3">
                    <Calendar className="h-5 w-5 text-sky-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 mb-0.5">Tanggal Pelaksanaan</h3>
                      <p className="text-gray-700 font-medium"> {/* Ukuran font base */}
                        {startDate}
                        {startDate !== endDate && event.endDate ? ` - ${endDate}` : ""}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-red-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 mb-0.5">Lokasi</h3>
                      <p className="text-gray-700 font-medium">
                        {event.location || "Akan diumumkan"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Users className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 mb-0.5">Tahun Akademik</h3>
                      <p className="text-gray-700 font-medium">
                        {event.academicYear || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            <div className="mt-auto pt-6">
  {event.status === "UPCOMING" ? (
    <button
      onClick={handleRegistration}
      className="w-full bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-900 hover:to-gray-800 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
    >
      Daftar via WhatsApp
    </button>
  ) : (
    <div className="w-full bg-gray-200 text-gray-600 font-semibold py-3 px-8 rounded-lg text-center">
      Pendaftaran Ditutup
    </div>
  )}
</div>

            </div>
          </div>
        </article>

        {galleryItems.length > 0 && (
          <section className="mt-10 sm:mt-12 lg:mt-16">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">
              Galeri Acara
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {galleryItems.map((item, index) => (
                <button
                  key={item.src + index}
                  aria-label={`Lihat gambar ${item.alt || 'galeri'} lebih besar`}
                  className="relative aspect-square rounded-md overflow-hidden shadow-md group cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 focus:ring-offset-slate-50"
                  onClick={() => openLightbox(index)}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110 group-focus:scale-110"
                    sizes="(max-width: 639px) 45vw, (max-width: 767px) 30vw, (max-width: 1023px) 22vw, 250px" // Perkiraan sizes
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300">
                    <Search className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  {item.title && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2.5 pt-6">
                      <p className="text-white text-xs sm:text-sm font-medium truncate">{item.title}</p>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </section>
        )}
      </div>

      {galleryItems.length > 0 && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides={galleryItems}
          plugins={[Thumbnails, Zoom]}
          thumbnails={{ position: "bottom", width: 100, height: 65, padding: 2, gap: 5, border: 1, borderColor: "rgba(255, 255, 255, 0.2)", borderRadius: 4 }}
          zoom={{ maxZoomPixelRatio: 3, scrollToZoom: true }}
          styles={{ container: { backgroundColor: "rgba(0, 0, 0, .92)" }, thumbnail: { backgroundColor: "rgba(0,0,0,0.4)", opacity: 0.6, border: "1px solid rgba(255,255,255,0.1)" }, thumbnailActive: { opacity: 1, borderColor: "rgba(255,255,255,0.8)", transform: "scale(1.1)" }}}
        />
      )}
    </div>
  );
};