"use client";

import React, { useState } from "react";
import { addEventGalleryImages } from "@/app/(roles)/admin/events/libs/data";
import { uploadImage } from "@/lib/supabase";

export default function AddEventGalleryForm({ eventId, onSuccess }) {
  const [isUploading, setIsUploading] = useState(false);
  const [images, setImages] = useState([{ file: null, caption: "", preview: null }]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Menambahkan form field baru
  const addImageField = () => {
    setImages([...images, { file: null, caption: "", preview: null }]);
  };

  // Menghapus form field
  const removeImageField = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  // Update nilai form untuk caption
  const handleInputChange = (index, field, value) => {
    const newImages = [...images];
    newImages[index][field] = value;
    setImages(newImages);
  };

  // Handle file input change
  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    
    const newImages = [...images];
    newImages[index] = {
      ...newImages[index],
      file: file,
      preview: previewUrl
    };
    setImages(newImages);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    setError(null);
    setSuccess(false);

    try {
      // Validasi semua gambar memiliki file
      const hasEmptyFields = images.some(img => !img.file);
      if (hasEmptyFields) {
        throw new Error("Semua field gambar harus diisi");
      }

      // Upload semua gambar ke Supabase dan dapatkan URL
      const uploadPromises = images.map(async (image) => {
        const fileName = await uploadImage(image.file, "events");
        return {
          imageUrl: fileName,
          caption: image.caption || ""
        };
      });

      const uploadedImages = await Promise.all(uploadPromises);
      
      // Kirim data ke server
      await addEventGalleryImages(parseInt(eventId), uploadedImages);
      
      // Reset form dan tampilkan pesan sukses
      setImages([{ file: null, caption: "", preview: null }]);
      setSuccess(true);
      
      // Panggil callback onSuccess jika ada
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess();
      }
    } catch (err) {
      console.error("Error saat menambahkan gambar:", err);
      setError(err.message || "Gagal menambahkan gambar ke galeri");
    } finally {
      setIsUploading(false);
    }
  };

  // Bersihkan URL preview saat komponen unmount
  React.useEffect(() => {
    return () => {
      images.forEach(image => {
        if (image.preview) URL.revokeObjectURL(image.preview);
      });
    };
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <h2 className="text-lg font-semibold mb-4">Tambah Gambar ke Galeri</h2>
      
      {error && (
        <div className="bg-red-50 p-4 rounded-md mb-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 p-4 rounded-md mb-4">
          <p className="text-green-600">Gambar berhasil ditambahkan ke galeri!</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {images.map((image, index) => (
          <div key={index} className="mb-6 p-4 border border-gray-200 rounded-md">
            <div className="mb-3">
              <label htmlFor={`imageFile-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                Upload Gambar <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                id={`imageFile-${index}`}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleFileChange(index, e)}
                accept="image/*"
                required
              />
            </div>

            {image.preview && (
              <div className="mb-3">
                <div className="relative h-32 w-full overflow-hidden rounded-md">
                  <img 
                    src={image.preview} 
                    alt="Preview" 
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            )}
            
            <div className="mb-3">
              <label htmlFor={`caption-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                Caption
              </label>
              <input
                type="text"
                id={`caption-${index}`}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={image.caption}
                onChange={(e) => handleInputChange(index, "caption", e.target.value)}
                placeholder="Deskripsi gambar (opsional)"
                maxLength={100}
              />
            </div>
            
            {images.length > 1 && (
              <button
                type="button"
                onClick={() => removeImageField(index)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Hapus gambar ini
              </button>
            )}
          </div>
        ))}
        
        <div className="flex justify-between">
          <button
            type="button"
            onClick={addImageField}
            className="text-blue-500 hover:text-blue-700 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Tambah gambar lain
          </button>
          
          <button
            type="submit"
            disabled={isUploading}
            className={`px-4 py-2 rounded-md text-white ${
              isUploading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            } transition-colors`}
          >
            {isUploading ? "Sedang Mengunggah..." : "Simpan Gambar"}
          </button>
        </div>
      </form>
    </div>
  );
}