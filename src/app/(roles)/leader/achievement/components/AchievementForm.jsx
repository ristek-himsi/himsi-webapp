"use client";

import React, { useEffect, useState } from "react";
import { useActionState } from "react";
import { addAchievementByLeaderAction } from "../libs/action";
import { useRouter } from "next/navigation";

const initialState = {
    message: ""
}

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB in bytes

const AchievementForm = ({ divisionId, divisionName }) => {

    const router = useRouter()
    const [state, formAction] = useActionState(addAchievementByLeaderAction, initialState)
    const [imagePreview, setImagePreview] = useState(null);
    const [fileName, setFileName] = useState("");
    const [fileError, setFileError] = useState("");

    useEffect(() => {
        if (state.success && state.redirectUrl) {
            router.push(state.redirectUrl)
        }
    }, [state, router])

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

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="bg-blue-600 px-6 py-4">
                        <h1 className="text-2xl font-bold text-white">Tambah Data Achievement</h1>
                        <p className="text-blue-100 mt-1">Divisi: {divisionName || "Loading..."}</p>
                    </div>

                    <form action={formAction} className="p-6 space-y-6">
                        {/* Hidden Division ID */}
                        <input type="hidden" name="divisionId" value={divisionId} />

                        {state.message && (
                            <div className="p-3 mb-4 bg-red-50 text-red-700 rounded-lg border-l-4 border-red-500">
                                {state.message}
                            </div>
                        )}

                        {fileError && (
                            <div className="p-3 mb-4 bg-red-50 text-red-700 rounded-lg border-l-4 border-red-500">
                                {fileError}
                            </div>
                        )}

                        {/* Title Field */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                Judul Achievement <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                required
                                maxLength={255}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Masukkan judul achievement"
                            />
                        </div>

                        {/* Description Field */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                Deskripsi <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                required
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Masukkan deskripsi achievement"
                            />
                        </div>

                        {/* Date Field */}
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                                Tanggal Achievement <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="datetime-local"
                                id="date"
                                name="date"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Image Upload Field with Preview */}
                        <div>
                            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-2">
                                Gambar Achievement <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-1 flex items-center">
                                {/* Preview image */}
                                <div className="h-24 w-24 rounded-md overflow-hidden bg-gray-100 mr-4 border flex items-center justify-center">
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Image Preview" className="h-full w-full object-cover" />
                                    ) : (
                                        <svg className="h-12 w-12 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5-7l-3 3.72L9 13l-3 4h12l-4-5z" />
                                        </svg>
                                    )}
                                </div>

                                <div className="flex flex-col">
                                    <div className="relative">
                                        <input
                                            type="file"
                                            id="imageUrl"
                                            name="imageUrl"
                                            onChange={handleFileChange}
                                            accept="image/*"
                                            required
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        />
                                        <label
                                            htmlFor="imageUrl"
                                            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium bg-white text-blue-600 hover:bg-gray-50 cursor-pointer inline-block"
                                        >
                                            Upload Gambar
                                        </label>
                                    </div>

                                    {fileName && <p className="mt-2 text-sm text-gray-600 truncate max-w-xs">{fileName}</p>}
                                    <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF hingga 1MB</p>
                                </div>
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="pt-6 border-t border-gray-200">
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                disabled={!!fileError}
                            >
                                Simpan Achievement
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AchievementForm;