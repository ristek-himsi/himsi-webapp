"use client"; // Menandai bahwa ini adalah komponen client

import React from "react";
import Image from "next/image";
import { Calendar, MapPin, Users, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { getImageUrl } from "@/lib/supabase";

// Komponen untuk menampilkan detail acara (client component)
export const EventDetailClient = ({ event }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "d MMMM yyyy", { locale: id });
  };

  const startDate = formatDate(event.startDate);
  const endDate = formatDate(event.endDate);

  const getStatusColor = (status) => {
    switch (status) {
      case "UPCOMING":
        return "bg-blue-100 text-blue-800";
      case "ONGOING":
        return "bg-green-100 text-green-800";
      case "PAST":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "UPCOMING":
        return "Akan Datang";
      case "ONGOING":
        return "Berlangsung";
      case "PAST":
        return "Selesai";
      default:
        return status;
    }
  };

  // Function untuk menangani pendaftaran via WhatsApp yang langsung membuka chat
  const handleRegistration = () => {
    // Nomor WhatsApp yang akan dihubungi (bisa diganti sesuai kebutuhan)
    const phoneNumber = "6281368859389"; // Ganti dengan nomor WhatsApp administrator

    // Template pesan yang bisa dikustomisasi
    const message = `Halo, saya ingin mendaftar untuk acara: *${event.name}*\n\nTanggal: ${startDate} - ${endDate}\nLokasi: ${event.location}\n\nMohon informasi lebih lanjut mengenai pendaftaran. Terima kasih.`;

    // Membuat URL WhatsApp dengan template pesan
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    // Menggunakan window.location untuk membuka WhatsApp di halaman yang sama
    window.location.href = whatsappUrl;
  };

  return (
    <div className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8 py-12">
      {/* Navigation/breadcrumb */}
      <div className="mb-8">
        <a href="/events" className="text-gray-500 hover:text-gray-700 flex items-center space-x-2">
          <ArrowLeft className="w-5 h-5" />
          <span>Kembali ke Daftar Acara</span>
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Event Image */}
        <div className="lg:col-span-2 rounded-xl overflow-hidden shadow-sm border border-gray-100">
          <div className="relative h-96 w-full">
            <Image 
              src={getImageUrl(event?.imageUrl, "events")} 
              alt={event.name} 
              fill 
              className="object-cover" 
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw" 
              priority 
            />
          </div>
        </div>

        {/* Event Information */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{event.name}</h1>

          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)} mb-4`}>
            {getStatusText(event.status)}
          </span>

          <p className="text-gray-600 mb-6">{event.description}</p>

          <div className="space-y-4 mb-8">
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700">
                {startDate} - {endDate}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700">{event.location}</span>
            </div>

            <div className="flex items-center space-x-3">
              <Users className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700">Tahun Akademik {event.academicYear}</span>
            </div>
          </div>

          {event.status === "UPCOMING" && (
            <button 
              onClick={handleRegistration}
              className="w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300 cursor-pointer"
            >
              Daftar via WhatsApp
            </button>
          )}
        </div>
      </div>

      {/* Event Gallery */}
      {event?.gallery && event?.gallery.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Galeri Acara</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {event?.gallery.map((item) => (
              <div key={item.id} className="relative aspect-square rounded-lg overflow-hidden shadow-sm border border-gray-100">
                <Image
                  src={getImageUrl(item?.imageUrl, "events")}
                  alt={item.caption || "Galeri acara"}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
                {item.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm p-2 truncate">
                    {item.caption}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};