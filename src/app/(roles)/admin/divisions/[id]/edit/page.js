"use client";

import React, { useEffect, useState } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { updateDivisionAction } from "../../libs/action";
import Image from "next/image";
import { getImageUrl } from "@/lib/supabase"; // Import the getImageUrl function

const initialState = {
  message: "",
  success: false,
};

const EditDivisionPage = ({ params }) => {
  const unwrappedParams = React.use(params);
  const id = unwrappedParams.id;
  const router = useRouter();
  const [division, setDivision] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [state, formAction] = useActionState((prevState, formData) => updateDivisionAction(prevState, formData, id), initialState);

  // Redirect jika operasi berhasil dan ada properti success
  useEffect(() => {
    if (state.success && state.redirectUrl) {
      router.push(state.redirectUrl);
    }
  }, [state, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch division data
        const divisionRes = await fetch(`/api/divisions/${id}`);
        const divisionData = await divisionRes.json();

        if (!divisionData.success) {
          throw new Error(divisionData.message || "Gagal memuat data divisi");
        }

        setDivision(divisionData.data);

        // Fetch users for leader selection
        const usersRes = await fetch("/api/users");
        const usersData = await usersRes.json();

        if (usersData.success) {
          setUsers(usersData.data);
        } else {
          console.error("Failed to load users data:", usersData.message);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Function to get the appropriate image URL
  const getDivisionImageUrl = (logoUrl) => {
    if (!logoUrl) return "/placeholder-logo.png"; // Default placeholder if no logo

    if (logoUrl.startsWith("http")) {
      return logoUrl; // Already a complete URL
    }

    // Extract filename from path
    const fileName = logoUrl.includes("/") ? logoUrl.split("/").pop() : logoUrl;

    return getImageUrl(fileName, "divisi");
  };

  const divisionImagePreview = getImageUrl(division?.logoUrl, "divisi");

  if (loading) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="animate-pulse flex flex-col space-y-4">
          <div className="h-10 bg-gray-200 rounded w-1/2"></div>
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
        <button onClick={() => router.push("/admin/divisions")} className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Kembali ke Daftar Divisi
        </button>
      </div>
    );
  }

  if (!division) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <p>Divisi tidak ditemukan</p>
        </div>
        <button onClick={() => router.push("/admin/divisions")} className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Kembali ke Daftar Divisi
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Divisi: {division.name}</h1>
        <button onClick={() => router.push(`/admin/divisions/${id}`)} className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">
          Batal
        </button>
      </div>

      {state.message && <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-md">{state.message}</div>}

      <form action={formAction} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-medium mb-1">
            Nama Divisi
          </label>
          <input type="text" id="name" name="name" defaultValue={division.name} placeholder="Masukkan nama divisi" className="border rounded-md p-2" required />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="text-sm font-medium mb-1">
            Deskripsi
          </label>
          <textarea id="description" name="description" defaultValue={division.description} placeholder="Masukkan deskripsi divisi" className="border rounded-md p-2" rows="3" required></textarea>
        </div>

        {/* Logo divisi dengan preview dari Supabase */}
        <div className="flex flex-col">
          <label htmlFor="logoUrl" className="text-sm font-medium mb-1">
            Logo Divisi
          </label>
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 relative border rounded-md overflow-hidden bg-gray-100">
              <Image src={divisionImagePreview} alt="Logo Divisi" fill className="object-contain" />
            </div>
            <input type="file" id="logoUrl" name="logoUrl" className="border rounded-md p-2" />
          </div>
          <p className="text-xs text-gray-500 mt-1">Biarkan kosong jika tidak ingin mengubah logo</p>
        </div>

        <div className="flex flex-col">
          <label htmlFor="vision" className="text-sm font-medium mb-1">
            Visi
          </label>
          <input type="text" id="vision" name="vision" defaultValue={division.vision} placeholder="Masukkan visi divisi" className="border rounded-md p-2" required />
        </div>

        <div className="flex flex-col">
          <label htmlFor="mission" className="text-sm font-medium mb-1">
            Misi
          </label>
          <textarea id="mission" name="mission" defaultValue={division.mission} placeholder="Masukkan misi divisi" className="border rounded-md p-2" rows="3" required></textarea>
        </div>

        <div className="flex flex-col">
          <label htmlFor="leaderId" className="text-sm font-medium mb-1">
            Pemimpin Divisi (Opsional)
          </label>
          <select id="leaderId" name="leaderId" defaultValue={division.leader?.id || ""} className="border rounded-md p-2">
            <option value="">-- Pilih Pemimpin Divisi --</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} - {user.email}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">*Pemilihan pemimpin bersifat opsional</p>
        </div>

        <div className="pt-4 flex space-x-3">
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDivisionPage;
