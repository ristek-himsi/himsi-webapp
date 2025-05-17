"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/visitors/Footer";
import { Calendar, Clock, MapPin, Users, ExternalLink } from "lucide-react";

const AcaraPage = () => {
  // Event status filter options
  const statusOptions = ["Semua", "Mendatang", "Berlangsung", "Selesai"];
  const [activeStatus, setActiveStatus] = useState("Semua");

  // Dummy events data
  const events = [
    {
      id: 1,
      title: "Seminar Artificial Intelligence",
      image: "/api/placeholder/600/400",
      date: "20 Mei 2025",
      time: "09:00 - 12:00 WIB",
      location: "Auditorium Kampus Utama",
      status: "Mendatang",
      description: "Seminar yang membahas tentang perkembangan terkini Artificial Intelligence dan penerapannya di berbagai industri.",
      capacity: "250 peserta",
      registrationLink: "#",
    },
    {
      id: 2,
      title: "Workshop Data Science",
      image: "/api/placeholder/600/400",
      date: "10 Juni 2025",
      time: "13:00 - 17:00 WIB",
      location: "Laboratorium Komputer",
      status: "Mendatang",
      description: "Workshop hands-on untuk mempelajari dasar-dasar analisis data menggunakan Python dan tools data science populer.",
      capacity: "50 peserta",
      registrationLink: "#",
    },
    {
      id: 3,
      title: "Kompetisi Hackathon",
      image: "/api/placeholder/600/400",
      date: "25-27 Juni 2025",
      time: "48 jam non-stop",
      location: "Gedung Pusat Inovasi",
      status: "Mendatang",
      description: "Kompetisi pengembangan aplikasi dengan tema Smart City yang berlangsung selama 48 jam.",
      capacity: "20 tim",
      registrationLink: "#",
    },
    {
      id: 4,
      title: "Webinar Cybersecurity",
      image: "/api/placeholder/600/400",
      date: "15 April 2025",
      time: "15:00 - 17:00 WIB",
      location: "Online via Zoom",
      status: "Selesai",
      description: "Webinar yang membahas tentang ancaman cyber terkini dan cara mengamankan sistem informasi dari serangan.",
      capacity: "Tidak terbatas",
      registrationLink: null,
    },
    {
      id: 5,
      title: "Company Visit: Tech Startup",
      image: "/api/placeholder/600/400",
      date: "5 April 2025",
      time: "09:00 - 14:00 WIB",
      location: "Jakarta Selatan",
      status: "Selesai",
      description: "Kunjungan ke perusahaan startup teknologi untuk belajar tentang proses pengembangan produk dan kultur perusahaan.",
      capacity: "30 peserta",
      registrationLink: null,
    },
    {
      id: 6,
      title: "TechTalk: Cloud Computing",
      image: "/api/placeholder/600/400",
      date: "7 Mei 2025 - 10 Mei 2025",
      time: "19:00 - 21:00 WIB",
      location: "Aula Fakultas",
      status: "Berlangsung",
      description: "Diskusi interaktif dengan praktisi industri tentang tren terkini dalam cloud computing dan kesempatan karir.",
      capacity: "100 peserta",
      registrationLink: "#",
    },
  ];

  // Filter events based on active status
  const filteredEvents = activeStatus === "Semua" ? events : events.filter((event) => event.status === activeStatus);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">Acara HIMSI</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Berbagai acara menarik yang diselenggarakan oleh HIMSI untuk mengembangkan pengetahuan, skill, dan jaringan.</p>
          </div>

          {/* Status Filter */}
          <div className="flex flex-wrap justify-center mb-8 gap-2">
            {statusOptions.map((status, idx) => (
              <button
                key={idx}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${activeStatus === status ? "bg-blue-600 text-white" : "bg-white text-blue-800 hover:bg-blue-100"}`}
                onClick={() => setActiveStatus(status)}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Events List */}
          <div className="space-y-8">
            {filteredEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <div className="relative h-48 md:h-full">
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                      <div className="absolute top-0 right-0 m-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${event.status === "Mendatang" ? "bg-green-100 text-green-800" : event.status === "Berlangsung" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`}
                        >
                          {event.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 md:w-2/3">
                    <h2 className="text-2xl font-bold text-blue-900 mb-2">{event.title}</h2>

                    <div className="flex flex-wrap gap-y-2 mb-4">
                      <div className="flex items-center text-gray-600 text-sm mr-6">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm mr-6">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm mr-6">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <Users className="w-4 h-4 mr-1" />
                        <span>{event.capacity}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6">{event.description}</p>

                    {event.status !== "Selesai" && event.registrationLink && (
                      <a href={event.registrationLink} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                        Daftar Sekarang
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    )}

                    {event.status === "Selesai" && <span className="inline-block px-4 py-2 bg-gray-100 text-gray-600 rounded-md">Acara Telah Selesai</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 bg-blue-100 text-blue-900 p-8 rounded-2xl text-center">
            <h2 className="text-2xl font-bold mb-4">Ingin Mengadakan Kolaborasi?</h2>
            <p className="mb-6 max-w-2xl mx-auto">HIMSI terbuka untuk berbagai bentuk kolaborasi dalam penyelenggaraan acara bersama komunitas, perusahaan, atau institusi lainnya.</p>
            <a href="/pages/kontak" className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200">
              Hubungi Kami
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AcaraPage;
