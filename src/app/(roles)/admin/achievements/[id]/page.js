"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getImageUrl } from "@/lib/supabase";

const AchievementDetailPage = ({ params }) => {
  const [achievement, setAchievement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const unwrappedParams = React.use(params);
  const id = unwrappedParams.id;

  useEffect(() => {
    const fetchAchievementDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/achievements/${id}`);
        const data = await res.json();

        if (data.success) {
          setAchievement(data.data);
        } else {
          setError(data.message || "Gagal memuat data pencapaian");
        }
      } catch (err) {
        setError("Terjadi kesalahan saat memuat data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAchievementDetails();
    }
  }, [id]);

  const getAchievementImageUrl = (imageUrl) => {
    if (!imageUrl) return "/placeholder-achievement.png";
    if (imageUrl.startsWith("http")) return imageUrl;
    const fileName = imageUrl.includes("/") ? imageUrl.split("/").pop() : imageUrl;
    return getImageUrl(fileName, "achievements");
  };

  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="animate-pulse flex flex-col space-y-4">
          <div className="h-10 bg-gray-200 rounded w-1/4"></div>
          <div className="h-40 bg-gray-200 rounded"></div>
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
        <button onClick={() => router.push("/admin/achievements")} className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Kembali ke Daftar Pencapaian
        </button>
      </div>
    );
  }

  if (!achievement) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
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
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{achievement.title}</h1>
        <div className="space-x-2">
          <button onClick={() => router.push(`/admin/achievements/${id}/edit`)} className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">
            Edit Pencapaian
          </button>
          <button onClick={() => router.push("/admin/achievements")} className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">
            Kembali
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 flex flex-col items-center">
          <div className="w-48 h-48 relative mb-4 border rounded-md overflow-hidden bg-gray-100">
            <Image src={getAchievementImageUrl(achievement.imageUrl)} alt={`Gambar ${achievement.title}`} fill className="object-contain" />
          </div>
          {achievement.division && (
            <div className="bg-blue-50 p-4 rounded-lg w-full text-center">
              <h3 className="font-medium text-lg mb-1">Divisi</h3>
              <p className="text-xl font-bold">{achievement.division.name}</p>
            </div>
          )}
        </div>

        <div className="md:col-span-2">
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-3">Deskripsi</h2>
            <p className="text-gray-700 whitespace-pre-line">{achievement.description}</p>
          </div>
          <div className="bg-indigo-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3 text-indigo-700">Tanggal</h2>
            <p className="text-gray-700">{new Date(achievement.date).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementDetailPage;
