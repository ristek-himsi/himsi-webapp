"use client"

import { editProgramByLeaderAction } from '@/app/(roles)/leader/programs/libs/action';
import React, { useActionState, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const initialState = {
    message: "",
    success: false,
}

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB in bytes

const EditProgramForm = ({program, programImagePreview}) => {
    const router = useRouter()
    const [error, setError] = useState("");
    const [fileName, setFileName] = useState("");
    const [imagePreview, setImagePreview] = useState(programImagePreview);

    const editProgramById = (_, formData) => editProgramByLeaderAction(_, formData, program?.id)

    const [state, formAction] = useActionState(editProgramById, initialState)

    useEffect(() => {
        if (state?.success && state?.redirectUrl){
            router.push(state?.redirectUrl)
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
                setImagePreview(programImagePreview); // Reset to original photo
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
            setImagePreview(programImagePreview);
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

            <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
                <div className="form-group">
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Program Name
                    </label>
                    <input type="text" name="name" id="name" defaultValue={program.name} className="w-full p-2 border rounded-md" />
                </div>

                <div className="form-group">
                    <label htmlFor="description" className="block text-sm font-medium mb-1">
                        Description
                    </label>
                    <textarea name="description" id="description" defaultValue={program.description} rows="4" className="w-full p-2 border rounded-md" />
                </div>

                <div className="form-group">
                    <label htmlFor="photo" className="block text-sm font-medium mb-1">
                        Photo
                    </label>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-4">
                            {program.imageUrl && (
                                <div className="w-24 h-24 border rounded-md overflow-hidden">
                                    <img src={imagePreview} alt={program.name} className="w-full h-full object-cover" />
                                </div>
                            )}
                            <div className="flex-1">
                                <input 
                                    type="file" 
                                    name="photo" 
                                    id="photo" 
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="w-full p-2 border rounded-md text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
                                />
                            </div>
                        </div>
                        
                        {fileName && <p className="text-xs text-gray-600">File baru terpilih: {fileName}</p>}
                        <p className="text-xs text-gray-500">Max 1MB</p>
                        <p className="text-xs text-gray-500">Current image: {program.imageUrl}</p>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="status" className="block text-sm font-medium mb-1">
                        Status
                    </label>
                    <select name="status" id="status" defaultValue={program.status} className="w-full p-2 border rounded-md">
                        <option value="UPCOMING">Upcoming</option>
                        <option value="ONGOING">Ongoing</option>
                        <option value="COMPLETED">Completed</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="divisionId" className="block text-sm font-medium mb-1">
                        Division
                    </label>
                    <select name="divisionId" id="divisionId" defaultValue={program.divisionId} className="w-full p-2 border rounded-md" disabled>
                        <option value={program.divisionId}>{program.division.name}</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Division cannot be changed</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-group">
                        <label htmlFor="startDate" className="block text-sm font-medium mb-1">
                            Start Date
                        </label>
                        <input type="date" name="startDate" id="startDate" defaultValue={program.startDate.toISOString().split("T")[0]} className="w-full p-2 border rounded-md" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="endDate" className="block text-sm font-medium mb-1">
                            End Date
                        </label>
                        <input type="date" name="endDate" id="endDate" defaultValue={program.endDate.toISOString().split("T")[0]} className="w-full p-2 border rounded-md" />
                    </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                    <button type="button" className="px-4 py-2 border rounded-md hover:bg-gray-100">
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!!error}
                    >
                        Update Program
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProgramForm;