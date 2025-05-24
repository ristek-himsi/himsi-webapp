"use client"

import React, { useEffect, useState } from 'react';
import { useActionState } from 'react';
import { addProgramByLeaderAction } from '@/app/(roles)/leader/programs/libs/action';
import { useRouter } from 'next/navigation';

const initialState = {
    message: ""
}

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB in bytes

const AddProgramLeaderForm = ({divisionId, divisionName}) => {
    const router = useRouter()
    const [error, setError] = useState("");
    const [fileName, setFileName] = useState("");
    const [imagePreview, setImagePreview] = useState(null);

    const [state, formAction] = useActionState(addProgramByLeaderAction, initialState)

    useEffect(() => {
        if (state.message && state.redirectUrl){
            router.push(state.redirectUrl)
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
        } else {
            // If no file selected, reset
            setImagePreview(null);
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
        <div>
            {/* Display error message */}
            {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}

            {/* Display success/info message from state */}
            {state.message && !error && (
                <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-500 text-blue-700 text-sm rounded">
                    {state.message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Nama Program
                        </label>
                        <input type="text" name="name" id="name" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Masukkan nama program" />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="divisionId" className="block text-sm font-medium text-gray-700">
                            Divisi
                        </label>
                        <select name="divisionId" id="divisionId" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value={divisionId}>{divisionName}</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Deskripsi
                    </label>
                    <textarea name="description" id="description" rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Masukkan deskripsi program"></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                            Gambar
                        </label>
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <input
                                    type="file"
                                    name="photo"
                                    id="photo"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                            </div>
                            {fileName && <p className="text-xs text-gray-600">File terpilih: {fileName}</p>}
                            <p className="text-xs text-gray-500">Max 1MB</p>
                            
                            {/* Image Preview */}
                            {imagePreview && (
                                <div className="mt-3">
                                    <img 
                                        src={imagePreview} 
                                        alt="Preview gambar" 
                                        className="h-32 w-32 object-cover border border-gray-200 rounded-md shadow-sm" 
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                            Status
                        </label>
                        <select name="status" id="status" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">Pilih Status</option>
                            <option value="UPCOMING">Akan Datang</option>
                            <option value="ONGOING">Sedang Berlangsung</option>
                            <option value="COMPLETED">Selesai</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">
                            Tanggal Mulai
                        </label>
                        <input type="date" name="start_date" id="start_date" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">
                            Tanggal Selesai
                        </label>
                        <input type="date" name="end_date" id="end_date" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                </div>

                <div className="flex justify-end space-x-3">
                    <button type="button" className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Batal
                    </button>
                    <button 
                        type="submit" 
                        className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!!error}
                    >
                        Simpan
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProgramLeaderForm;