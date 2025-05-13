"use client"

import React, { useEffect } from 'react';
import { useActionState } from 'react';
import { editMemberAction } from '@/app/(roles)/leader/members/libs/action';
import { useRouter } from 'next/navigation';

const initialState = {
    message : ""
}

const MemberEditForm = ({user, photoPreview}) => {

    const router = useRouter()

    const editMemberById = (_, formData) => editMemberAction(_, formData, user?.id)

    const [state, formAction] = useActionState(editMemberById, initialState)

    useEffect(() => {

         if (state.success && state.redirectUrl) {
        // Redirect ke halaman yang ditentukan
        router.push(state.redirectUrl);
        return};

    },[state])

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            
        <form action={formAction} className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-shrink-0">
              <img src={photoPreview} alt="Foto profil" className="h-24 w-24 rounded-full object-cover border border-gray-200 shadow" />
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
                <input type="text" id="position" name="position" defaultValue={user?.position} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    );
};

export default MemberEditForm;