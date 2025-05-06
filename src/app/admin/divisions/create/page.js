"use client";

import React, { useEffect, useState } from "react";
import { addDivisionAction } from "../libs/action";
import { useRouter } from "next/navigation";
import { useActionState } from "react";

const initialState = {
  message: "",
  success: false,
};

const Page = () => {
  const [divisions, setDivisions] = useState(null);
  const [users, setUsers] = useState(null);
  const router = useRouter();

  // Menggunakan useFormState dari next/navigation, bukan useActionState
  const [state, formAction] = useActionState(addDivisionAction, initialState);

  // Redirect jika operasi berhasil dan ada properti success
  useEffect(() => {
    if (state.success && state.redirectUrl) {
      router.push(state.redirectUrl);
    }
  }, [state, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await fetch("/api/divisions");
        const json1 = await res1.json();
        if (json1.success) {
          setDivisions(json1.data);
        } else {
          console.error("Divisions fetch error:", json1.message);
        }

        const res2 = await fetch("/api/users");
        const json2 = await res2.json();
        if (json2.success) {
          setUsers(json2.data);
        } else {
          console.error("Users fetch error:", json2.message);
        }
      } catch (error) {
        console.error("Unexpected fetch error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Tambah Divisi Baru</h1>
      {state.message && <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-md">{state.message}</div>}

      <form action={formAction} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-medium mb-1">
            Nama Divisi
          </label>
          <input type="text" id="name" name="name" placeholder="Masukkan nama divisi" className="border rounded-md p-2" required />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="text-sm font-medium mb-1">
            Deskripsi
          </label>
          <textarea id="description" name="description" placeholder="Masukkan deskripsi divisi" className="border rounded-md p-2" rows="3" required></textarea>
        </div>

        <div className="flex flex-col">
          <label htmlFor="logoUrl" className="text-sm font-medium mb-1">
            Logo Divisi
          </label>
          <input type="file" id="logoUrl" name="logoUrl" className="border rounded-md p-2" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="vision" className="text-sm font-medium mb-1">
            Visi
          </label>
          <input type="text" id="vision" name="vision" placeholder="Masukkan visi divisi" className="border rounded-md p-2" required />
        </div>

        <div className="flex flex-col">
          <label htmlFor="mission" className="text-sm font-medium mb-1">
            Misi
          </label>
          <textarea id="mission" name="mission" placeholder="Masukkan misi divisi" className="border rounded-md p-2" rows="3" required></textarea>
        </div>

        <div className="flex flex-col">
          <label htmlFor="leaderId" className="text-sm font-medium mb-1">
            Pemimpin Divisi (Opsional)
          </label>
          <select id="leaderId" name="leaderId" className="border rounded-md p-2">
            <option value="">-- Pilih Pemimpin Divisi --</option>
            {users?.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} - {user.email}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">*Pemilihan pemimpin bersifat opsional dan dapat diubah nanti</p>
        </div>

        <div className="pt-4">
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Simpan Divisi
          </button>
        </div>
      </form>

      {/* Preview existing divisions if needed */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Divisi Yang Ada</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {divisions?.map((division) => (
            <div key={division.id} className="border p-4 rounded">
              <h3 className="font-bold">{division.name}</h3>
              <p className="text-sm text-gray-600">{division.description}</p>
              {division.leader && (
                <p className="text-sm mt-2">
                  <span className="font-medium">Pemimpin:</span> {division.leader.name}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
