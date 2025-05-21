"use client";

import React, { useEffect, useState } from "react";
import { useActionState } from "react";
import { addEventAction } from "../libs/action";
import { useRouter } from "next/navigation";

const initialState = {
  message: "",
};

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB in bytes

const EventForm = () => {
  const router = useRouter();
  const [state, formAction] = useActionState(addEventAction, initialState);
  const [siFest, setSiFest] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState("");

  // Redirect jika operasi berhasil
  useEffect(() => {
    if (state.success && state.redirectUrl) {
      router.push(state.redirectUrl);
    }
  }, [state, router]);

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
    const fetchingData = async () => {
      try {
        setIsLoading(true);
        const data = await fetch("/api/sifest");
        const res = await data.json();
        setSiFest(res);
      } catch (error) {
        console.error("Error fetching SIFest data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchingData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Tambah Event Baru</h1>

      {/* Pesan error atau sukses */}
      {state.message && <div className={`p-4 mb-6 rounded-md ${state.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{state.message}</div>}
      {fileError && <div className="p-4 mb-6 rounded-md bg-red-100 text-red-700">{fileError}</div>}

      <form action={formAction} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nama Event */}
          <div className="col-span-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nama Event <span className="text-red-500">*</span>
            </label>
            <input type="text" id="name" name="name" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Masukkan nama event" />
          </div>

          {/* Deskripsi */}
          <div className="col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Deskripsi <span className="text-red-500">*</span>
            </label>
            <textarea id="description" name="description" rows="4" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Deskripsi event"></textarea>
          </div>

          {/* Upload Gambar */}
          <div className="col-span-2">
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Gambar Event <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 flex items-center">
              {/* Preview gambar */}
              {imagePreview && (
                <div className="h-24 w-24 rounded-md overflow-hidden bg-gray-100 mr-4 border flex items-center justify-center">
                  <img src={imagePreview} alt="Image Preview" className="h-full w-full object-cover" />
                </div>
              )}

              <div className="flex flex-col">
                <input type="file" id="imageUrl" name="imageUrl" accept="image/*" onChange={handleFileChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required />
                {fileName && <p className="mt-2 text-sm text-gray-600 truncate max-w-xs">{fileName}</p>}
                <p className="text-xs text-gray-500 mt-1">*Ukuran maksimum file: 1MB</p>
              </div>
            </div>
          </div>

          {/* Tanggal Mulai */}
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal Mulai <span className="text-red-500">*</span>
            </label>
            <input type="date" id="startDate" name="startDate" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
          </div>

          {/* Tanggal Selesai */}
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal Selesai <span className="text-red-500">*</span>
            </label>
            <input type="date" id="endDate" name="endDate" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
          </div>

          {/* Lokasi */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Lokasi <span className="text-red-500">*</span>
            </label>
            <input type="text" id="location" name="location" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Lokasi event" />
          </div>

          {/* Tahun Akademik */}
          <div>
            <label htmlFor="academicYear" className="block text-sm font-medium text-gray-700 mb-1">
              Tahun Akademik <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="academicYear"
              name="academicYear"
              min="2000"
              max="2099"
              defaultValue={new Date().getFullYear()}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Event Type */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              Tipe Event <span className="text-red-500">*</span>
            </label>
            <select
              id="type"
              name="type"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => {
                const sifestIdContainer = document.getElementById("sifestIdContainer");
                if (e.target.value === "SIFEST") {
                  sifestIdContainer.classList.remove("hidden");
                } else {
                  sifestIdContainer.classList.add("hidden");
                }
              }}
            >
              <option value="REGULAR">Regular</option>
              <option value="SIFEST">SIFEST</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status Event <span className="text-red-500">*</span>
            </label>
            <select id="status" name="status" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
              <option value="UPCOMING">Upcoming</option>
              <option value="ONGOING">Ongoing</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>

          {/* SIFest ID (optional, only shown if type is SIFEST) */}
          <div id="sifestIdContainer" className="hidden">
            <label htmlFor="sifestId" className="block text-sm font-medium text-gray-700 mb-1">
              SIFest ID <span className="text-red-500">*</span>
            </label>
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
                <span className="text-sm text-gray-500">Memuat data SIFest...</span>
              </div>
            ) : (
              <>
                <select id="sifestId" name="sifestId" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required>
                  <option value="sifestId">-- Pilih SIFest --</option>
                  {siFest && siFest.length > 0 ? (
                    siFest.map((fest) => (
                      <option key={fest.id} value={fest.id}>
                        SIFest {fest.year} - {fest.theme}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      Tidak ada data SIFest tersedia
                    </option>
                  )}
                </select>
                <p className="text-xs text-gray-500 mt-1">*Wajib diisi jika tipe event adalah SIFEST</p>
              </>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-6">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" disabled={!!fileError}>
            Simpan Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
