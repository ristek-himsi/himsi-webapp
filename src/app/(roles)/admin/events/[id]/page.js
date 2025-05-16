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

  const eventImagePreview = getImageUrl(event?.imageUrl, "events");

  const handleGalleryAddSuccess = () => {
    fetchEvent();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-t-blue-600 border-b-blue-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 text-sm font-medium">Memuat detail event...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-3xl mx-auto bg-red-50 p-4 rounded-lg shadow-sm">
          <p className="text-red-600 text-sm font-medium">{error || "Event tidak ditemukan"}</p>
        </div>
        <Link href="/admin/events" className="block max-w-3xl mx-auto mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
          Kembali ke daftar event
        </Link>
      </div>
    );
  }

  const formattedStartDate = format(new Date(event.startDate), "MMM d, yyyy");
  const formattedEndDate = format(new Date(event.endDate), "MMM d, yyyy");

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{event.name}</h1>
          <div className="flex space-x-3">
            <Link href={`/admin/events/${id}/edit`} className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
              Edit Event
            </Link>
            <Link href="/admin/events" className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
              Kembali
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
          <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Informasi Event</h2>
              <dl className="space-y-3 text-sm text-gray-600">
                <div>
                  <dt className="font-medium text-gray-900">Nama</dt>
                  <dd>{event.name}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">Tanggal</dt>
                  <dd>
                    {formattedStartDate} - {formattedEndDate}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">Lokasi</dt>
                  <dd>{event.location}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">Deskripsi</dt>
                  <dd>{event.description || "Tidak ada deskripsi"}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">Status</dt>
                  <dd>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        event.status === "UPCOMING" ? "bg-amber-100 text-amber-800" : event.status === "ONGOING" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {event.status.toLowerCase()}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">Tipe</dt>
                  <dd>{event.type === "SIFEST" ? <span className="inline-flex items-center bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full text-xs font-medium">SIFEST</span> : "Regular"}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">Tahun Akademik</dt>
                  <dd>{event.academicYear}</dd>
                </div>
              </dl>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Gambar Utama</h2>
              <div className="relative h-32 sm:h-64 w-full rounded-lg overflow-hidden shadow-md">
                <Image src={eventImagePreview} alt={event.name} fill style={{ objectFit: "cover" }} className="transition-transform duration-300 hover:scale-105" />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Galeri</h2>
              <button onClick={() => setShowAddGallery(!showAddGallery)} className="flex items-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                {showAddGallery ? "Tutup Form" : "Tambah Gambar"}
              </button>
            </div>

            {showAddGallery && <AddEventGalleryForm eventId={id} onSuccess={handleGalleryAddSuccess} />}

            {event.gallery && event.gallery.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {event.gallery.map((image) => (
                  <div key={image.id} className="relative h-32 sm:h-40 rounded-lg overflow-hidden shadow-sm group">
                    <Image src={getImageUrl(image?.imageUrl, "events")} alt={image.caption || "Galeri event"} fill style={{ objectFit: "cover" }} className="transition-transform duration-300 group-hover:scale-105" />
                    {image.caption && <p className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-xs p-2 line-clamp-1">{image.caption}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-sm">Tidak ada gambar di galeri.</p>
            )}
          </div>

          {event.sifest && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Detail SIFEST</h2>
              <dl className="space-y-3 text-sm text-gray-600">
                <div>
                  <dt className="font-medium text-gray-900">Tahun</dt>
                  <dd>{event.sifest.year}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">Tema</dt>
                  <dd>{event.sifest.theme}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">Periode</dt>
                  <dd>
                    {format(new Date(event.sifest.startDate), "d MMM yyyy")} - {format(new Date(event.sifest.endDate), "d MMM yyyy")}
                  </dd>
                </div>
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
