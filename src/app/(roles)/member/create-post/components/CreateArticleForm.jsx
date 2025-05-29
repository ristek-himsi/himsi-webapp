"use client";

import React, { useActionState, useEffect, useState } from "react";
import { getImageUrl } from "@/lib/supabase";
import { addArticleByMemberAction } from "../libs/action";
import { useRouter } from "next/navigation";

// Define maximum file size (10MB) - as mentioned in the UI
const MAX_FILE_SIZE = 1 * 1024 * 1024;

const initialState = {
    message : ""
}

const CreateArticleForm = ({ userData }) => {

  const router = useRouter()

  const [state, formAction] = useActionState(addArticleByMemberAction, initialState)

  useEffect(() => {

    if(state.success && state.redirectUrl){
      router.push(state.redirectUrl)
    }

  },[state, router])

 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
    imageUrl: null
  });
  
  // Add states for file handling
  const [fileError, setFileError] = useState("");
  const [fileName, setFileName] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileError("");

    if (file) {
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        setFileError("Ukuran file tidak boleh melebihi 1MB");
        setFileName("");
        setImagePreview(null);
        setFormData(prev => ({
          ...prev,
          imageUrl: null
        }));
        e.target.value = null; // Reset file input
        return;
      }

      setFileName(file.name);
      setFormData(prev => ({
        ...prev,
        imageUrl: file
      }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="flex-shrink-0">
            <img 
              src={getImageUrl(userData?.photo_url, "users")} 
              alt={userData?.name} 
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-gray-200" 
            />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
              Buat Postingan Artikel
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 truncate">
              Posting sebagai: <span className="font-medium">{userData?.name}</span>
              {userData?.position && (
                <span className="text-gray-400 hidden sm:inline"> • {userData.position}</span>
              )}
            </p>
            {userData?.position && (
              <p className="text-xs text-gray-400 sm:hidden">{userData.position}</p>
            )}
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
        {/* Display file error if any */}
        {fileError && (
          <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-md">
            {fileError}
          </div>
        )}

        <form action={formAction} className="space-y-4 sm:space-y-6">

          {state.message && <div>{state.message}</div>}
          {/* Hidden Author ID */}
          <input type="hidden" name="authorId" value={userData?.id} />

          {/* Title Field */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Judul Artikel <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base"
              placeholder="Masukkan judul artikel yang menarik..."
            />
          </div>

          {/* Category Field */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Kategori <span className="text-red-500">*</span>
            </label>
            <select 
              id="category" 
              name="category" 
              required 
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base"
            >
              <option value="">Pilih kategori...</option>
              <option value="ARTICLE">Artikel</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-2">
              Gambar Artikel
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center hover:border-blue-400 transition-colors">
              <input 
                type="file" 
                id="imageUrl" 
                name="imageUrl" 
                accept="image/*" 
                onChange={handleFileChange}
                className="hidden" 
              />
              <label htmlFor="imageUrl" className="cursor-pointer">
                {imagePreview ? (
                  <div className="space-y-2">
                    <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
                    <p className="text-sm text-gray-600">Klik untuk mengganti gambar</p>
                    {fileName && (
                      <p className="text-xs text-gray-500 truncate max-w-xs mx-auto">{fileName}</p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <svg className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <div className="text-xs sm:text-sm text-gray-600">
                      <span className="font-medium text-blue-600 hover:text-blue-500">Klik untuk upload</span>
                      <span className="hidden sm:inline"> atau drag & drop</span>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF hingga 1MB</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Content Field */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Konten Artikel <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              name="content"
              required
              rows={8}
              value={formData.content}
              onChange={handleInputChange}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical text-sm sm:text-base sm:rows-12"
              placeholder="Tulis konten artikel Anda di sini..."
            />
            <p className="mt-2 text-xs sm:text-sm text-gray-500">
              Tip: Gunakan paragraf yang jelas dan bahasa yang mudah dipahami
            </p>
          </div>

          {/* Action Buttons - Mobile First Design */}
          <div className="pt-4 sm:pt-6 border-t border-gray-200 space-y-3 sm:space-y-0">
            {/* Mobile: Stack vertically */}
            <div className="sm:hidden space-y-3">
              <button 
                type="submit" 
                disabled={isSubmitting || !!fileError}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Mempublikasikan..." : "Publikasikan"}
              </button>
            </div>

            {/* Desktop: Horizontal layout */}
            <div className="hidden sm:flex items-center justify-between">
              <div className="flex space-x-3">
                <button 
                  type="submit" 
                  disabled={isSubmitting || !!fileError}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Mempublikasikan..." : "Publikasikan"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Additional Info */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Artikel akan direview terlebih dahulu sebelum dipublikasikan</p>
      </div>
    </>
  );
};

export default CreateArticleForm;