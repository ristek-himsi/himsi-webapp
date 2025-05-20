"use client";

import React, { useActionState, useEffect, useState } from "react";
import { addSifestAction } from "../libs/action";
import { useRouter } from "next/navigation";
import Image from "next/image";

const initialState = {
  message: "",
};

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB in bytes

const page = () => {
  const [state, formAction] = useActionState(addSifestAction, initialState);
  const [logoPreview, setLogoPreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (state.redirectUrl && state.success) {
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
        setLogoPreview(null);
        e.target.value = null; // Reset file input
        return;
      }

      setFileName(file.name);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoPreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">Tambah SI Fest</h1>

        {state.message && <div className={`p-4 mb-4 rounded-md ${state.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>{state.message}</div>}
        {fileError && <div className="p-4 mb-4 rounded-md bg-red-50 text-red-700">{fileError}</div>}

        <form action={formAction} className="space-y-5">
          <div className="space-y-1">
            <label htmlFor="year" className="block text-sm font-medium text-gray-700">
              Tahun
            </label>
            <input type="number" name="year" id="year" placeholder="2025" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border" required />
          </div>

          <div className="space-y-1">
            <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
              Tema
            </label>
            <input type="text" name="theme" id="theme" placeholder="Masukkan tema SI Fest" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border" required />
          </div>

          <div className="space-y-1">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Deskripsi
            </label>
            <textarea
              name="description"
              id="description"
              placeholder="Masukkan deskripsi SI Fest"
              rows="4"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border"
              required
            ></textarea>
          </div>

          <div className="space-y-1">
            <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
              Logo
            </label>
            <div className="mt-1 flex items-center">
              {/* Preview logo */}
              <div className="h-24 w-24 rounded-md overflow-hidden bg-gray-100 mr-4 border flex items-center justify-center">
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo Preview" className="h-full w-full object-cover" />
                ) : (
                  <svg className="h-12 w-12 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                  </svg>
                )}
              </div>

              <div className="flex flex-col">
                <div className="relative">
                  <input type="file" name="logo" id="logo" onChange={handleFileChange} accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  <label htmlFor="logo" className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium bg-white text-blue-600 hover:bg-gray-50 cursor-pointer inline-block">
                    Upload Logo
                  </label>
                </div>

                {fileName && <p className="mt-2 text-sm text-gray-600 truncate max-w-xs">{fileName}</p>}
                {fileError && <p className="mt-1 text-xs text-red-500">{fileError}</p>}

                <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF hingga 1MB</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-1">
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                Tanggal Mulai
              </label>
              <input type="date" name="startDate" id="startDate" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border" required />
            </div>

            <div className="space-y-1">
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                Tanggal Selesai
              </label>
              <input type="date" name="endDate" id="endDate" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border" required />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full sm:w-auto flex justify-center py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={!!fileError}
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
