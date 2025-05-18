"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { getImageUrl } from "@/lib/supabase";

// Komponen Child - Card Program
export const ProgramCard = ({ program }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "d MMMM yyyy", { locale: id });
  };

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

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-transform hover:shadow-md hover:scale-[1.01]">
      <div className="relative h-48 w-full">
        <Image
          src={getImageUrl(program.imageUrl, "programs")}
          alt={program.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(program.status)}`}>
            {getStatusText(program.status)}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{program.name}</h2>
        
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Calendar className="h-4 w-4 mr-1" />
          <span>
            {formatDate(program.startDate)} - {formatDate(program.endDate)}
          </span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{program.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-indigo-600">
            Divisi {program.division.name}
          </span>
          
          <Link href={`/programs/${program.id}`} className="flex items-center text-gray-800 font-medium hover:text-gray-900">
            <span className="mr-1">Detail</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};