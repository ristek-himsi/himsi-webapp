"use client"

import React, { useEffect } from 'react';
import { useActionState } from 'react';
import { addProgramByLeaderAction } from '@/app/(roles)/leader/programs/libs/action';
import { useRouter } from 'next/navigation';

const initialState = {
    message : ""
}

const AddProgramLeaderForm = ({divisionId, divisionName}) => {

    const router = useRouter()

    const [state, formAction] = useActionState(addProgramByLeaderAction, initialState)

    useEffect(() => {
            if (state.message && state.redirectUrl){
                router.push(state.redirectUrl)
            }
    },[state])

    return (
        <form action={formAction} className="space-y-6">
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
            <div className="flex items-center">
              <input
                type="file"
                name="photo"
                id="photo"
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
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
          <button type="submit" className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Simpan
          </button>
        </div>
      </form>
    );
};

export default AddProgramLeaderForm;