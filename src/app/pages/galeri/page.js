"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronLeft, ChevronRight } from "lucide-react";

const GaleriPage = () => {
  // Categories for gallery filtering
  const categories = ["Semua", "Acara", "Workshop", "Kunjungan", "Komunitas"];
  const [activeCategory, setActiveCategory] = useState("Semua");

  // Dummy data for gallery images
  const galleryItems = [
    {
      id: 1,
      title: "Seminar Teknologi Blockchain",
      category: "Acara",
      image: "/api/placeholder/600/400",
      date: "10 Oktober 2024",
    },
    {
      id: 2,
      title: "Workshop UI/UX Design",
      category: "Workshop",
      image: "/api/placeholder/600/400",
      date: "15 September 2024",
    },
    {
      id: 3,
      title: "Kunjungan Industri ke Google Indonesia",
      category: "Kunjungan",
      image: "/api/placeholder/600/400",
      date: "22 Agustus 2024",
    },
    {
      id: 4,
      title: "Rapat Kerja Tahunan",
      category: "Komunitas",
      image: "/api/placeholder/600/400",
      date: "5 Agustus 2024",
    },
    {
      id: 5,
      title: "Hackathon HIMSI 2024",
      category: "Acara",
      image: "/api/placeholder/600/400",
      date: "30 Juli 2024",
    },
    {
      id: 6,
      title: "Workshop Mobile Development",
      category: "Workshop",
      image: "/api/placeholder/600/400",
      date: "25 Juli 2024",
    },
    {
      id: 7,
      title: "Kunjungan ke Startup Lokal",
      category: "Kunjungan",
      image: "/api/placeholder/600/400",
      date: "18 Juli 2024",
    },
    {
      id: 8,
      title: "Gathering Anggota HIMSI",
      category: "Komunitas",
      image: "/api/placeholder/600/400",
      date: "10 Juli 2024",
    },
    {
      id: 9,
      title: "Seminar Data Science",
      category: "Acara",
      image: "/api/placeholder/600/400",
      date: "5 Juli 2024",
    },
  ];

  // Filter gallery items based on active category
  const filteredItems = activeCategory === "Semua" ? galleryItems : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">Galeri HIMSI</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Momen-momen berkesan yang terabadikan dalam setiap kegiatan dan perjalanan HIMSI.</p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center mb-8 gap-2">
            {categories.map((category, idx) => (
              <button
                key={idx}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${activeCategory === category ? "bg-blue-600 text-white" : "bg-white text-blue-800 hover:bg-blue-100"}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group">
                <div className="relative overflow-hidden h-48">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <span className="text-white text-xs font-medium px-4 py-2">{item.date}</span>
                  </div>
                </div>
                <div className="p-4">
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md mb-2">{item.category}</span>
                  <h3 className="font-medium text-blue-900">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-blue-800 hover:bg-blue-100">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-600 text-white">1</button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-blue-800 hover:bg-blue-100">2</button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-blue-800 hover:bg-blue-100">3</button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-blue-800 hover:bg-blue-100">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GaleriPage;
