"use client";

import React, { useActionState, useEffect, useState } from "react";
import Image from "next/image";
import { getImageUrl } from "@/lib/supabase";
import { updateDivisionByLeaderAction } from "../libs/action";
import { useRouter } from "next/navigation";

const initialState = {
    message: ""
}

// Define maximum file size (1MB) - consistent with the other forms
const MAX_FILE_SIZE = 1 * 1024 * 1024;

const EditDivisionForm = ({ division }) => {

    const updateById = (_, formData) => updateDivisionByLeaderAction(_, formData, division?.id)

    const [state, formAction] = useActionState(updateById, initialState)

    const router = useRouter()

    // Add states for file handling
    const [fileError, setFileError] = useState("");
    const [fileName, setFileName] = useState("");
    const [logoPreview, setLogoPreview] = useState(null);

    useEffect(() => {

        if(state.success && state.redirectUrl){
            router.push(state.redirectUrl)
        }

    },[state, router])

    // Handle file selection and validation
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
    <form action={formAction} className="bg-white rounded-lg shadow-lg p-6">
      <div className="grid gap-6">

        {state.message && <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-md">{state.message}</div>}
        {fileError && <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-md">{fileError}</div>}
        
        {/* Nama Divisi (Read Only) */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Nama Divisi
          </label>
          <div className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-600">
            {division.name}
          </div>
          <p className="text-sm text-gray-500 mt-1">Nama divisi tidak dapat diubah</p>
        </div>

        {/* Deskripsi */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Deskripsi *
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={division.description}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Masukkan deskripsi divisi"
            required
          />
        </div>

        {/* Leader ID (Read Only) */}
        <div>
          <label htmlFor="leaderId" className="block text-sm font-medium text-gray-700 mb-2">
            ID Leader
          </label>
          <div className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-600">
            {division.leaderId}
          </div>
          <p className="text-sm text-gray-500 mt-1">ID Leader tidak dapat diubah</p>
          {/* Hidden input to ensure leaderId is sent with form */}
          <input type="hidden" name="leaderId" value={division.leaderId} />
        </div>

        {/* Logo Upload with preview and file size validation */}
        <div>
          <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-2">
            Logo Divisi
          </label>

          <div className="flex items-center space-x-4">
            {/* Current or new logo preview */}
            <div className="w-20 h-20 relative border rounded-md overflow-hidden bg-gray-100">
              {logoPreview ? (
                <img src={logoPreview} alt="Logo Preview" className="h-full w-full object-contain" />
              ) : division.logoUrl ? (
                <Image 
                  src={getImageUrl(division.logoUrl, "divisi")} 
                  alt={`Logo ${division.name}`} 
                  fill
                  className="object-contain" 
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <div className="relative">
                <input 
                  type="file" 
                  id="logo" 
                  name="logo" 
                  onChange={handleFileChange}
                  accept="image/*" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <label 
                  htmlFor="logo" 
                  className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium bg-white text-blue-600 hover:bg-gray-50 cursor-pointer inline-block"
                >
                  Upload Logo Baru
                </label>
              </div>

              {fileName && <p className="mt-2 text-sm text-gray-600 truncate max-w-xs">{fileName}</p>}
              <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF hingga 1MB</p>
              <p className="text-xs text-gray-500">Biarkan kosong jika tidak ingin mengubah logo</p>
            </div>
          </div>
        </div>

        {/* Visi */}
        <div>
          <label htmlFor="vision" className="block text-sm font-medium text-gray-700 mb-2">
            Visi
          </label>
          <textarea
            id="vision"
            name="vision"
            rows={3}
            defaultValue={division.vision === "-" ? "" : division.vision}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Masukkan visi divisi"
          />
        </div>

        {/* Misi */}
        <div>
          <label htmlFor="mission" className="block text-sm font-medium text-gray-700 mb-2">
            Misi
          </label>
          <textarea
            id="mission"
            name="mission"
            rows={3}
            defaultValue={division.mission === "-" ? "" : division.mission}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Masukkan misi divisi"
          />
        </div>

        {/* Hidden field untuk ID */}
        <input type="hidden" name="id" value={division.id} />

        {/* Informasi Tambahan (Read Only) */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Informasi Sistem</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">ID Divisi</label>
              <p className="text-gray-800">{division.id}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Tanggal Dibuat</label>
              <p className="text-gray-800">
                {new Date(division.createdAt).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Terakhir Diperbarui</label>
              <p className="text-gray-800">
                {new Date(division.updatedAt).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4 border-t border-gray-200">
          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
            disabled={!!fileError}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Simpan Perubahan
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditDivisionForm;