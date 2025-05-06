'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { formatDate } from '@/lib/utils';
import { deleteProgramAction } from '@/app/admin/programs/libs/action';

const isValidImageUrl = (url) => {
  return typeof url === 'string' && url.trim() !== '' && (url.startsWith('http') || url.startsWith('/'));
};

const ProgramDetail = ({ program }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'UPCOMING': return 'bg-blue-100 text-blue-800';
      case 'ONGOING': return 'bg-green-100 text-green-800';
      case 'COMPLETED': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setError('');
    try {
      const result = await deleteProgramAction(program.id);
      if (result.success) {
        router.push('/admin/programs');
      } else {
        setError(result.message || 'Gagal menghapus program');
        setIsDeleting(false);
      }
    } catch (err) {
      setError('Terjadi kesalahan saat menghapus program');
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Program Header */}
      <div className="relative h-64 w-full">
        {isValidImageUrl(program.imageUrl) ? (
          <Image
            src={program.imageUrl}
            alt={program.name}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <Image
            src="/placeholder-image.jpg"
            alt="Placeholder"
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">{program.name}</h1>
          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(program.status)}`}>
              {program.status}
            </span>
            <span className="text-sm opacity-80">
              {formatDate(program.startDate)} - {formatDate(program.endDate)}
            </span>
          </div>
        </div>
      </div>

      {/* Program Content */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3 text-gray-800">Deskripsi Program</h2>
              <p className="text-gray-600 whitespace-pre-line">{program.description}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3 text-gray-800">Periode Program</h2>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-600">Tanggal Mulai: <strong>{formatDate(program.startDate)}</strong></span>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-600">Tanggal Selesai: <strong>{formatDate(program.endDate)}</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-medium mb-3 text-gray-800">Informasi Divisi</h3>
              <div className="flex items-center mb-4">
                {program.division && isValidImageUrl(program.division.logoUrl) ? (
                  <div className="relative h-12 w-12 mr-3 rounded-full overflow-hidden">
                    <Image
                      src={program.division.logoUrl}
                      alt={program.division.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-12 w-12 mr-3 rounded-full bg-gray-200 flex items-center justify-center">
                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                )}
                <div>
                  {program.division && (
                    <>
                      <h4 className="font-medium text-gray-800">{program.division.name}</h4>
                      <Link href={`/admin/divisions/${program.divisionId}`} className="text-sm text-blue-600 hover:text-blue-800">
                        Lihat Divisi
                      </Link>
                    </>
                  )}
                </div>
              </div>
              {program.division && (
                <p className="text-sm text-gray-600 line-clamp-3">{program.division.description}</p>
              )}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-3 text-gray-800">Informasi Program</h3>
              <div className="text-sm space-y-2 text-gray-600">
                <div><span className="font-medium">ID Program:</span> {program.id}</div>
                <div><span className="font-medium">Dibuat pada:</span> {formatDate(program.createdAt)}</div>
                <div><span className="font-medium">Terakhir diperbarui:</span> {formatDate(program.updatedAt)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 mt-8 border-t pt-6">
          <Link href="/admin/programs" className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
            Kembali
          </Link>
          <Link href={`/admin/programs/edit/${program.id}`} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Edit Program
          </Link>
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Hapus
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Konfirmasi Hapus</h3>
            <p className="text-gray-600 mb-6">
              Apakah Anda yakin ingin menghapus program <strong>"{program.name}"</strong>? Tindakan ini tidak dapat dibatalkan.
            </p>

            {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}

            <div className="flex justify-end space-x-3">
              <button onClick={() => setIsDeleteModalOpen(false)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50" disabled={isDeleting}>
                Batal
              </button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-red-400" disabled={isDeleting}>
                {isDeleting ? 'Menghapus...' : 'Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramDetail;