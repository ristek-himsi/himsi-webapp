// Program Card Component

"use client"
import React from "react";
import Image from "next/image";
import { getImageUrl } from "@/lib/supabase";

import ProgramModal from "./ProgramModal";
const ProgramCard = ({ program }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
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
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "ONGOING":
        return "bg-green-100 text-green-800 border-green-200";
      case "COMPLETED":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="group bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 border border-green-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-200/20 to-teal-200/20 rounded-full -translate-y-10 translate-x-10"></div>

        {/* Status Badge */}
        <div className="flex justify-between items-start mb-4">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(program.status)}`}>{program.status}</span>
          <div className="text-right text-sm text-gray-500">
            <div className="font-medium text-green-600">{getDaysUntilStart()}</div>
          </div>
        </div>

        {/* Program Image */}
        {program.imageUrl && (
          <div className="mb-4 rounded-xl overflow-hidden">
            <Image src={getImageUrl(program.imageUrl, "programs")} alt={program.name} width={300} height={150} className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300" />
          </div>
        )}

        {/* Program Info */}
        <h4 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-green-700 transition-colors line-clamp-2">{program.name}</h4>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">{program.description}</p>

        {/* Date Info */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-gray-600">
            <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-medium">Mulai:</span>
            <span className="ml-1">{formatDate(program.startDate)}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <svg className="w-4 h-4 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-medium">Selesai:</span>
            <span className="ml-1">{formatDate(program.endDate)}</span>
          </div>
        </div>

        {/* Click indicator */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

export default ProgramCard