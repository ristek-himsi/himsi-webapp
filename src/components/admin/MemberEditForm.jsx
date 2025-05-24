"use client"

import React, { useEffect, useState } from 'react';
import { useActionState } from 'react';
import { editMemberAction } from '@/app/(roles)/leader/members/libs/action';
import { useRouter } from 'next/navigation';

const initialState = {
    message: "",
    success: false,
}

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB in bytes

const MemberEditForm = ({user, photoPreview}) => {
    const router = useRouter()
    const [error, setError] = useState("");
    const [fileName, setFileName] = useState("");
    const [imagePreview, setImagePreview] = useState(photoPreview);

    const editMemberById = (_, formData) => editMemberAction(_, formData, user?.id)

    const [state, formAction] = useActionState(editMemberById, initialState)

    useEffect(() => {
        if (state.success && state.redirectUrl) {
            // Redirect ke halaman yang ditentukan
            router.push(state.redirectUrl);
            return
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
                setImagePreview(photoPreview); // Reset to original photo
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
        } else {
            // If no file selected, reset to original photo
            setImagePreview(photoPreview);
            setFileName("");
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
        <div className="bg-white rounded-lg shadow-md p-6">
            {/* Display error message */}
            {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}

            {/* Display success/info message from state */}
            {state.message && !error && (
                <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-500 text-blue-700 text-sm rounded">
                    {state.message}
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Photo Section with Upload Option */}
                    <div className="flex-shrink-0 space-y-3">
                        <div className="relative">
                            <img 
                                src={imagePreview} 
                                alt="Foto profil" 
                                className="h-24 w-24 rounded-full object-cover border border-gray-200 shadow" 
                            />
                        </div>
                        
                        {/* Photo Upload */}
                        <div className="flex flex-col items-center">
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
                                    className="py-1.5 px-3 text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer inline-block transition-all"
                                >
                                    Ganti Foto
                                </label>
                            </div>
                            {fileName && <p className="mt-1 text-xs text-gray-600 truncate max-w-24">{fileName}</p>}
                            <p className="mt-1 text-xs text-gray-500 text-center">Max 1MB</p>
                        </div>
                    </div>

                    <div className="flex-grow space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Nama
                            </label>
                            <p className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">{user?.name}</p>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <p className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">{user?.email}</p>
                        </div>

                        <div>
                            <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                                Jabatan
                            </label>
                            <input 
                                type="text" 
                                id="position" 
                                name="position" 
                                defaultValue={user?.position} 
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button 
                        type="submit" 
                        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!!error}
                    >
                        Simpan Perubahan
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MemberEditForm;