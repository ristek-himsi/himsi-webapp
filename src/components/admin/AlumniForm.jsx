"use client";

import React, { useState } from "react";
import { AlertTriangle } from "lucide-react";

const AlumniForm = ({ alumni, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: alumni?.name || "",
    email: alumni?.email || "",
    bio: alumni?.bio || "",
    positionInHimsi: alumni?.positionInHimsi ? JSON.stringify(alumni.positionInHimsi, null, 2) : "{}",
    profileImage: alumni?.profileImage || "",
    graduationYear: alumni?.graduationYear?.toString() || "",
    entryYear: alumni?.entryYear?.toString() || "",
    currentJob: alumni?.currentJob || "",
    company: alumni?.company || "",
    linkedinUrl: alumni?.linkedinUrl || "",
  });
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = "Nama wajib diisi";
    if (!formData.email) errors.email = "Email wajib diisi";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Email tidak valid";
    if (!formData.bio) errors.bio = "Bio wajib diisi";
    if (!formData.profileImage) errors.profileImage = "URL gambar profil wajib diisi";
    if (!formData.graduationYear) errors.graduationYear = "Tahun kelulusan wajib diisi";
    else if (isNaN(formData.graduationYear)) errors.graduationYear = "Tahun kelulusan harus angka";
    if (!formData.entryYear) errors.entryYear = "Tahun masuk wajib diisi";
    else if (isNaN(formData.entryYear)) errors.entryYear = "Tahun masuk harus angka";
    if (!formData.currentJob) errors.currentJob = "Pekerjaan wajib diisi";
    if (!formData.company) errors.company = "Perusahaan wajib diisi";
    if (!formData.linkedinUrl) errors.linkedinUrl = "URL LinkedIn wajib diisi";
    try {
      JSON.parse(formData.positionInHimsi);
    } catch {
      errors.positionInHimsi = "Posisi di HIMSI harus JSON valid";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!validateForm()) return;

    try {
      const positionInHimsi = JSON.parse(formData.positionInHimsi);
      const payload = {
        ...formData,
        positionInHimsi,
        graduationYear: parseInt(formData.graduationYear, 10),
        entryYear: parseInt(formData.entryYear, 10),
      };

      const res = await fetch(alumni?.id ? `/api/alumni/${alumni.id}` : "/api/alumni", {
        method: alumni?.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        onSave();
        onClose();
      } else {
        setError(data.message || "Gagal menyimpan data alumni");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat menyimpan data: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-blue-50 p-6 rounded-lg">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900">{alumni?.id ? "Edit Alumni" : "Tambah Alumni"}</h2>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-900 px-4 py-3 rounded-lg shadow-md flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2" />
          <p className="text-base">{error}</p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-base font-medium text-gray-700">Nama</label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`mt-1 block w-full rounded-lg border ${fieldErrors.name ? "border-red-500" : "border-gray-300"} shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-base`}
            placeholder="Masukkan nama lengkap"
            aria-describedby={fieldErrors.name ? "name-error" : undefined}
            required
          />
          {fieldErrors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-600">{fieldErrors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block text-base font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`mt-1 block w-full rounded-lg border ${fieldErrors.email ? "border-red-500" : "border-gray-300"} shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-base`}
            placeholder="Masukkan email"
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
            required
          />
          {fieldErrors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
          )}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="bio" className="block text-base font-medium text-gray-700">Bio</label>
          <textarea
            id="bio"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className={`mt-1 block w-full rounded-lg border ${fieldErrors.bio ? "border-red-500" : "border-gray-300"} shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-base`}
            rows={4}
            placeholder="Masukkan bio singkat"
            aria-describedby={fieldErrors.bio ? "bio-error" : undefined}
            required
          />
          {fieldErrors.bio && (
            <p id="bio-error" className="mt-1 text-sm text-red-600">{fieldErrors.bio}</p>
          )}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="positionInHimsi" className="block text-base font-medium text-gray-700">Posisi di HIMSI (JSON)</label>
          <textarea
            id="positionInHimsi"
            value={formData.positionInHimsi}
            onChange={(e) => setFormData({ ...formData, positionInHimsi: e.target.value })}
            className={`mt-1 block w-full rounded-lg border ${fieldErrors.positionInHimsi ? "border-red-500" : "border-gray-300"} shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-base font-mono`}
            rows={4}
            placeholder='Contoh: {"role": "Ketua", "year": 2020}'
            aria-describedby={fieldErrors.positionInHimsi ? "positionInHimsi-error" : undefined}
          />
          {fieldErrors.positionInHimsi && (
            <p id="positionInHimsi-error" className="mt-1 text-sm text-red-600">{fieldErrors.positionInHimsi}</p>
          )}
        </div>
        <div>
          <label htmlFor="profileImage" className="block text-base font-medium text-gray-700">URL Gambar Profil</label>
          <input
            id="profileImage"
            type="text"
            value={formData.profileImage}
            onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
            className={`mt-1 block w-full rounded-lg border ${fieldErrors.profileImage ? "border-red-500" : "border-gray-300"} shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-base`}
            placeholder="Masukkan URL gambar"
            aria-describedby={fieldErrors.profileImage ? "profileImage-error" : undefined}
            required
          />
          {fieldErrors.profileImage && (
            <p id="profileImage-error" className="mt-1 text-sm text-red-600">{fieldErrors.profileImage}</p>
          )}
        </div>
        <div>
          <label htmlFor="graduationYear" className="block text-base font-medium text-gray-700">Tahun Kelulusan</label>
          <input
            id="graduationYear"
            type="number"
            value={formData.graduationYear}
            onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
            className={`mt-1 block w-full rounded-lg border ${fieldErrors.graduationYear ? "border-red-500" : "border-gray-300"} shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-base`}
            placeholder="Masukkan tahun"
            aria-describedby={fieldErrors.graduationYear ? "graduationYear-error" : undefined}
            required
          />
          {fieldErrors.graduationYear && (
            <p id="graduationYear-error" className="mt-1 text-sm text-red-600">{fieldErrors.graduationYear}</p>
          )}
        </div>
        <div>
          <label htmlFor="entryYear" className="block text-base font-medium text-gray-700">Tahun Masuk</label>
          <input
            id="entryYear"
            type="number"
            value={formData.entryYear}
            onChange={(e) => setFormData({ ...formData, entryYear: e.target.value })}
            className={`mt-1 block w-full rounded-lg border ${fieldErrors.entryYear ? "border-red-500" : "border-gray-300"} shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-base`}
            placeholder="Masukkan tahun"
            aria-describedby={fieldErrors.entryYear ? "entryYear-error" : undefined}
            required
          />
          {fieldErrors.entryYear && (
            <p id="entryYear-error" className="mt-1 text-sm text-red-600">{fieldErrors.entryYear}</p>
          )}
        </div>
        <div>
          <label htmlFor="currentJob" className="block text-base font-medium text-gray-700">Pekerjaan Saat Ini</label>
          <input
            id="currentJob"
            type="text"
            value={formData.currentJob}
            onChange={(e) => setFormData({ ...formData, currentJob: e.target.value })}
            className={`mt-1 block w-full rounded-lg border ${fieldErrors.currentJob ? "border-red-500" : "border-gray-300"} shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-base`}
            placeholder="Masukkan pekerjaan"
            aria-describedby={fieldErrors.currentJob ? "currentJob-error" : undefined}
            required
          />
          {fieldErrors.currentJob && (
            <p id="currentJob-error" className="mt-1 text-sm text-red-600">{fieldErrors.currentJob}</p>
          )}
        </div>
        <div>
          <label htmlFor="company" className="block text-base font-medium text-gray-700">Perusahaan</label>
          <input
            id="company"
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className={`mt-1 block w-full rounded-lg border ${fieldErrors.company ? "border-red-500" : "border-gray-300"} shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-base`}
            placeholder="Masukkan nama perusahaan"
            aria-describedby={fieldErrors.company ? "company-error" : undefined}
            required
          />
          {fieldErrors.company && (
            <p id="company-error" className="mt-1 text-sm text-red-600">{fieldErrors.company}</p>
          )}
        </div>
        <div>
          <label htmlFor="linkedinUrl" className="block text-base font-medium text-gray-700">URL LinkedIn</label>
          <input
            id="linkedinUrl"
            type="text"
            value={formData.linkedinUrl}
            onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
            className={`mt-1 block w-full rounded-lg border ${fieldErrors.linkedinUrl ? "border-red-500" : "border-gray-300"} shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-base`}
            placeholder="Masukkan URL LinkedIn"
            aria-describedby={fieldErrors.linkedinUrl ? "linkedinUrl-error" : undefined}
            required
          />
          {fieldErrors.linkedinUrl && (
            <p id="linkedinUrl-error" className="mt-1 text-sm text-red-600">{fieldErrors.linkedinUrl}</p>
          )}
        </div>
      </div>
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Batal
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Simpan
        </button>
      </div>
    </form>
  );
};

export default AlumniForm;