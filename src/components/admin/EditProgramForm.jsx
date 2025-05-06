"use client";

import React, { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useActionState } from 'react';
import { updateProgramAction } from '@/app/admin/programs/libs/action';

const initialState = {
  message: "",
  success: false,
  error: false,
  redirectUrl: null
};

// Submit button component with loading state
const SubmitButton = () => {
  const { pending } = useFormStatus();
  
  return (
    <button 
      type="submit" 
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors flex items-center justify-center disabled:bg-blue-400 disabled:cursor-not-allowed"
      disabled={pending}
    >
      {pending ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Menyimpan...
        </>
      ) : (
        'Perbarui Program'
      )}
    </button>
  );
};

const EditProgramForm = ({ program, divisions }) => {
  const updateProgramById = (_, formData) => updateProgramAction(_, formData, program.id);

  const [state, formAction] = useActionState(updateProgramById, initialState);
  const [imagePreview, setImagePreview] = useState(program.imageUrl);

  // Redirect user if needed after successful form submission
  useEffect(() => {
    if (state.success && state.redirectUrl) {
      window.location.href = state.redirectUrl;
    }
  }, [state]);

  // Format dates for form input (YYYY-MM-DD)
  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  // Handler untuk menampilkan preview gambar saat dipilih
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <form action={formAction}>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Nama Program
            </label>
            <input 
              type="text" 
              name="name" 
              id="name" 
              defaultValue={program.name}
              className="w-full p-2 border border-gray-300 rounded" 
              placeholder="Masukkan nama program" 
              required 
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Deskripsi
            </label>
            <textarea 
              name="description" 
              id="description" 
              rows={3} 
              defaultValue={program.description}
              className="w-full p-2 border border-gray-300 rounded" 
              placeholder="Masukkan deskripsi program"
              required
            ></textarea>
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium mb-1">
              Gambar Program
            </label>
            <div className="flex flex-col space-y-2">
              {imagePreview && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500 mb-1">Preview:</p>
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="h-40 w-auto object-cover rounded border border-gray-300"
                  />
                </div>
              )}
              <input 
                type="file" 
                name="image" 
                id="image" 
                accept="image/*"
                className="w-full p-2 border border-gray-300 rounded" 
                onChange={handleImageChange}
              />
              <input 
                type="hidden" 
                name="currentImageUrl" 
                value={program.imageUrl} 
              />
              <p className="text-xs text-gray-500">
                Biarkan kosong jika tidak ingin mengubah gambar
              </p>
            </div>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium mb-1">
              Status
            </label>
            <select 
              name="status" 
              id="status" 
              defaultValue={program.status}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Pilih Status</option>
              <option value="UPCOMING">UPCOMING</option>
              <option value="ONGOING">ONGOING</option>
              <option value="COMPLETED">COMPLETED</option>
            </select>
          </div>

          <div>
            <label htmlFor="divisionId" className="block text-sm font-medium mb-1">
              Divisi
            </label>
            <select 
              name="divisionId" 
              id="divisionId" 
              defaultValue={program.divisionId}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Pilih Divisi</option>
              {divisions.map((division) => (
                <option key={division.id} value={division.id}>
                  {division.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium mb-1">
                Tanggal Mulai
              </label>
              <input 
                type="date" 
                name="startDate" 
                id="startDate" 
                defaultValue={formatDateForInput(program.startDate)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="endDate" className="block text-sm font-medium mb-1">
                Tanggal Selesai
              </label>
              <input 
                type="date" 
                name="endDate" 
                id="endDate" 
                defaultValue={formatDateForInput(program.endDate)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>
        </div>

        {/* Men– Menampilkan pesan hasil dari action */}
        {state?.message && (
          <div className={`flex items-center p-4 mt-4 rounded-md ${state.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {state.success ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              )}
            </svg>
            <span>{state.message}</span>
          </div>
        )}

        <div className="pt-4 flex justify-end">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
};

export default EditProgramForm;