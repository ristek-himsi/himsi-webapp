"use client";

import React, { useEffect, useState } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { updateAchievementAction } from "../../libs/action";
import { getImageUrl } from "@/lib/supabase";

const initialState = {
  message: "",
  success: false,
};

const EditAchievementPage = ({ params }) => {
  const unwrappedParams = React.use(params);
  const id = unwrappedParams.id;
  const router = useRouter();
  const [achievement, setAchievement] = useState(null);
  const [divisions, setDivisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [state, formAction] = useActionState((prevState, formData) => updateAchievementAction(prevState, formData, id), initialState);

  useEffect(() => {
    if (state.success && state.redirectUrl) {
      router.push(state.redirectUrl);
    }
  }, [state, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const achievementRes = await fetch(`/api/achievements/${id}`);
        const achievementData = await achievementRes.json();

        if (!achievementData.success) {
          throw new Error(achievementData.message || "Gagal memuat data pencapaian");
        }

        setAchievement(achievementData.data);

        const divisionsRes = await fetch("/api/divisions");
        const divisionsData = await divisionsRes.json();

        if (divisionsData.success) {
          setDivisions(divisionsData.data);
        } else {
          console.error("Failed to load divisions data:", divisionsData.message);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const getAchievementImageUrl = (imageUrl) => {
    if (!imageUrl) return "/placeholder-achievement.png";
    if (imageUrl.startsWith("http")) return imageUrl;
    const fileName = imageUrl.includes("/") ? imageUrl.split("/").pop() : imageUrl;
    return getImageUrl(fileName, "achievements");
  };

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
        <button onClick={() => router.push("/admin/achievements")} className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Kembali ke Daftar Pencapaian
        </button>
      </div>
    );
  }

  if (!achievement) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <p>Pencapaian tidak ditemukan</p>
        </div>
        <button onClick={() => router.push("/admin/achievements")} className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Kembali ke Daftar Pencapaian
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Pencapaian: {achievement.title}</h1>
        <button onClick={() => router.push(`/admin/achievements/${id}`)} className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">
          Batal
        </button>
      </div>

      {state.message && <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-md">{state.message}</div>}

      <form action={formAction} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="title" className="text-sm font-medium mb-1">
            Judul Pencapaian
          </label>
          <input type="text" id="title" name="title" defaultValue={achievement.title} placeholder="Masukkan judul pencapaian" className="border rounded-md p-2" required />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="text-sm font-medium mb-1">
            Deskripsi
          </label>
          <textarea id="description" name="description" defaultValue={achievement.description} placeholder="Masukkan deskripsi pencapaian" className="border rounded-md p-2" rows="4" required />
        </div>

        <div className="flex flex-col">
          <label htmlFor="divisionId" className="text-sm font-medium mb-1">
            Divisi
          </label>
          <select id="divisionId" name="divisionId" defaultValue={achievement.division?.id} className="border rounded-md p-2" required>
            <option value="">-- Pilih Divisi --</option>
            {divisions.map((division) => (
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
          <input type="date" id="date" name="date" defaultValue={new Date(achievement.date).toISOString().split("T")[0]} className="border rounded-md p-2" required />
        </div>

        <div className="flex flex-col">
          <label htmlFor="imageUrl" className="text-sm font-medium mb-1">
            Gambar Pencapaian
          </label>
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 relative border rounded-md overflow-hidden bg-gray-100">
              <Image src={getAchievementImageUrl(achievement.imageUrl)} alt="Gambar Pencapaian" fill className="object-contain" />
            </div>
            <input type="file" id="imageUrl" name="imageUrl" className="border rounded-md p-2" />
          </div>
          <p className="text-xs text-gray-500 mt-1">Biarkan kosong jika tidak ingin mengubah gambar</p>
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

export default EditAchievementPage;
