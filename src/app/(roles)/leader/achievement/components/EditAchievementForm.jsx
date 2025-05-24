"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useActionState } from "react";

// Import your update action
import {  updateAchievementByLeaderAction } from "../libs/action";
import { getImageUrl } from "@/lib/supabase";

const initialState = {
  message: "",
  success: false,
};

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB in bytes

// Helper function to format date for datetime-local input
const formatDateForInput = (date) => {
  if (!date) return "";
  const d = new Date(date);
  // Format to YYYY-MM-DDTHH:MM for datetime-local input
  return d.toISOString().slice(0, 16);
};

const EditAchievementForm = ({ achievement, divisions = [] }) => {
  console.log(achievement);
  const router = useRouter();
  
  // State declarations - SEMUA STATE HARUS DIDEKLARASIKAN DI AWAL
  const [imagePreview, setImagePreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState("");
  
  // Create bound action with achievementId
  const updateById = (_, formData) => updateAchievementByLeaderAction(_, formData, achievement?.id);
  const [state, formAction] = useActionState(updateById, initialState);

  // Handle file selection and preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileError("");

    if (file) {
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        setFileError("Ukuran file tidak boleh melebihi 1MB");
        setFileName("");
        setImagePreview(null);
        e.target.value = null; // Reset file input
        return;
      }

      setFileName(file.name);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (state.success && state.redirectUrl) {
      router.push(state.redirectUrl);
    }
  }, [state, router]);

  // Show loading state if achievement is not provided
  if (!achievement) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-0">
        <div className="w-full max-w-md sm:max-w-2xl bg-white rounded-xl shadow-lg p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gray-200 rounded w-3/4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-0">
      <div className="w-full max-w-md sm:max-w-2xl bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Edit Pencapaian</h1>
        
        {state.message && (
          <div className={`p-3 mb-4 rounded-lg border-l-4 ${
            state.success 
              ? 'bg-green-50 text-green-700 border-green-500' 
              : 'bg-red-50 text-red-700 border-red-500'
          }`}>
            {state.message}
          </div>
        )}
        
        {fileError && (
          <div className="p-3 mb-4 bg-red-50 text-red-700 rounded-lg border-l-4 border-red-500">
            {fileError}
          </div>
        )}

        <form action={formAction} className="space-y-6">
          {/* Hidden input for achievement ID */}
          <input type="hidden" name="achievementId" value={achievement.id} />

          <div className="flex flex-col">
            <label htmlFor="title" className="text-sm font-medium text-gray-700 mb-1">
              Judul Pencapaian
            </label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={achievement.title}
              placeholder="Masukkan judul pencapaian"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="description" className="text-sm font-medium text-gray-700 mb-1">
              Deskripsi
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={achievement.description}
              placeholder="Masukkan deskripsi pencapaian"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-y"
              rows="4"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="divisionId" className="text-sm font-medium text-gray-700 mb-1">
              Divisi
            </label>
            <select
              id="divisionId"
              name="divisionId"
              defaultValue={achievement.division?.id || achievement.divisionId}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            >
              <option value="">-- Pilih Divisi --</option>
              {/* If divisions array is provided, use it */}
              {divisions.length > 0 ? (
                divisions.map((division) => (
                  <option key={division.id} value={division.id}>
                    {division.name}
                  </option>
                ))
              ) : (
                /* If no divisions array, show current division */
                achievement.division && (
                  <option key={achievement.division.id} value={achievement.division.id}>
                    {achievement.division.name}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="date" className="text-sm font-medium text-gray-700 mb-1">
              Tanggal
            </label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              defaultValue={formatDateForInput(achievement.date)}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="imageUrl" className="text-sm font-medium text-gray-700 mb-1">
              Gambar Pencapaian
            </label>
            <div className="mt-1 flex items-center">
              {/* Preview image */}
              <div className="h-24 w-24 rounded-md overflow-hidden bg-gray-100 mr-4 border flex items-center justify-center">
                {imagePreview ? (
                  <img src={imagePreview} alt="Image Preview" className="h-full w-full object-cover" />
                ) : achievement.imageUrl ? (
                  <img 
                    src={getImageUrl(achievement.imageUrl, "achievements")} 
                    alt="Current achievement" 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <svg className="h-12 w-12 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5-7l-3 3.72L9 13l-3 4h12l-4-5z" />
                  </svg>
                )}
              </div>

              <div className="flex flex-col">
                <div className="relative">
                  <input 
                    type="file" 
                    id="imageUrl" 
                    name="imageUrl" 
                    onChange={handleFileChange}
                    accept="image/*" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <label 
                    htmlFor="imageUrl" 
                    className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium bg-white text-blue-600 hover:bg-gray-50 cursor-pointer inline-block"
                  >
                    {imagePreview || achievement.imageUrl ? "Ganti Gambar" : "Upload Gambar"}
                  </label>
                </div>

                {fileName && <p className="mt-2 text-sm text-gray-600 truncate max-w-xs">{fileName}</p>}
                <p className="mt-1 text-xs text-gray-500">
                  PNG, JPG, GIF hingga 1MB. Kosongkan untuk tetap menggunakan gambar saat ini.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              className="w-full sm:w-1/2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={!!fileError}
            >
              Update Pencapaian
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/achievements")}
              className="w-full sm:w-1/2 bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAchievementForm;