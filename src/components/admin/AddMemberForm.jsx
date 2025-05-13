"use client"

import { addMemberAction } from '@/app/(roles)/leader/members/libs/action';
import React, { useEffect } from 'react';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';

const initialState = {
    message: ""
}

const AddMemberForm = ({divisionId, divisionName}) => {
  const router = useRouter()
  const [state, formAction] = useActionState(addMemberAction, initialState)

  useEffect(() => {
    if(state.message && state.redirectUrl){
      return router.push(state.redirectUrl)
    }
  },[state, router])

  return (
    <div className="p-6">
      {/* Alert message if exists */}
      {state.length != null && state.message && (
        <div className="mb-4 p-3 bg-indigo-50 border-l-4 border-indigo-500 text-indigo-700 text-sm rounded">
          {state.message}
        </div>
      )}

      <form action={formAction} className="space-y-5">
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

        {/* Photo Upload Field with modern styling */}
        <div>
          <label htmlFor="photo" className="block text-sm font-medium text-slate-700 mb-1">
            Foto Profil
          </label>
          <div className="mt-1">
            <input
              type="file"
              name="photo"
              id="photo"
              accept="image/*"
              className="block w-full text-sm text-slate-500 
                file:mr-4 file:py-2.5 file:px-4 
                file:rounded-lg file:border-0 
                file:text-sm file:font-medium 
                file:bg-indigo-50 file:text-indigo-700 
                hover:file:bg-indigo-100
                focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
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
          >
            Tambah Anggota
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMemberForm;