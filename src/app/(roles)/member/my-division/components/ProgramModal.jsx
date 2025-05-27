import React from 'react';
import Image from 'next/image';
import { getImageUrl } from '@/lib/supabase';

const ProgramModal = ({ program, isOpen, onClose }) => {
  if (!isOpen || !program) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("id-ID", {
      hour: '2-digit',
      minute: '2-digit'
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

  const getDuration = () => {
    const startDate = new Date(program.startDate);
    const endDate = new Date(program.endDate);
    const diffTime = endDate - startDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "1 hari";
    return `${diffDays} hari`;
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 'UPCOMING':
        return {
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          text: 'Akan Datang'
        };
      case 'ONGOING':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.5a2.5 2.5 0 002.5-2.5S12 5 10 5s-3 2.5-3 2.5 1 2.5 2.5 2.5H11m0 0v1.5a2.5 2.5 0 002.5 2.5s2.5-1 2.5-3-2.5-3-2.5-3H13V10z" />
            </svg>
          ),
          text: 'Sedang Berlangsung'
        };
      case 'COMPLETED':
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          text: 'Selesai'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: null,
          text: status
        };
    }
  };

  const statusInfo = getStatusInfo(program.status);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Modal Header */}
        <div className="sticky top-0 bg-gradient-to-r from-green-500 to-teal-500 p-6 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div className="flex-1 pr-4">
              <h2 className="text-2xl font-bold text-white mb-2">{program.name}</h2>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 text-sm font-semibold rounded-full border bg-white/20 text-white border-white/30 flex items-center gap-2`}>
                  {statusInfo.icon}
                  {statusInfo.text}
                </span>
                <span className="text-white/90 font-medium">
                  {getDaysUntilStart()}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Program Image */}
          {program.imageUrl && (
            <div className="rounded-xl overflow-hidden shadow-lg">
              <Image 
                src={getImageUrl(program.imageUrl, "programs")} 
                alt={program.name}
                width={600}
                height={300}
                className="w-full h-64 object-cover"
              />
            </div>
          )}

          {/* Program Description */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Deskripsi Program
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {program.description}
            </p>
          </div>

          {/* Program Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date Information */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Jadwal Program
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <div className="font-semibold text-gray-800">Tanggal Mulai</div>
                    <div className="text-gray-600">{formatDate(program.startDate)}</div>
                    <div className="text-sm text-gray-500">{formatTime(program.startDate)}</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <div className="font-semibold text-gray-800">Tanggal Selesai</div>
                    <div className="text-gray-600">{formatDate(program.endDate)}</div>
                    <div className="text-sm text-gray-500">{formatTime(program.endDate)}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Program Statistics */}
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H9z" />
                </svg>
                Informasi Program
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                  <span className="font-medium text-gray-700">Durasi</span>
                  <span className="font-bold text-purple-600">{getDuration()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                  <span className="font-medium text-gray-700">Status</span>
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${statusInfo.color} flex items-center gap-1`}>
                    {statusInfo.icon}
                    {statusInfo.text}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                  <span className="font-medium text-gray-700">Dimulai</span>
                  <span className="font-bold text-purple-600">{getDaysUntilStart()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Timeline Program
            </h3>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 to-red-500"></div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 relative z-10">
                    1
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="font-semibold text-gray-800">Program Dimulai</div>
                    <div className="text-gray-600">{formatDate(program.startDate)}</div>
                    <div className="text-sm text-gray-500">{formatTime(program.startDate)}</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 relative z-10">
                    2
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="font-semibold text-gray-800">Program Selesai</div>
                    <div className="text-gray-600">{formatDate(program.endDate)}</div>
                    <div className="text-sm text-gray-500">{formatTime(program.endDate)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Informasi Tambahan
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/70 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Dibuat pada</div>
                <div className="font-semibold text-gray-800">
                  {program.createdAt ? formatDate(program.createdAt) : 'Tidak tersedia'}
                </div>
              </div>
              <div className="bg-white/70 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Terakhir diupdate</div>
                <div className="font-semibold text-gray-800">
                  {program.updatedAt ? formatDate(program.updatedAt) : 'Tidak tersedia'}
                </div>
              </div>
            </div>
          </div>

          {/* Location/Venue (if available) */}
          {program.location && (
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-100">
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Lokasi
              </h3>
              <p className="text-gray-700">{program.location}</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 rounded-b-2xl border-t">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Tutup
            </button>
            <button className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Simpan Program
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramModal;