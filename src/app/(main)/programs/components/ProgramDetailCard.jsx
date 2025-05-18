"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar, ArrowLeft } from "lucide-react";
import { getImageUrl } from "@/lib/supabase";

// Komponen untuk format tanggal
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, "d MMMM yyyy", { locale: id });
};

// Komponen untuk status program
const ProgramStatus = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "UPCOMING":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "ONGOING":
        return "bg-green-100 text-green-800 border-green-200";
      case "PAST":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
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

  return (
    <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${getStatusColor(status)} border`}>
      {status === "ONGOING" && <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>}
      {getStatusText(status)}
    </span>
  );
};

// Client Component (Detail Card)
export const ProgramDetailCard = ({ program }) => {
  const startDate = formatDate(program.startDate);
  const endDate = formatDate(program.endDate);
  
  return (
    <>
      {/* Navigasi kembali */}
      <div className="mb-6">
        <Link href="/programs" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span>Kembali ke Daftar Program</span>
        </Link>
      </div>

      {/* Card Program dengan Layout yang Presisi */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header dengan Layout Grid yang Lebih Presisi untuk Laptop */}
        <div className="md:grid md:grid-cols-12 md:gap-0">
          {/* Banner Image - Ukuran yang konsisten */}
          <div className="relative h-64 md:h-96 md:col-span-5">
            <Image
              src={getImageUrl(program.imageUrl, "programs")}
              alt={program.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute top-4 left-4">
              <ProgramStatus status={program.status} />
            </div>
          </div>

          {/* Informasi Program - Layout yang presisi */}
          <div className="p-6 md:p-8 md:col-span-7">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <Image
                  src={getImageUrl(program.division.logoUrl, "divisi")}
                  alt={program.division.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-sm font-medium text-indigo-600">Divisi {program.division.name}</h3>
                <p className="text-sm text-gray-500">Penyelenggara Program</p>
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{program.name}</h1>
            
            <div className="flex items-center text-gray-600 mb-6">
              <Calendar className="h-5 w-5 mr-2 text-gray-400 flex-shrink-0" />
              <span>{startDate} - {endDate}</span>
            </div>
            <div className=" py-6 border-t border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-5">Tentang Program</h2>
            <p className="text-gray-700 ps-1">{program.description}</p>
        </div>
          </div>
        </div>

        {/* Konten Detail */}
        
      </div>
    </>
  );
};