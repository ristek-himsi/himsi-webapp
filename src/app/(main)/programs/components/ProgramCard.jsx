// src/components/ProgramCard.js
'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ArrowRight, Users, Tag } from "lucide-react"; // Menggunakan CalendarDays untuk ikon tanggal, Users untuk divisi, Tag untuk status
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { getImageUrl } from "@/lib/supabase"; // Pastikan path ini benar

export const ProgramCard = ({ program }) => {
  // Fallback untuk properti program
  const programName = program?.name || "Nama Program";
  const programDescription = program?.description || "Deskripsi program tidak tersedia.";
  const programStartDate = program?.startDate;
  const programEndDate = program?.endDate;
  const programStatus = program?.status || "UPCOMING";
  const programDivisionName = program?.division?.name || "Divisi Umum";
  const programId = program?.id || "#";
  const programImageUrl = program?.imageUrl;

  const formatDate = (dateString) => {
    if (!dateString) return "Segera";
    try {
      const date = new Date(dateString);
      return format(date, "d MMM yyyy", { locale: id }); // Format tanggal lebih singkat
    } catch (error) {
      console.error("Invalid date string for program:", programName, error);
      return "Tanggal Invalid";
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "UPCOMING":
        return {
          bgColor: "bg-sky-100",
          textColor: "text-sky-700",
          borderColor: "border-sky-300",
          label: "Akan Datang"
        };
      case "ONGOING":
        return {
          bgColor: "bg-emerald-100",
          textColor: "text-emerald-700",
          borderColor: "border-emerald-300",
          label: "Berlangsung"
        };
      case "COMPLETED": // Mengganti PAST menjadi COMPLETED agar konsisten dengan filter
        return {
          bgColor: "bg-slate-100",
          textColor: "text-slate-700",
          borderColor: "border-slate-300",
          label: "Selesai"
        };
      default:
        return {
          bgColor: "bg-sky-100",
          textColor: "text-sky-700",
          borderColor: "border-sky-300",
          label: status // Tampilkan status asli jika tidak dikenal
        };
    }
  };

  const statusStyle = getStatusStyle(programStatus);

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl border border-slate-100 transition-all duration-300 ease-in-out flex flex-col h-full transform hover:-translate-y-1">
      {/* Image Section */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden">
        <Image
          src={getImageUrl(programImageUrl, "programs")}
          alt={programName}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Optional: Darker overlay for better text contrast if needed */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div> */}
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        {/* Status Badge and Division */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5 sm:mb-3">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-semibold border ${statusStyle.bgColor} ${statusStyle.textColor} ${statusStyle.borderColor}`}>
                <Tag className="w-3 h-3 mr-1.5" />
                {statusStyle.label}
            </span>
            <span className="text-xs sm:text-sm text-slate-500 inline-flex items-center">
                <Users className="w-3.5 h-3.5 mr-1 text-indigo-500" />
                {programDivisionName}
            </span>
        </div>

        <h2 className="text-lg sm:text-xl font-semibold text-slate-800 mb-2 line-clamp-2 hover:text-indigo-600 transition-colors">
          <Link href={programId === "#" ? "#" : `/programs/${programId}`}>{programName}</Link>
        </h2>
        
        {/* Date Info */}
        <div className="flex items-center text-xs sm:text-sm text-slate-500 mb-3 sm:mb-4">
          <CalendarDays className="w-4 h-4 mr-2 text-slate-400 flex-shrink-0" />
          <span>
            {formatDate(programStartDate)}{programEndDate && programEndDate !== programStartDate ? ` - ${formatDate(programEndDate)}` : ''}
          </span>
        </div>
        
        <p className="text-sm text-slate-600 mb-4 line-clamp-3 leading-relaxed flex-grow">
            {programDescription}
        </p>
        
        {/* Action Link - dibuat lebih subtle dan menyatu */}
        <div className="mt-auto pt-3 border-t border-slate-100">
          <Link 
            href={programId === "#" ? "#" : `/programs/${programId}`} 
            className={`inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700 group/link transition-colors duration-200 ${programId === "#" ? "opacity-60 pointer-events-none" : ""}`}
          >
            Lihat Detail Program
            <ArrowRight className="h-4 w-4 ml-1.5 transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};