"use client";

import React, { useState } from "react";
import { Plus, Pencil, Trash2, AlertTriangle, Info } from "lucide-react";
import { useAlumniCrud } from "./libs/useAlumniCrud";
import AlumniForm from "@/components/admin/AlumniForm";

// Modal Component
const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-5 sm:p-6 max-w-sm sm:max-w-3xl w-full shadow-xl rounded-xl">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default function AlumniAdminPage() {
  const { alumni, loading, error, fetchAlumni, deleteAlumni, setError } = useAlumniCrud();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [alumniToDelete, setAlumniToDelete] = useState(null);

  const openModal = (alumnus = null) => {
    setSelectedAlumni(alumnus);
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (alumnus) => {
    setAlumniToDelete(alumnus);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setAlumniToDelete(null);
  };

  const handleDeleteAlumni = async () => {
    if (!alumniToDelete) return;
    const success = await deleteAlumni(alumniToDelete.id);
    if (success) {
      handleCloseDeleteModal();
    }
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
        <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Manajemen Alumni</h1>
          <div className="h-10 w-36 bg-blue-100 rounded-md animate-pulse"></div>
        </div>
        <div className="sm:hidden space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white shadow-md p-4 rounded-lg animate-pulse">
              <div className="space-y-3">
                <div className="h-6 bg-blue-100 rounded-md w-3/4"></div>
                <div className="h-5 bg-blue-100 rounded-md w-1/2"></div>
                <div className="h-5 bg-blue-100 rounded-md w-1/4"></div>
                <div className="flex space-x-3">
                  <div className="h-9 bg-blue-100 rounded-md w-20"></div>
                  <div className="h-9 bg-blue-100 rounded-md w-20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="hidden sm:block bg-white shadow-md rounded-lg overflow-hidden">
          <div role="table" aria-describedby="alumni-table" className="min-w-full divide-y divide-gray-200">
            <div role="rowgroup" className="bg-blue-50">
              <div role="row" className="grid grid-cols-5">
                <div role="columnheader" className="px-3 py-3 text-left text-sm font-semibold text-blue-900">
                  Nama
                </div>
                <div role="columnheader" className="px-3 py-3 text-left text-sm font-semibold text-blue-900">
                  Email
                </div>
                <div role="columnheader" className="px-3 py-3 text-left text-sm font-semibold text-blue-900">
                  Tahun Kelulusan
                </div>
                <div role="columnheader" className="px-3 py-3 text-left text-sm font-semibold text-blue-900">
                  Pekerjaan
                </div>
                <div role="columnheader" className="px-3 py-3 text-left text-sm font-semibold text-blue-900">
                  Aksi
                </div>
              </div>
            </div>
            <div role="rowgroup">
              {[...Array(3)].map((_, index) => (
                <div key={index} role="row" className="grid grid-cols-5">
                  <div role="cell" className="px-3 py-3">
                    <div className="h-5 bg-blue-100 rounded-md w-3/4 animate-pulse"></div>
                  </div>
                  <div role="cell" className="px-3 py-3">
                    <div className="h-5 bg-blue-100 rounded-md w-1/2 animate-pulse"></div>
                  </div>
                  <div role="cell" className="px-3 py-3">
                    <div className="h-5 bg-blue-100 rounded-md w-1/4 animate-pulse"></div>
                  </div>
                  <div role="cell" className="px-3 py-3">
                    <div className="h-5 bg-blue-100 rounded-md w-1/2 animate-pulse"></div>
                  </div>
                  <div role="cell" className="px-3 py-3">
                    <div className="flex space-x-3">
                      <div className="h-5 bg-blue-100 rounded-md w-5 animate-pulse"></div>
                      <div className="h-5 bg-blue-100 rounded-md w-5 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
        <div className="bg-red-50 shadow-md rounded-lg p-5 border border-red-200 text-red-900 flex items-center">
          <AlertTriangle className="w-6 h-6 mr-3" />
          <div>
            <p className="font-bold text-lg">Error</p>
            <p className="text-base">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Manajemen Alumni</h1>
        <button onClick={() => openModal()} className="flex items-center px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Tambah Alumni
        </button>
      </div>

      {alumni.length === 0 ? (
        <div className="bg-yellow-50 shadow-md rounded-lg p-5 border border-yellow-200 text-yellow-900 flex items-center">
          <Info className="w-6 h-6 mr-3" />
          <p className="text-base">Tidak ada alumni yang ditemukan. Silakan tambah alumni baru.</p>
        </div>
      ) : (
        <div className="sm:hidden space-y-4">
          {alumni.map((alumnus) => (
            <div key={alumnus.id} className="bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-base font-semibold text-gray-900">{alumnus.name}</h3>
              <p className="text-base text-gray-800 mt-1 truncate">Email: {alumnus.email}</p>
              <p className="text-base text-gray-800 mt-1">Tahun Kelulusan: {alumnus.graduationYear}</p>
              <p className="text-base text-gray-800 mt-1 truncate">
                Pekerjaan: {alumnus.currentJob} di {alumnus.company}
              </p>
              <div className="mt-3 flex space-x-3">
                <button onClick={() => openModal(alumnus)} className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center">
                  <Pencil className="w-4 h-4 mr-1" /> Edit
                </button>
                <button onClick={() => handleOpenDeleteModal(alumnus)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center">
                  <Trash2 className="w-4 h-4 mr-1" /> Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {alumni.length > 0 && (
        <div className="hidden sm:block bg-white shadow-md rounded-lg overflow-hidden">
          <div role="table" aria-describedby="alumni-table" className="min-w-full divide-y divide-gray-200">
            <div role="rowgroup" className="bg-blue-50">
              <div role="row" className="grid grid-cols-5">
                <div role="columnheader" className="px-3 py-3 text-left text-sm font-semibold text-blue-900">
                  Nama
                </div>
                <div role="columnheader" className="px-3 py-3 text-left text-sm font-semibold text-blue-900">
                  Email
                </div>
                <div role="columnheader" className="px-3 py-3 text-left text-sm font-semibold text-blue-900">
                  Tahun Kelulusan
                </div>
                <div role="columnheader" className="px-3 py-3 text-left text-sm font-semibold text-blue-900">
                  Pekerjaan
                </div>
                <div role="columnheader" className="px-3 py-3 text-left text-sm font-semibold text-blue-900">
                  Aksi
                </div>
              </div>
            </div>
            <div role="rowgroup">
              {alumni.map((alumnus) => (
                <div key={alumnus.id} role="row" className="grid grid-cols-5 odd:bg-white even:bg-blue-25 hover:bg-blue-100 transition-colors">
                  <div role="cell" className="px-3 py-3 text-sm sm:text-base text-gray-900 truncate">
                    {alumnus.name}
                  </div>
                  <div role="cell" className="px-3 py-3 text-sm sm:text-base text-gray-900 truncate">
                    {alumnus.email}
                  </div>
                  <div role="cell" className="px-3 py-3 text-sm sm:text-base text-gray-900">
                    {alumnus.graduationYear}
                  </div>
                  <div role="cell" className="px-3 py-3 text-sm sm:text-base text-gray-900 truncate">
                    {alumnus.currentJob} di {alumnus.company}
                  </div>
                  <div role="cell" className="px-3 py-3 flex space-x-3">
                    <button onClick={() => openModal(alumnus)} className="px-3 py-1.5 bg-blue-900 text-white rounded-lg hover:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center">
                      <Pencil className="w-4 h-4 mr-1" /> Edit
                    </button>
                    <button onClick={() => handleOpenDeleteModal(alumnus)} className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center">
                      <Trash2 className="w-4 h-4 mr-1" /> Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedAlumni ? "Edit Alumni" : "Tambah Alumni"}>
        <AlumniForm alumni={selectedAlumni} onSave={fetchAlumni} onClose={() => setIsModalOpen(false)} />
      </Modal>

      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-5 sm:p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Konfirmasi Hapus</h3>
            <p className="text-base text-gray-600 mb-6 text-center">Apakah Anda yakin ingin menghapus alumni "{alumniToDelete?.name}"? Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex justify-center space-x-3">
              <button onClick={handleCloseDeleteModal} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                Batal
              </button>
              <button onClick={handleDeleteAlumni} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
