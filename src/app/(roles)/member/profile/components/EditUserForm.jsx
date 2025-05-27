"use client";

import React, { useActionState, useEffect, useState } from "react";
import { updateProfileMemberAction } from "../libs/action";
import { useRouter } from "next/navigation";
import { getImageUrl } from "@/lib/supabase";

const initialState = {
  message: ""
}

// Define maximum file size (1MB) - consistent with the other forms
const MAX_FILE_SIZE = 1 * 1024 * 1024;

const EditUserForm = ({ user }) => {
  const router = useRouter();

  // Add states for file handling
  const [fileError, setFileError] = useState("");
  const [fileName, setFileName] = useState("");
  const [photoPreview, setPhotoPreview] = useState(null);

  // Uncomment when server action is ready
  const updateById = (_, formData) => updateProfileMemberAction(_, formData, user?.id)
  const [state, formAction] = useActionState(updateById, initialState)

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
        setPhotoPreview(null);
        e.target.value = null; // Reset file input
        return;
      }

      setFileName(file.name);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoPreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <div>
      {/* Uncomment when server action is ready */}
      {state.message && <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-md">{state.message}</div>}
      {fileError && <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-md">{fileError}</div>}

      <form 
      action={formAction}
        className="space-y-6"
      >
        {/* Hidden field for user ID */}
        <input type="hidden" name="id" value={user.id} />

        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Nama *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={user.name || ""}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Masukkan nama"
            required
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={user.email || ""}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Masukkan email"
            required
          />
        </div>

        {/* Photo Upload Field */}
        <div>
          <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-2">
            Foto Profile
          </label>

          <div className="flex items-center space-x-4">
            {/* Current or new photo preview */}
            <div className="w-20 h-20 relative border rounded-full overflow-hidden bg-gray-100">
              {photoPreview ? (
                <img src={photoPreview} alt="Photo Preview" className="h-full w-full object-cover" />
              ) : user.photo_url ? (
                <img 
                  src={getImageUrl(user.photo_url, "users")} 
                  alt="Current Photo" 
                  className="h-full w-full object-cover" 
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <div className="relative">
                <input 
                  type="file" 
                  id="photo" 
                  name="photo" 
                  onChange={handleFileChange}
                  accept="image/*" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <label 
                  htmlFor="photo" 
                  className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium bg-white text-blue-600 hover:bg-gray-50 cursor-pointer inline-block"
                >
                  Upload Foto Baru
                </label>
              </div>

              {fileName && <p className="mt-2 text-sm text-gray-600 truncate max-w-xs">{fileName}</p>}

              <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF hingga 1MB</p>
              <p className="text-xs text-gray-500">Biarkan kosong jika tidak ingin mengubah foto</p>
            </div>
          </div>
        </div>

        {/* Role Field (Read Only) */}
        <div className="hidden" >
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
            Role
          </label>
          <div className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-600">
            {user.role}
          </div>
          <p className="text-sm text-gray-500 mt-1">Role tidak dapat diubah</p>
          {/* Hidden input to ensure role is sent with form */}
          <input type="hidden" name="role" value={user.role} />
        </div>

        {/* Position Field (Read Only) */}
        <div>
          <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
            Position
          </label>
          <div className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-600">
            {user.position || "-"}
          </div>
          {/* Hidden input to ensure position is sent with form */}
          <input type="hidden" name="position" value={user.position || ""} />
        </div>

        {/* Password Section */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Ubah Password (Opsional)</h3>
          <div className="space-y-4">
            {/* Old Password */}
            <div>
              <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Password Lama
              </label>
              <input
                type="password"
                id="oldPassword"
                name="oldPassword"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan password lama"
              />
              <p className="text-sm text-gray-500 mt-1">Diperlukan jika ingin mengubah password</p>
            </div>

            {/* New Password */}
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Password Baru
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan password baru"
                minLength="6"
              />
              <p className="text-sm text-gray-500 mt-1">Minimal 6 karakter</p>
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
      </form>
    </div>
  );
};

export default EditUserForm;