"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { getEventById } from "@/app/(roles)/admin/events/libs/data";
import { getImageUrl } from "@/lib/supabase";
import AddEventGalleryForm from "@/components/admin/AddEventGalleryForm";

export default function EventDetailPage({ params }) {
  const unwrappedParams = React.use(params);
  const id = parseInt(unwrappedParams.id);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddGallery, setShowAddGallery] = useState(false);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  async function fetchEvent() {
    try {
      const eventData = await getEventById(id);
      if (!eventData) {
        throw new Error("Event tidak ditemukan");
      }
      setEvent(eventData);
      setLoading(false);
    } catch (err) {
      console.error("Gagal memuat event:", err);
      setError("Gagal memuat event. Coba lagi nanti.");
      setLoading(false);
    }
  }

  // Function to get the appropriate image URL
  const getEventImageUrl = (imageUrl) => {
    if (!imageUrl) {
      return "/placeholder-image.jpg";
    }

    // If the imageUrl already contains the full URL, return it directly
    if (imageUrl.startsWith("http")) {
      return imageUrl;
    }

    // Extract just the filename if it contains a path
    const fileName = imageUrl.includes("/") ? imageUrl.split("/").pop() : imageUrl;

    // Use the getImageUrl function to get the complete URL
    return getImageUrl(fileName, "events");
  };

  // Callback untuk refresh data setelah menambahkan gambar
  const handleGalleryAddSuccess = () => {
    fetchEvent();
    // Biarkan form tetap terbuka untuk menambahkan lebih banyak gambar
  };

  if (loading) {
    return (
      <div className="min-h-screen p-6 flex justify-center items-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-b-blue-500 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat detail event...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen p-6">
        <div className="bg-red-50 p-4 rounded-md mb-6">
          <p className="text-red-600">{error || "Event tidak ditemukan"}</p>
        </div>
        <Link href="/admin/events" className="text-blue-500 hover:underline">
          Kembali ke daftar event
        </Link>
      </div>
    );
  }

  const formattedStartDate = format(new Date(event.startDate), "MMM d, yyyy");
  const formattedEndDate = format(new Date(event.endDate), "MMM d, yyyy");

  // Get image URL from Supabase or use placeholder
  const mainImage = event.imageUrl ? getEventImageUrl(event.imageUrl) : event.gallery && event.gallery.length > 0 && event.gallery[0].imageUrl ? getEventImageUrl(event.gallery[0].imageUrl) : "/placeholder-image.jpg";

  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Detail Event: {event.name}</h1>
        <div className="flex space-x-4">
          <Link href={`/admin/events/${id}/edit`} className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md transition-colors">
            Edit Event
          </Link>
          <Link href="/admin/events" className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-colors">
            Kembali
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Informasi Event</h2>
            <p className="text-gray-600 mb-2">
              <strong>Nama:</strong> {event.name}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Tanggal:</strong> {formattedStartDate} - {formattedEndDate}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Lokasi:</strong> {event.location}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Deskripsi:</strong> {event.description || "Tidak ada deskripsi"}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Status:</strong>{" "}
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${event.status === "UPCOMING" ? "bg-yellow-100 text-yellow-800" : event.status === "ONGOING" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                {event.status.toLowerCase()}
              </span>
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Tipe:</strong> {event.type === "SIFEST" ? <span className="bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full text-xs font-medium">SIFEST</span> : "Regular"}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Tahun Akademik:</strong> {event.academicYear}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Gambar Utama</h2>
            <div className="relative h-48 w-full mb-4">
              <Image
                src={mainImage}
                alt={event.name}
                width={400}
                height={200}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                className="rounded-md"
                onError={(e) => {
                  e.target.src = "/placeholder-image.jpg";
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Galeri</h2>
          <button onClick={() => setShowAddGallery(!showAddGallery)} className="flex items-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-md transition-colors text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {showAddGallery ? "Tutup Form" : "Tambah Gambar"}
          </button>
        </div>

        {showAddGallery && <AddEventGalleryForm eventId={id} onSuccess={handleGalleryAddSuccess} />}

        {event.gallery && event.gallery.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {event.gallery.map((image) => (
              <div key={image.id} className="relative h-32 w-full">
                <Image
                  src={image.imageUrl ? getEventImageUrl(image.imageUrl) : "/placeholder-image.jpg"}
                  alt={image.caption || "Galeri event"}
                  width={200}
                  height={128}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                  className="rounded-md"
                  onError={(e) => {
                    e.target.src = "/placeholder-image.jpg";
                  }}
                />
                {image.caption && <p className="text-xs text-gray-600 mt-1 line-clamp-1">{image.caption}</p>}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 mt-2">Tidak ada gambar di galeri.</p>
        )}

        {event.sifest && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Detail SIFEST</h2>
            <p className="text-gray-600 mb-2">
              <strong>Tahun:</strong> {event.sifest.year}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Tema:</strong> {event.sifest.theme}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Periode:</strong> {format(new Date(event.sifest.startDate), "d MMM yyyy")} - {format(new Date(event.sifest.endDate), "d MMM yyyy")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
