"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getImageUrl } from "@/lib/supabase"; // Import fungsi getImageUrl dari path yang benar

const DivisionDetailPage = ({ params }) => {
  const [division, setDivision] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const unwrappedParams = React.use(params);
  const id = unwrappedParams.id;

  useEffect(() => {
    const fetchDivisionDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/divisions/${id}`);
        const data = await res.json();

        if (data.success) {
          setDivision(data.data);
        } else {
          setError(data.message || "Gagal memuat data divisi");
        }
      } catch (err) {
        setError("Terjadi kesalahan saat memuat data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDivisionDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="animate-pulse flex flex-col space-y-4">
          <div className="h-10 bg-gray-200 rounded w-1/4"></div>
          <div className="h-40 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
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
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <p>Divisi tidak ditemukan</p>
        </div>
        <button onClick={() => router.push("/admin/divisions")} className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Kembali ke Daftar Divisi
        </button>
      </div>
    );
  }

  // Fungsi untuk mendapatkan URL gambar yang benar - mengikuti pola yang sama dengan halaman edit
  const getDivisionImageUrl = (logoUrl) => {
    if (!logoUrl) return "/placeholder-logo.png"; // Default placeholder jika tidak ada logo

    if (logoUrl.startsWith("http")) {
      return logoUrl; // Sudah URL lengkap
    }

    // Ekstrak nama file dari path
    const fileName = logoUrl.includes("/") ? logoUrl.split("/").pop() : logoUrl;

    return getImageUrl(fileName, "divisi");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{division.name}</h1>
        <div className="space-x-2">
          <button onClick={() => router.push(`/admin/divisions/${id}/edit`)} className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">
            Edit Divisi
          </button>
          <button onClick={() => router.push("/admin/divisions")} className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">
            Kembali
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Logo dan Informasi Dasar */}
        <div className="md:col-span-1 flex flex-col items-center">
          <div className="w-48 h-48 relative mb-4 border rounded-md overflow-hidden bg-gray-100">
            <Image src={getDivisionImageUrl(division.logoUrl)} alt={`Logo ${division.name}`} fill className="object-contain" />
          </div>

          {division.leader && (
            <div className="bg-blue-50 p-4 rounded-lg w-full text-center">
              <h3 className="font-medium text-lg mb-1">Pemimpin Divisi</h3>
              <p className="text-xl font-bold">{division.leader.name}</p>
              <p className="text-gray-600">{division.leader.email}</p>
            </div>
          )}
        </div>

        {/* Detail Divisi */}
        <div className="md:col-span-2">
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-3">Deskripsi</h2>
            <p className="text-gray-700 whitespace-pre-line">{division.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-3 text-green-700">Visi</h2>
              <p className="text-gray-700 whitespace-pre-line">{division.vision}</p>
            </div>

            <div className="bg-indigo-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-3 text-indigo-700">Misi</h2>
              <p className="text-gray-700 whitespace-pre-line">{division.mission}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Anggota Divisi (jika tersedia) */}
      {division.members && division.members.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Anggota Divisi</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {division.members.map((member) => (
              <div key={member.id} className="border p-4 rounded-lg bg-gray-50">
                <h3 className="font-bold">{member.name}</h3>
                <p className="text-gray-600">{member.email}</p>
                <p className="text-sm text-blue-600">{member.role === "ADMIN" ? "Admin" : member.role === "DIVISION_LEADER" ? "Pemimpin Divisi" : "Member"}</p>
                <p className="text-sm text-gray-500 mt-1">Tergabung: {new Date(member.joinedAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DivisionDetailPage;
