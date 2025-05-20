"use client"

import React, { useActionState, useEffect, useState } from "react";
import { updateSifestAction } from "../libs/action";
import { useRouter } from "next/navigation";
import { getImageUrl } from "@/lib/supabase";

const initialState = {
  message : ""
}

const UpdateSifestForm = ({ sifest }) => {
  const [isPending, setIsPending] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(sifest.logoUrl || "");

  const editById = (_, formData) => updateSifestAction(_, formData, sifest.id)

  const [state, formAction] = useActionState(editById, initialState)

  const router = useRouter()

  useEffect(()=> {
    if(state.success && state.redirectUrl){
      router.push(state.redirectUrl)
    }
  },[state, router])



  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create preview URL for the selected file
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };




  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Update SIFest</h1>
        <p className="text-gray-600">ID: {sifest.id}</p>
      </div>
      {state.message && <div>{state.message}</div>}

      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">Year</label>
          <input
            type="number"
            id="year"
            name="year"
            defaultValue={sifest.year}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
          <input
            type="text"
            id="theme"
            name="theme"
            defaultValue={sifest.theme}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              id="logo"
              name="logo"
              accept="image/*"
              onChange={handleFileChange}
              className="flex-1"
            />
            <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
              {previewUrl ? (
                <img
                  src={getImageUrl(sifest.logoUrl, "sifests")}
                  alt="Logo preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>
          </div>
          {/* Hidden input to keep current logo URL if no new file is uploaded */}
          <input 
            type="hidden" 
            name="currentLogoUrl" 
            defaultValue={sifest.logoUrl || ""} 
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            id="description"
            name="description"
            defaultValue={sifest.description}
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              defaultValue={sifest.startDate ? new Date(sifest.startDate).toISOString().split('T')[0] : ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              defaultValue={sifest.endDate ? new Date(sifest.endDate).toISOString().split('T')[0] : ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            type="submit"
            className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            Update
          </button>
        </div>
      </form>

      <div className="mt-6 text-sm text-gray-500">
        <p>Created: {new Date(sifest.createdAt).toLocaleString()}</p>
        <p>Last Updated: {new Date(sifest.updatedAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default UpdateSifestForm;