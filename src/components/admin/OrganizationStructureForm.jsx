"use client";

import React, { useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import Link from 'next/link';
import { addOrganizationStructure, updateOrganizationStructure } from '@/app/(roles)/admin/organisasi/libs/action';

const initialState = {
  message: '',
  success: false,
  redirectUrl: null,
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed ${pending ? 'animate-pulse' : ''}`}
    >
      {pending ? 'Menyimpan...' : 'Simpan'}
    </button>
  );
};

const OrganizationStructureForm = ({ users, structure , user}) => {

    const updateOraganizationById = (_,formData) => updateOrganizationStructure(_, formData,user?.id)

  const [state, formAction] = useActionState(
    structure ? updateOraganizationById: addOrganizationStructure,
    initialState
  );
  const router = useRouter();

  useEffect(() => {
    if (state.success && state.redirectUrl) {
      router.push(state.redirectUrl);
    }
  }, [state, router]);

  // Generate academic years (e.g., 2020 to current year + 5)
  const currentYear = new Date().getFullYear();
  const academicYears = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {structure ? 'Edit Struktur Organisasi' : 'Tambah Struktur Organisasi'}
      </h2>
      <form action={structure ? (formData) => formAction(formData, structure.id) : formAction} className="space-y-6">
        {state?.message && (
          <div className={`flex items-center p-4 rounded-md ${state.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
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

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Tahun Akademik</label>
          <select
            name="academicYear"
            defaultValue={structure?.academicYear?.toString() || currentYear.toString()}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Pilih Tahun</option>
            {academicYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Ketua</label>
          <select
            name="leaderId"
            defaultValue={structure?.leaderId || ''}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Pilih Pengguna</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Wakil Ketua</label>
          <select
            name="viceLeaderId"
            defaultValue={structure?.viceLeaderId || ''}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Pilih Pengguna</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Sekretaris</label>
          <select
            name="secretaryId"
            defaultValue={structure?.secretaryId || ''}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Pilih Pengguna</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Bendahara</label>
          <select
            name="treasurerId"
            defaultValue={structure?.treasurerId || ''}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Pilih Pengguna</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            defaultChecked={structure?.isActive || false}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
            Aktif
          </label>
        </div>

        <div className="flex justify-end space-x-3">
          <Link
            href="/admin/organization-structure"
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
          >
            Batal
          </Link>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
};

export default OrganizationStructureForm;