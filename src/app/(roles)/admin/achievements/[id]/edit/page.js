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

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB in bytes

const EditAchievementPage = ({ params }) => {
  const unwrappedParams = React.use(params);
  const id = unwrappedParams.id;
  const router = useRouter();
  const [achievement, setAchievement] = useState(null);
  const [divisions, setDivisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [state, formAction] = useActionState((prevState, formData) => updateAchievementAction(prevState, formData, id), initialState);
  const [imagePreview, setImagePreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState("");

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

  // Handle file selection and preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileError("");

    if (file) {
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        setFileError("Ukuran file tidak boleh melebihi 1MB");
        setFileName("");
        setImagePreview(null);
        e.target.value = null; // Reset file input
        return;
      }

      setFileName(file.name);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-0">
        <div className="w-full max-w-md sm:max-w-2xl bg-white rounded-xl shadow-lg p-6">
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
            <p className="font-semibold">Error</p>
            <p>{error}</p>
          </div>
          <button onClick={() => router.push("/admin/achievements")} className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
            Kembali ke Daftar Pencapaian
          </button>
        </div>
      </div>
    );
  }

  if (!achievement) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-0">
        <div className="w-full max-w-md sm:max-w-2xl bg-white rounded-xl shadow-lg p-6">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg">
            <p>Pencapaian tidak ditemukan</p>
          </div>
          <button onClick={() => router.push("/admin/achievements")} className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
            Kembali ke Daftar Pencapaian
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-0">
      <div className="w-full max-w-md sm:max-w-2xl bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Edit Pencapaian: {achievement.title}</h1>
          <button onClick={() => router.push(`/admin/achievements/${id}`)} className="w-full cursor-pointer sm:w-auto bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors">
            Batal
          </button>
        </div>

        {state.message && <div className="p-3 mb-4 bg-red-50 text-red-700 rounded-lg border-l-4 border-red-500">{state.message}</div>}
        {fileError && <div className="p-3 mb-4 bg-red-50 text-red-700 rounded-lg border-l-4 border-red-500">{fileError}</div>}

        <form action={formAction} className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="title" className="text-sm font-medium text-gray-700 mb-1">
              Judul Pencapaian
            </label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={achievement.title}
              placeholder="Masukkan judul pencapaian"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="description" className="text-sm font-medium text-gray-700 mb-1">
              Deskripsi
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={achievement.description}
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
            <select id="divisionId" name="divisionId" defaultValue={achievement.division?.id} className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" required>
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
            <input
              type="date"
              id="date"
              name="date"
              defaultValue={new Date(achievement.date).toISOString().split("T")[0]}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="imageUrl" className="text-sm font-medium text-gray-700 mb-1">
              Gambar Pencapaian
            </label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-20 h-20 relative border border-gray-300 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                {imagePreview ? <img src={imagePreview} alt="Gambar Preview" className="object-cover w-full h-full" /> : <Image src={getAchievementImageUrl(achievement?.imageUrl)} alt="Gambar Pencapaian" fill className="object-cover" />}
              </div>
              <div className="w-full">
                <div className="relative">
                  <input
                    type="file"
                    id="imageUrl"
                    name="imageUrl"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
                {fileName && <p className="mt-2 text-sm text-gray-600 truncate max-w-xs">{fileName}</p>}
                <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF hingga 1MB. Biarkan kosong jika tidak ingin mengubah gambar.</p>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <button type="submit" className="w-full cursor-pointer bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors" disabled={!!fileError}>
              Simpan Perubahan
            </button>
          </div>
        </form>
        <button onClick={() => router.push(`/admin/achievements/${id}`)} className="w-full cursor-pointer mt-3 bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors">
          Batal
        </button>
      </div>
    </div>
  );
};

export default EditAchievementPage;
