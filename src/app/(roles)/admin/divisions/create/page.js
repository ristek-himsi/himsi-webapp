"use client";

import React, { useEffect, useState } from "react";
import { addDivisionAction } from "../libs/action";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

const initialState = {
  message: "",
  success: false,
};

// Define maximum file size (1MB)
const MAX_FILE_SIZE = 1 * 1024 * 1024;

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
      {pending ? "Loading..." : "Simpan Divisi"}
    </button>
  );
};

const Page = () => {
  const [divisions, setDivisions] = useState(null);
  const [users, setUsers] = useState(null);
  const router = useRouter();

  // Add states for file handling
  const [fileError, setFileError] = useState("");
  const [fileName, setFileName] = useState("");
  const [logoPreview, setLogoPreview] = useState(null);

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

  // Handle file selection and validation
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileError("");

    if (file) {
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        setFileError("Ukuran file tidak boleh melebihi 1MB");
        setFileName("");
        setLogoPreview(null);
        e.target.value = null; // Reset file input
        return;
      }

      setFileName(file.name);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoPreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Tambah Divisi Baru</h1>
      {state.message && <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-md">{state.message}</div>}
      {fileError && <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-md">{fileError}</div>}

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
          <div className="mt-1 flex items-center">
            {/* Logo preview */}
            <div className="h-24 w-24 rounded-md overflow-hidden bg-gray-100 mr-4 border flex items-center justify-center">
              {logoPreview ? (
                <img src={logoPreview} alt="Logo Preview" className="h-full w-full object-cover" />
              ) : (
                <svg className="h-12 w-12 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
              )}
            </div>

            <div className="flex flex-col">
              <div className="relative">
                <input type="file" id="logoUrl" name="logoUrl" onChange={handleFileChange} accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                <label htmlFor="logoUrl" className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium bg-white text-blue-600 hover:bg-gray-50 cursor-pointer inline-block">
                  Upload Logo
                </label>
              </div>

              {fileName && <p className="mt-2 text-sm text-gray-600 truncate max-w-xs">{fileName}</p>}
              <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF hingga 1MB</p>
            </div>
          </div>
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
          <SubmitButton />
        </div>
      </form>

      {/* Preview existing divisions if needed */}
    </div>
  );
};

export default Page;
