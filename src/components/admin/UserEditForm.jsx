"use client";

import React, { useState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Briefcase, Save, Building, Image } from 'lucide-react';
import { updateUser } from '@/lib/admin/action/users/user';
import { useActionState } from 'react';
import { getImageUrl } from '@/lib/supabase';

const initialState = {
  message: '',
  success: false,
  redirectUrl: null
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex cursor-pointer items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <Save className="h-4 w-4 mr-1" />
      {pending ? 'Menyimpan...' : 'Simpan Perubahan'}
    </button>
  );
};

const UserEditForm = ({ user, divisions}) => {
  const [photoPreview, setPhotoPreview] = useState(null);

  const updateUserById = (_,formData) => updateUser(_, formData,user?.id)

  const [state, formAction] = useActionState(updateUserById, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.success && state.redirectUrl) {
      router.push(state.redirectUrl);
    }
  }, [state, router]);

  useEffect(() => {
    console.log("UserEditForm - user:", user);
    if (user?.photo_url) {
      if (user.photo_url.startsWith('http')) {
        setPhotoPreview(user.photo_url);
      } else {
        setPhotoPreview(getImageUrl(user.photo_url, 'users'));
      }
    }
  }, [user]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(user?.photo_url ? getImageUrl(user.photo_url, 'users') : null);
    }
  };

  // Validasi user
  if (!user || !user.id) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-md">
        Error: Data pengguna tidak valid atau tidak ditemukan.
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="space-y-6"
    >
      <div className="space-y-4">
        {state?.message && (
          <div role="alert" className={`alert ${state.message.includes('berhasil') ? 'alert-success' : 'alert-error'} mb-2`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={state.message.includes('berhasil') 
                  ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                  : "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"}
              />
            </svg>
            <span>{state.message}</span>
          </div>
        )}

        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-medium mb-1">
            Nama Lengkap
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={user.name}
              placeholder="Masukkan nama lengkap"
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 border"
              required
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium mb-1">
            Alamat Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={user.email}
              placeholder="Masukkan alamat email"
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 border"
              required
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="photo" className="text-sm font-medium mb-1">
            Foto Profil (Opsional)
          </label>
          <div className="mt-1 flex items-center space-x-5">
            <div className="flex-shrink-0">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Foto profil"
                  className="h-24 w-24 rounded-full object-cover border border-gray-200"
                />
              ) : (
                <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center">
                  <User className="h-12 w-12 text-gray-300" />
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="photo-upload"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
              >
                <Image className="h-4 w-4 mr-2 text-gray-500" />
                {user.photo_url ? 'Ganti Foto' : 'Pilih Foto'}
              </label>
              <input
                id="photo-upload"
                name="photo"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
              <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF hingga 2MB</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="role" className="text-sm font-medium mb-1">
            Peran Pengguna
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Briefcase className="h-5 w-5 text-gray-400" />
            </div>
            <select
              id="role"
              name="role"
              defaultValue={user.role || 'ADMIN'}
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 border"
              required
            >
              <option value="ADMIN">Admin</option>
              <option value="DIVISION_LEADER">Pemimpin Divisi</option>
              <option value="MEMBER">Anggota</option>

            </select>
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="divisionId" className="text-sm font-medium mb-1">
            Divisi (Opsional)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Building className="h-5 w-5 text-gray-400" />
            </div>
            <select
              id="divisionId"
              name="divisionId"
              defaultValue={user.divisionId || ""}
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 border"
            >
              <option value="">-- Pilih Divisi --</option>
              {divisions && divisions.map((division) => (
                <option key={division.id} value={division.id}>
                  {division.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="position" className="text-sm font-medium mb-1">
            Posisi (Opsional)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Briefcase className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="position"
              name="position"
              defaultValue={user.position || ""}
              placeholder="Masukkan posisi"
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 border"
            />
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Ubah Kata Sandi (opsional)</h4>
          
          <div className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm font-medium mb-1">
                Kata Sandi Baru
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Masukkan kata sandi baru"
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 border"
                  minLength={8}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Biarkan kosong jika tidak ingin mengganti kata sandi. Minimal 8 karakter jika diisi.</p>
            </div>

            <div className="flex flex-col">
              <label htmlFor="confirmPassword" className="text-sm font-medium mb-1">
                Konfirmasi Kata Sandi Baru
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Masukkan konfirmasi kata sandi baru"
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 border"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <a
          href="/admin/users"
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Batal
        </a>
        <SubmitButton />
      </div>
    </form>
  );
};

export default UserEditForm;