"use client";

import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import EventCard from "@/components/admin/EventCard";
import { getAllEvents } from "./libs/data";
import Loading from "@/app/loading";

// Content component that will be wrapped with Suspense
const EventsContent = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      setIsLoading(true);
      try {
        const eventsData = await getAllEvents();
        setEvents(eventsData);
      } catch (err) {
        console.error("Gagal memuat events:", err);
        setError("Gagal memuat event. Coba lagi nanti.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchEvents();
  }, []);

  // Filter events berdasarkan type, status, dan search query
  const filteredEvents = events.filter((event) => {
    const matchesType = selectedType ? event.type === selectedType : true;
    const matchesStatus = selectedStatus ? event.status === selectedStatus : true;
    const matchesSearch = searchQuery
      ? event.name.toLowerCase().includes(searchQuery.toLowerCase()) || event.description.toLowerCase().includes(searchQuery.toLowerCase()) || event.location.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesType && matchesStatus && matchesSearch;
  });

  if (error) {
    return (
      <div className="min-h-screen p-6">
        <div className="bg-red-50 p-4 rounded-md mb-6">
          <p className="text-red-600">{error}</p>
        </div>
        <Link href="/admin/dashboard" className="text-blue-500 hover:underline">
          Kembali ke dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      {/* Notifikasi */}
      {notification && <div className={`fixed top-4 right-4 p-4 rounded-md shadow-md ${notification.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{notification.message}</div>}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manajemen Event</h1>
        <Link href="/admin/events/create" className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 sm:py-2 sm:px-4 rounded-md text-sm text-center transition-colors">
          Tambah Event Baru
        </Link>
      </div>

      {/* Filtering options */}
      <div className="mb-6 flex flex-wrap gap-4">
        <select className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
          <option value="">Semua Tipe</option>
          <option value="REGULAR">Regular</option>
          <option value="SIFEST">SIFEST</option>
        </select>

        <select className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
          <option value="">Semua Status</option>
          <option value="UPCOMING">Upcoming</option>
          <option value="ONGOING">Ongoing</option>
          <option value="COMPLETED">Completed</option>
        </select>

        <input
          type="text"
          placeholder="Cari event (nama, deskripsi, lokasi)..."
          className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-pulse flex flex-col space-y-4 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((index) => (
                <div key={index} className="bg-gray-100 rounded-lg h-64 w-full"></div>
              ))}
            </div>
          </div>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="bg-gray-50 p-8 text-center rounded-md">
          <p className="text-gray-500 mb-4">
            Tidak ada event ditemukan.
            {searchQuery || selectedType || selectedStatus ? " Coba ubah filter atau cari kata lain." : ""}
          </p>
          <Link href="/admin/events/create" className="text-blue-500 hover:underline">
            Buat event pertama
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function EventsAdminPage() {
  return (
    <Suspense fallback={<Loading />}>
      <EventsContent />
    </Suspense>
  );
}
