"use client"
import React from "react";
import Image from "next/image";
import { getImageUrl } from "@/lib/supabase";
import ProgramModal from "./ProgramModal";

const ProgramCard = ({ program }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getDaysUntilStart = () => {
    const today = new Date();
    const startDate = new Date(program.startDate);
    const diffTime = startDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Hari ini";
    if (diffDays === 1) return "Besok";
    if (diffDays > 0) return `${diffDays} hari lagi`;
    return "Sudah dimulai";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "UPCOMING":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "ONGOING":
        return "bg-green-50 text-green-700 border-green-200";
      case "COMPLETED":
        return "bg-gray-50 text-gray-700 border-gray-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "UPCOMING":
        return "Akan Datang";
      case "ONGOING":
        return "Berlangsung";
      case "COMPLETED":
        return "Selesai";
      default:
        return status;
    }
  };

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
      >
        {/* Status Badge */}
        <div className="mb-4 flex items-center justify-between">
          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border ${getStatusColor(program.status)}`}>
            {getStatusText(program.status)}
          </span>
          <div className="text-sm font-medium text-gray-600">
            {getDaysUntilStart()}
          </div>
        </div>

        {/* Program Image */}
        {program.imageUrl && (
          <div className="mb-4 overflow-hidden rounded-xl">
            <Image 
              src={getImageUrl(program.imageUrl, "programs")} 
              alt={program.name} 
              width={300} 
              height={180} 
              className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105" 
            />
          </div>
        )}

        {/* Program Info */}
        <div className="mb-4">
          <h4 className="mb-2 text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-gray-700 transition-colors">
            {program.name}
          </h4>
          <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
            {program.description}
          </p>
        </div>

        {/* Date Info */}
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-green-50">
              <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <span className="font-medium text-gray-900">Mulai: </span>
              <span>{formatDate(program.startDate)}</span>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-red-50">
              <svg className="h-4 w-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <span className="font-medium text-gray-900">Selesai: </span>
              <span>{formatDate(program.endDate)}</span>
            </div>
          </div>
        </div>

        {/* Hover indicator */}
        <div className="absolute bottom-4 right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-white shadow-lg">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Program Modal */}
      <ProgramModal program={program} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default ProgramCard;