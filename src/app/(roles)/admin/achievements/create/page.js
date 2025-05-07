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

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Tambah Pencapaian Baru</h1>
      {state.message && <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-md">{state.message}</div>}

      <form action={formAction} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="title" className="text-sm font-medium mb-1">
            Judul Pencapaian
          </label>
          <input type="text" id="title" name="title" placeholder="Masukkan judul pencapaian" className="border rounded-md p-2" required />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="text-sm font-medium mb-1">
            Deskripsi
          </label>
          <textarea id="description" name="description" placeholder="Masukkan deskripsi pencapaian" className="border rounded-md p-2" rows="4" required />
        </div>

        <div className="flex flex-col">
          <label htmlFor="divisionId" className="text-sm font-medium mb-1">
            Divisi
          </label>
          <select id="divisionId" name="divisionId" className="border rounded-md p-2" required>
            <option value="">-- Pilih Divisi --</option>
            {divisions?.map((division) => (
              <option key={division.id} value={division.id}>
                {division.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="date" className="text-sm font-medium mb-1">
            Tanggal
          </label>
          <input type="date" id="date" name="date" className="border rounded-md p-2" required />
        </div>

        <div className="flex flex-col">
          <label htmlFor="imageUrl" className="text-sm font-medium mb-1">
            Gambar Pencapaian
          </label>
          <input type="file" id="imageUrl" name="imageUrl" className="border rounded-md p-2" />
          <p className="text-xs text-gray-500 mt-1">Biarkan kosong untuk menggunakan gambar default</p>
        </div>

        <div className="pt-4">
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Simpan Pencapaian
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAchievementPage;
