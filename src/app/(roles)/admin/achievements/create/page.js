"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { addAchievementAction } from "../libs/action";

const initialState = {
  message: "",
  success: false,
};

const CreateAchievementPage = () => {
  const [divisions, setDivisions] = useState(null);
  const router = useRouter();
  const [state, formAction] = useActionState(addAchievementAction, initialState);

  useEffect(() => {
    if (state.success && state.redirectUrl) {
      router.push(state.redirectUrl);
    }
  }, [state, router]);

  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const res = await fetch("/api/divisions");
        const json = await res.json();
        if (json.success) {
          setDivisions(json.data);
        } else {
          console.error("Divisions fetch error:", json.message);
        }
      } catch (error) {
        console.error("Unexpected fetch error:", error);
      }
    };
    fetchDivisions();
  }, []);

  if (!divisions) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-0">
        <div className="w-full max-w-md sm:max-w-2xl bg-white rounded-xl shadow-lg p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gray-200 rounded w-3/4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-0">
      <div className="w-full max-w-md sm:max-w-2xl bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Tambah Pencapaian Baru</h1>
        {state.message && <div className="p-3 mb-4 bg-red-50 text-red-700 rounded-lg border-l-4 border-red-500">{state.message}</div>}

        <form action={formAction} className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="title" className="text-sm font-medium text-gray-700 mb-1">
              Judul Pencapaian
            </label>
            <input type="text" id="title" name="title" placeholder="Masukkan judul pencapaian" className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" required />
          </div>

          <div className="flex flex-col">
            <label htmlFor="description" className="text-sm font-medium text-gray-700 mb-1">
              Deskripsi
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Masukkan deskripsi pencapaian"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-y"
              rows="4"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="divisionId" className="text-sm font-medium text-gray-700 mb-1">
              Divisi
            </label>
            <select id="divisionId" name="divisionId" className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" required>
              <option value="">-- Pilih Divisi --</option>
              {divisions.map((division) => (
                <option key={division.id} value={division.id}>
                  {division.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="date" className="text-sm font-medium text-gray-700 mb-1">
              Tanggal
            </label>
            <input type="date" id="date" name="date" className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" required />
          </div>

          <div className="flex flex-col">
            <label htmlFor="imageUrl" className="text-sm font-medium text-gray-700 mb-1">
              Gambar Pencapaian
            </label>
            <input
              type="file"
              id="imageUrl"
              name="imageUrl"
              className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <p className="text-xs text-gray-500 mt-2">Biarkan kosong untuk menggunakan gambar default</p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <button type="submit" className="w-full sm:w-1/2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Simpan Pencapaian
            </button>
            <button type="button" onClick={() => router.push("/admin/achievements")} className="w-full sm:w-1/2 bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors">
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAchievementPage;
