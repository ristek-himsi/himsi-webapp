"use client"

import { editProgramByLeaderAction } from '@/app/(roles)/leader/programs/libs/action';
import React, { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const initialState = {
    message : ""
}

const EditProgramForm = ({program, programImagePreview}) => {

    const router = useRouter()

    const editProgramById = (_, formData) => editProgramByLeaderAction(_, formData, program?.id)

    const [state, formAction] = useActionState(editProgramById, initialState)

    useEffect(() => {
        if (state?.success && state?.redirectUrl){
            router.push(state?.redirectUrl)
        }
    },[state, router])

    return (
              <form action={formAction} className="space-y-4 max-w-2xl">
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
          <div className="flex items-center space-x-4">
            {program.imageUrl && (
              <div className="w-24 h-24 border rounded-md overflow-hidden">
                <img src={programImagePreview} alt={program.name} className="w-full h-full object-cover" />
              </div>
            )}
            <input type="file" name="photo" id="photo" className="w-full p-2 border rounded-md" />
          </div>
          <p className="text-xs text-gray-500 mt-1">Current image: {program.imageUrl}</p>
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
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Update Program
          </button>
        </div>
      </form>
    );
};

export default EditProgramForm;