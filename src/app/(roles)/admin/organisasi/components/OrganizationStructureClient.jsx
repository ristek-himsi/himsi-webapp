
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function OrganizationStructureClient({ structures }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    if (!confirm("Apakah Anda yakin ingin menghapus struktur organisasi ini?")) {
      return;
    }

    setDeletingId(id);
    
    try {
      const response = await fetch(`/api/organization-structure/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.refresh();
      } else {
        alert("Gagal menghapus struktur organisasi");
      }
    } catch (error) {
      alert("Terjadi kesalahan saat menghapus struktur organisasi");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
              Manajemen Struktur Organisasi
            </h1>
            <p className="text-blue-100 text-sm lg:text-base">
              Kelola dan pantau struktur kepemimpinan organisasi
            </p>
          </div>
          <Link
            href="/admin/organisasi/add"
            className="w-full lg:w-auto inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 hover:scale-105 focus:ring-4 focus:ring-white focus:ring-opacity-50 transition-all duration-200 shadow-md"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Tambah Struktur
          </Link>
        </div>
      </div>

      {/* Empty State */}
      {structures.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Belum ada struktur organisasi</h3>
          <p className="text-gray-500 mb-6">Mulai dengan menambahkan struktur organisasi pertama Anda.</p>
          <Link
            href="/admin/organisasi/add"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Tambah Struktur Pertama
          </Link>
        </div>
      )}

      {/* Mobile: Card Layout */}
      <div className="lg:hidden grid gap-4">
        {structures.map((structure) => (
          <div key={structure.id} className="bg-white rounded-xl shadow-sm border border-blue-50 overflow-hidden hover:shadow-md transition-all duration-200">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 border-b border-blue-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-blue-900">
                  Tahun Akademik {structure.academicYear}
                </h3>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  structure.isActive 
                    ? "bg-green-100 text-green-800 border border-green-200" 
                    : "bg-gray-100 text-gray-600 border border-gray-200"
                }`}>
                  <span className={`w-2 h-2 rounded-full mr-2 ${
                    structure.isActive ? "bg-green-500" : "bg-gray-400"
                  }`}></span>
                  {structure.isActive ? "Aktif" : "Tidak Aktif"}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-blue-600 uppercase tracking-wider">Ketua</label>
                    <p className="text-sm font-medium text-gray-900 mt-1">{structure.leader?.name || "-"}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-blue-600 uppercase tracking-wider">Sekretaris</label>
                    <p className="text-sm font-medium text-gray-900 mt-1">{structure.secretary?.name || "-"}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-blue-600 uppercase tracking-wider">Wakil Ketua</label>
                    <p className="text-sm font-medium text-gray-900 mt-1">{structure.viceLeader?.name || "-"}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-blue-600 uppercase tracking-wider">Bendahara</label>
                    <p className="text-sm font-medium text-gray-900 mt-1">{structure.treasurer?.name || "-"}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                <Link
                  href={`/admin/organisasi/edit/${structure.id}`}
                  className="flex-1 inline-flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </Link>
                <button 
                  onClick={() => handleDelete(structure.id)}
                  disabled={deletingId === structure.id}
                  className="flex-1 inline-flex items-center justify-center px-4 py-2.5 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deletingId === structure.id ? (
                    <>
                      <svg className="animate-spin w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Menghapus...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Hapus
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: Table Layout */}
      <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-blue-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-blue-900 uppercase tracking-wider">
                  Tahun Akademik
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-blue-900 uppercase tracking-wider">
                  Ketua
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-blue-900 uppercase tracking-wider">
                  Wakil Ketua
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-blue-900 uppercase tracking-wider">
                  Sekretaris
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-blue-900 uppercase tracking-wider">
                  Bendahara
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-blue-900 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-blue-900 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {structures.map((structure) => (
                <tr key={structure.id} className="hover:bg-blue-25 transition-colors group">
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">
                    {structure.academicYear}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    {structure.leader?.name || "-"}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    {structure.viceLeader?.name || "-"}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    {structure.secretary?.name || "-"}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    {structure.treasurer?.name || "-"}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      structure.isActive 
                        ? "bg-green-100 text-green-800 border border-green-200" 
                        : "bg-gray-100 text-gray-600 border border-gray-200"
                    }`}>
                      <span className={`w-2 h-2 rounded-full mr-2 ${
                        structure.isActive ? "bg-green-500" : "bg-gray-400"
                      }`}></span>
                      {structure.isActive ? "Aktif" : "Tidak Aktif"}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <Link
                        href={`/admin/organisasi/edit/${structure.id}`}
                        className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      >
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </Link>
                      <button 
                        onClick={() => handleDelete(structure.id)}
                        disabled={deletingId === structure.id}
                        className="inline-flex items-center px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {deletingId === structure.id ? (
                          <>
                            <svg className="animate-spin w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            ...
                          </>
                        ) : (
                          <>
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Hapus
                          </>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}