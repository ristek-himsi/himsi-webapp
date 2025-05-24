"use client"

import { addMemberAction } from '@/app/(roles)/leader/members/libs/action';
import React, { useEffect, useState } from 'react';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';

const initialState = {
    message: "",
    success: false,
}

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB in bytes

const AddMemberForm = ({divisionId, divisionName}) => {
  const router = useRouter()
  const [state, formAction] = useActionState(addMemberAction, initialState)
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if(state.success && state.redirectUrl){
      return router.push(state.redirectUrl)
    }

    // Update local error state when receiving error message from server action
    if (state.message) {
      setError(state.message);
    }
  },[state, router])

  // Handle file selection and preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setError("");

    if (file) {
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        setError("Ukuran file tidak boleh melebihi 1MB");
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

  // Custom form submission handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Basic client-side validation for file size
    const photoFile = formData.get("photo");
    if (photoFile && photoFile.size > 0) {
      if (photoFile.size > MAX_FILE_SIZE) {
        setError("Ukuran file tidak boleh melebihi 1MB");
        return;
      }
    }

    // Clear any previous errors
    setError("");

    // Submit the form using the action
    formAction(formData);
  };

  return (
    <div className="p-6">
      {/* Alert message if exists */}
      {state.length != null && state.message && (
        <div className="mb-4 p-3 bg-indigo-50 border-l-4 border-indigo-500 text-indigo-700 text-sm rounded">
          {state.message}
        </div>
      )}

      {/* Display error message */}
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
            Nama
          </label>
          <div className="relative">
            <input 
              type="text" 
              name="name" 
              id="name" 
              className="block w-full px-4 py-2.5 text-slate-800 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" 
              placeholder="Masukkan nama lengkap"
              required 
            />
          </div>
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
            Email
          </label>
          <div className="relative">
            <input 
              type="email" 
              name="email" 
              id="email" 
              className="block w-full px-4 py-2.5 text-slate-800 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" 
              placeholder="email@example.com"
              required 
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
            Password
          </label>
          <div className="relative">
            <input 
              type="password" 
              name="password" 
              id="password" 
              className="block w-full px-4 py-2.5 text-slate-800 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" 
              placeholder="••••••••"
              required 
            />
          </div>
        </div>

        {/* Photo Upload Field with preview and file size validation */}
        <div>
          <label htmlFor="photo" className="block text-sm font-medium text-slate-700 mb-1">
            Foto Profil
          </label>
          
          <div className="mt-1 flex items-center">
            {/* Preview image */}
            {imagePreview && (
              <div className="h-24 w-24 rounded-md overflow-hidden bg-gray-100 mr-4 border flex items-center justify-center">
                <img src={imagePreview} alt="Photo Preview" className="h-full w-full object-cover" />
              </div>
            )}

            <div className="flex flex-col">
              <div className="relative">
                <input
                  type="file"
                  name="photo"
                  id="photo"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <label 
                  htmlFor="photo" 
                  className="py-2.5 px-4 rounded-lg border-0 text-sm font-medium bg-indigo-50 text-indigo-700 hover:bg-indigo-100 cursor-pointer inline-block transition-all"
                >
                  Upload Foto
                </label>
              </div>

              {fileName && <p className="mt-2 text-sm text-gray-600 truncate max-w-xs">{fileName}</p>}
              <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF hingga 1MB</p>
            </div>
          </div>
        </div>

        {/* Role Field - with custom select styling */}
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-1">
            Role
          </label>
          <div className="relative">
            <select 
              name="role" 
              id="role"
              className="appearance-none block w-full px-4 py-2.5 text-slate-800 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all pr-10"
              required
            >
              <option value="MEMBER">Anggota</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Division Field - with custom select styling */}
        <div>
          <label htmlFor="divisionId" className="block text-sm font-medium text-slate-700 mb-1">
            Divisi
          </label>
          <div className="relative">
            <select 
              name="divisionId" 
              id="divisionId" 
              className="appearance-none block w-full px-4 py-2.5 text-slate-800 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all pr-10"
              required
            >
              <option value={divisionId}>{divisionName}</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Position Field */}
        <div>
          <label htmlFor="position" className="block text-sm font-medium text-slate-700 mb-1">
            Posisi
          </label>
          <div className="relative">
            <input 
              type="text" 
              name="position" 
              id="position" 
              className="block w-full px-4 py-2.5 text-slate-800 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" 
              placeholder="Masukkan posisi"
              required 
            />
          </div>
        </div>

        {/* Submit Button with animation */}
        <div className="pt-2">
          <button 
            type="submit" 
            className="w-full py-2.5 px-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-sm font-medium rounded-lg hover:shadow-lg hover:from-indigo-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
            disabled={!!error}
          >
            Tambah Anggota
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMemberForm;