"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Plus } from "lucide-react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-5 sm:p-6 max-w-sm sm:max-w-2xl w-full shadow-xl rounded-xl">
        {children}
        <button onClick={onClose} className="mt-4 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
          Tutup
        </button>
      </div>
    </div>
  );
};

const PageForm = ({ page, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: page?.title || "",
    slug: page?.slug || "",
    content: page?.content || "",
    isPublished: page?.isPublished ?? true,
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(page?.id ? `/api/pages/${page.id}` : "/api/pages", {
        method: page?.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        onSave();
        onClose();
      } else {
        setError(data.message || "Gagal menyimpan halaman");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat menyimpan halaman: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-blue-50 p-6 rounded-lg">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{page?.id ? "Edit Halaman" : "Tambah Halaman"}</h2>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-900 px-4 py-3 rounded-lg shadow-md">
          <p className="text-base">{error}</p>
        </div>
      )}
      <div>
        <label className="block text-base font-medium text-gray-700">Judul</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-base"
          required
        />
      </div>
      <div>
        <label className="block text-base font-medium text-gray-700">Slug</label>
        <input
          type="text"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-base"
          required
        />
      </div>
      <div>
        <label className="block text-base font-medium text-gray-700">Konten</label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-base"
          rows={6}
          required
        />
      </div>
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.isPublished}
            onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
          <span className="ml-2 text-base text-gray-700">Publikasikan</span>
        </label>
      </div>
      <button type="submit" className="px-5 py-2.5 bg-blue-900 text-white rounded-lg hover:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
        Simpan
      </button>
    </form>
  );
};

export default function AdminPages() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [pageToDelete, setPageToDelete] = useState(null);
  const router = useRouter();

  const fetchPages = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/pages");
      const data = await res.json();

      if (data.success) {
        setPages(data.data);
      } else {
        setError(data.message || "Gagal memuat data halaman");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat memuat data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleOpenDeleteModal = (page) => {
    setPageToDelete(page);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setPageToDelete(null);
  };

  const handleDeletePage = async () => {
    if (!pageToDelete) return;

    try {
      const res = await fetch(`/api/pages/${pageToDelete.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        setPages(pages.filter((page) => page.id !== pageToDelete.id));
        handleCloseDeleteModal();
      } else {
        setError(data.message || "Gagal menghapus halaman");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat menghapus halaman: " + err.message);
    }
  };

  const openModal = (page = null) => {
    setSelectedPage(page);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 bg-gray-50">
        <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Pages</h1>
          <div className="h-10 w-32 bg-blue-100 rounded-lg animate-pulse"></div>
        </div>
        <div className="sm:hidden space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white shadow-md p-4 rounded-lg animate-pulse">
              <div className="space-y-3">
                <div className="h-5 bg-blue-100 rounded w-3/4"></div>
                <div className="h-4 bg-blue-100 rounded w-1/2"></div>
                <div className="h-4 bg-blue-100 rounded w-1/4"></div>
                <div className="flex space-x-3">
                  <div className="h-8 bg-blue-100 rounded w-16"></div>
                  <div className="h-8 bg-blue-100 rounded w-16"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="hidden sm:block bg-white shadow-md rounded-lg overflow-hidden">
          <div role="table" aria-describedby="pages-table" className="min-w-full divide-y divide-gray-200">
            <div role="rowgroup" className="bg-blue-50">
              <div role="row" className="flex">
                <div role="columnheader" className="px-4 py-3 text-left text-sm font-semibold text-blue-900 flex-1">
                  Judul
                </div>
                <div role="columnheader" className="px-4 py-3 text-left text-sm font-semibold text-blue-900 flex-1">
                  Slug
                </div>
                <div role="columnheader" className="px-4 py-3 text-left text-sm font-semibold text-blue-900 flex-1">
                  Status
                </div>
                <div role="columnheader" className="px-4 py-3 text-left text-sm font-semibold text-blue-900 flex-1">
                  Aksi
                </div>
              </div>
            </div>
            <div role="rowgroup">
              {[...Array(3)].map((_, index) => (
                <div key={index} role="row" className="flex">
                  <div role="cell" className="px-4 py-3 flex-1">
                    <div className="h-4 bg-blue-100 rounded w-3/4 animate-pulse"></div>
                  </div>
                  <div role="cell" className="px-4 py-3 flex-1">
                    <div className="h-4 bg-blue-100 rounded w-1/2 animate-pulse"></div>
                  </div>
                  <div role="cell" className="px-4 py-3 flex-1">
                    <div className="h-4 bg-blue-100 rounded w-1/4 animate-pulse"></div>
                  </div>
                  <div role="cell" className="px-4 py-3 flex-1">
                    <div className="flex space-x-4">
                      <div className="h-4 bg-blue-100 rounded w-4 animate-pulse"></div>
                      <div className="h-4 bg-blue-100 rounded w-4 animate-pulse"></div>
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
      <div className="p-4 sm:p-6 lg:p-8 bg-gray-50">
        <div className="bg-red-50 shadow-md rounded-lg p-5 border border-red-200 text-red-900">
          <p className="font-bold text-lg">Error</p>
          <p className="text-base">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Pages</h1>
        <button onClick={() => openModal()} className="flex items-center px-5 py-2.5 bg-blue-900 text-white rounded-lg hover:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Tambah Halaman
        </button>
      </div>

      {pages.length === 0 ? (
        <div className="bg-yellow-50 shadow-md rounded-lg p-5 border border-yellow-200 text-yellow-900">
          <p className="text-base">Tidak ada halaman yang ditemukan. Silakan tambah halaman baru.</p>
        </div>
      ) : (
        <div className="sm:hidden space-y-4">
          {pages.map((page) => (
            <div key={page.id} className="bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-base font-semibold text-gray-900">{page.title}</h3>
              <p className="text-sm text-gray-600 mt-1">Slug: {page.slug}</p>
              <p className="text-sm text-gray-600 mt-1">Status: {page.isPublished ? "Published" : "Draft"}</p>
              <div className="mt-3 flex space-x-3">
                <button onClick={() => openModal(page)} className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center">
                  <Pencil className="w-4 h-4 mr-1" /> Edit
                </button>
                <button onClick={() => handleOpenDeleteModal(page)} className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center">
                  <Trash2 className="w-4 h-4 mr-1" /> Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {pages.length > 0 && (
        <div className="hidden sm:block bg-white shadow-md rounded-lg overflow-hidden">
          <div role="table" aria-describedby="pages-table" className="min-w-full divide-y divide-gray-200">
            <div role="rowgroup" className="bg-blue-50">
              <div role="row" className="flex">
                <div role="columnheader" className="px-4 py-3 text-left text-sm font-semibold text-blue-900 flex-1">
                  Judul
                </div>
                <div role="columnheader" className="px-4 py-3 text-left text-sm font-semibold text-blue-900 flex-1">
                  Slug
                </div>
                <div role="columnheader" className="px-4 py-3 text-left text-sm font-semibold text-blue-900 flex-1">
                  Status
                </div>
                <div role="columnheader" className="px-4 py-3 text-left text-sm font-semibold text-blue-900 flex-1">
                  Aksi
                </div>
              </div>
            </div>
            <div role="rowgroup">
              {pages.map((page) => (
                <div key={page.id} role="row" className="flex odd:bg-white even:bg-blue-25 hover:bg-blue-100 transition-colors">
                  <div role="cell" className="px-4 py-3 text-base text-gray-900 flex-1">
                    {page.title}
                  </div>
                  <div role="cell" className="px-4 py-3 text-base text-gray-900 flex-1">
                    {page.slug}
                  </div>
                  <div role="cell" className="px-4 py-3 text-base text-gray-900 flex-1">
                    {page.isPublished ? "Published" : "Draft"}
                  </div>
                  <div role="cell" className="px-4 py-3 flex space-x-3 flex-1">
                    <button onClick={() => openModal(page)} className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center">
                      <Pencil className="w-4 h-4 mr-1" /> Edit
                    </button>
                    <button onClick={() => handleOpenDeleteModal(page)} className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center">
                      <Trash2 className="w-4 h-4 mr-1" /> Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <PageForm page={selectedPage} onSave={fetchPages} onClose={() => setIsModalOpen(false)} />
      </Modal>

      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-5 sm:p-6 max-w-sm sm:max-w-md w-full shadow-xl">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Konfirmasi Hapus</h3>
            <p className="text-base text-gray-600 mb-6">Apakah Anda yakin ingin menghapus halaman "{pageToDelete?.title}"? Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex justify-end space-x-3">
              <button onClick={handleCloseDeleteModal} className="py-2.5 px-5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                Batal
              </button>
              <button onClick={handleDeletePage} className="py-2.5 px-5 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
