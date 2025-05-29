"use client"
import React from "react";
import Image from "next/image";
import { getImageUrl } from "@/lib/supabase";

const ProgramModal = ({ program, isOpen, onClose }) => {
  if (!isOpen) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
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
        return "bg-blue-50 text-blue-700 border border-blue-200";
      case "ONGOING":
        return "bg-green-50 text-green-700 border border-green-200";
      case "COMPLETED":
        return "bg-gray-50 text-gray-700 border border-gray-200";
      default:
        return "bg-gray-50 text-gray-700 border border-gray-200";
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
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:text-gray-900 hover:shadow-xl"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Program Image */}
          {program.imageUrl && (
            <div className="relative h-48 w-full overflow-hidden md:h-64">
              <Image 
                src={getImageUrl(program.imageUrl, "programs")} 
                alt={program.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              
              {/* Status Badge on Image */}
              <div className="absolute bottom-4 left-4">
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(program.status)}`}>
                  {getStatusText(program.status)}
                </span>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-6 md:p-8">
            
            {/* Header */}
            <div className="mb-6">
              <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-xl font-bold text-gray-900 md:text-2xl">
                  {program.name}
                </h2>
                <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {getDaysUntilStart()}
                </div>
              </div>
              
              {program.description && (
                <p className="text-gray-600 leading-relaxed">
                  {program.description}
                </p>
              )}
            </div>

            {/* Details Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              
              {/* Start Date */}
              <div className="rounded-xl bg-gray-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                    <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Tanggal Mulai</p>
                    <p className="text-sm font-semibold text-gray-900">{formatDate(program.startDate)}</p>
                    {program.startTime && (
                      <p className="text-xs text-gray-600">{formatTime(program.startDate)}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* End Date */}
              <div className="rounded-xl bg-gray-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                    <svg className="h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Tanggal Selesai</p>
                    <p className="text-sm font-semibold text-gray-900">{formatDate(program.endDate)}</p>
                    {program.endTime && (
                      <p className="text-xs text-gray-600">{formatTime(program.endDate)}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Location */}
              {program.location && (
                <div className="rounded-xl bg-gray-50 p-4 sm:col-span-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                      <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Lokasi</p>
                      <p className="text-sm font-semibold text-gray-900">{program.location}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Budget */}
              {program.budget && (
                <div className="rounded-xl bg-gray-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100">
                      <svg className="h-5 w-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Anggaran</p>
                      <p className="text-sm font-semibold text-gray-900">
                        Rp {program.budget.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Participants */}
              {program.maxParticipants && (
                <div className="rounded-xl bg-gray-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                      <svg className="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Peserta</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {program.currentParticipants || 0} / {program.maxParticipants} orang
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Additional Info */}
            {program.notes && (
              <div className="mt-6 rounded-xl bg-blue-50 p-4">
                <h4 className="mb-2 text-sm font-semibold text-blue-900">Catatan Tambahan</h4>
                <p className="text-sm text-blue-800 leading-relaxed">{program.notes}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={onClose}
                className="flex-1 rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 sm:flex-none"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramModal;