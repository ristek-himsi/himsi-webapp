"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { deleteProgramAction } from "@/app/(roles)/admin/programs/libs/action";
import { getImageUrl } from "@/lib/supabase";

const isValidImageUrl = true;

const ProgramDetail = ({ program }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "UPCOMING":
        return "bg-blue-100 text-blue-800";
      case "ONGOING":
        return "bg-green-100 text-green-800";
      case "COMPLETED":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setError("");
    try {
      const result = await deleteProgramAction(program.id);
      if (result.success) {
        router.push("/admin/programs");
      } else {
        setError(result.message || "Gagal menghapus program");
        setIsDeleting(false);
      }
    } catch (err) {
      setError("Terjadi kesalahan saat menghapus program");
      setIsDeleting(false);
    }
  };

  return (
    <div className="w-full bg-white shadow-lg rounded-xl overflow-hidden">
      {/* Program Header */}
      <div className="relative h-48 sm:h-64 md:h-72 w-full">
        {isValidImageUrl ? (
          <Image src={getImageUrl(program?.imageUrl, "programs")} alt={program.name} fill className="object-cover" priority />
        ) : (
          <Image src="/placeholder-image.jpg" alt="Placeholder" fill className="object-cover" priority />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4 sm:p-6 md:p-8 text-white">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">{program.name}</h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
            <span className={`px-3 py-1 text-xs sm:text-sm text-center font-medium rounded-full ${getStatusBadgeClass(program.status)}`}>{program.status}</span>
            <span className="text-xs sm:text-sm font-medium opacity-90">
              {formatDate(program.startDate)} - {formatDate(program.endDate)}
            </span>
          </div>
        </div>
      </div>

      {/* Program Content */}
      <div className="p-4 sm:p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-8 md:mb-10">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 md:mb-4">Deskripsi Program</h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">{program.description}</p>
            </div>

            <div className="mb-8 md:mb-10">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 md:mb-4">Periode Program</h2>
              <div className="flex flex-col space-y-2 sm:space-y-3">
                <div className="flex items-center">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500 mr-2 sm:mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-600 text-sm sm:text-base">
                    Tanggal Mulai: <strong>{formatDate(program.startDate)}</strong>
                  </span>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500 mr-2 sm:mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-600 text-sm sm:text-base">
                    Tanggal Selesai: <strong>{formatDate(program.endDate)}</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0 mt-6 md:mt-0">
            <div className="bg-gray-50 p-4 sm:p-5 rounded-lg mb-4 sm:mb-6 shadow-sm">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Informasi Divisi</h3>
              <div className="flex items-center mb-3 sm:mb-4">
                {program.division && isValidImageUrl ? (
                  <div className="relative h-10 w-10 sm:h-12 sm:w-12 mr-2 sm:mr-3 rounded-full overflow-hidden">
                    <Image src={getImageUrl(program.division.logoUrl, "divisi")} alt={program.division.name} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="h-10 w-10 sm:h-12 sm:w-12 mr-2 sm:mr-3 rounded-full bg-gray-200 flex items-center justify-center">
                    <svg className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                )}
                <div>
                  {program.division && (
                    <>
                      <h4 className="font-semibold text-gray-800 text-sm sm:text-base">{program.division.name}</h4>
                      <Link href={`/admin/divisions/${program.divisionId}`} className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-800 transition-colors">
                        Lihat Divisi
                      </Link>
                    </>
                  )}
                </div>
              </div>
              {program.division && <p className="text-xs sm:text-sm text-gray-600 line-clamp-3">{program.division.description}</p>}
            </div>

            <div className="bg-gray-50 p-4 sm:p-5 rounded-lg shadow-sm">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Informasi Program</h3>
              <div className="text-xs sm:text-sm space-y-2 text-gray-600">
                <div>
                  <span className="font-medium">ID Program:</span> {program.id}
                </div>
                <div>
                  <span className="font-medium">Dibuat pada:</span> {formatDate(program.createdAt)}
                </div>
                <div>
                  <span className="font-medium">Terakhir diperbarui:</span> {formatDate(program.updatedAt)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
       <div className="flex flex-row justify-between sm:justify-end space-x-2 sm:space-x-4 mt-8 md:mt-10 border-t pt-4 sm:pt-6">
  <Link 
    href={`/admin/programs/edit/${program.id}`} 
    className="flex-1 sm:flex-initial px-4 sm:px-5 py-2 sm:py-2.5 bg-indigo-600 text-white text-center rounded-lg hover:bg-indigo-700 transition-all font-medium text-sm sm:text-base"
  >
    Edit Program
  </Link>
  <button
    onClick={() => setIsDeleteModalOpen(true)}
    className="flex-1 sm:flex-initial px-4 sm:px-5 cursor-pointer py-2 sm:py-2.5 bg-red-600 text-white text-center rounded-lg hover:bg-red-700 transition-all font-medium text-sm sm:text-base"
  >
    Hapus
  </button>
</div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-4 sm:p-6 transform transition-all">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Konfirmasi Hapus</h3>
            <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
              Apakah Anda yakin ingin menghapus program <strong>"{program.name}"</strong>? Tindakan ini tidak dapat dibatalkan.
            </p>

            {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md border border-red-200 text-sm">{error}</div>}

            <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 sm:px-5 py-2 sm:py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium text-sm sm:text-base"
                disabled={isDeleting}
              >
                Batal
              </button>
              <button onClick={handleDelete} className="px-4 sm:px-5 cursor-pointer py-2 sm:py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-medium text-sm sm:text-base disabled:bg-red-400" disabled={isDeleting}>
                {isDeleting ? "Menghapus..." : "Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramDetail;
