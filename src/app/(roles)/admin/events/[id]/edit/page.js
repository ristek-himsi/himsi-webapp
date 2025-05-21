"use client";

import React, { useEffect, useState } from "react";
import { useActionState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getEventById, updateEvent } from "@/app/(roles)/admin/events/libs/data";
import { uploadImage, deleteFile, getImageUrl } from "@/lib/supabase";
import { useFormStatus } from "react-dom";

const initialState = {
  message: "",
  success: false,
  redirectUrl: null,
};

// Define maximum file size (1MB)
const MAX_FILE_SIZE = 1 * 1024 * 1024;

const EditButton = () => {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
      {pending ? "Loading..." : "Simpan Perubahan"}
    </button>
  );
};

export default function EditEventPage({ params }) {
  const router = useRouter();
  const unwrappedParams = React.use(params);
  const id = parseInt(unwrappedParams.id);
  const [event, setEvent] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fileError, setFileError] = useState(""); // Add state for file error messages

  const [state, formAction] = useActionState(async (prevState, formData) => {
    try {
      let imageUrl = event.imageUrl;

      if (newImage) {
        const fileName = await uploadImage(newImage, "events");
        imageUrl = fileName;

        if (event.imageUrl) {
          const oldFileName = getImageUrl(event?.imageUrl, "events");
          await deleteFile(oldFileName, "events");
        }
      }

      const updatedEvent = await updateEvent(id, {
        name: formData.get("name"),
        startDate: new Date(formData.get("startDate")),
        endDate: new Date(formData.get("endDate")),
        location: formData.get("location"),
        description: formData.get("description") || null,
        status: formData.get("status"),
        type: formData.get("type"),
        academicYear: parseInt(formData.get("academicYear")),
        imageUrl,
      });

      return {
        message: "Event berhasil diperbarui",
        success: true,
        redirectUrl: `/admin/events/${id}`,
      };
    } catch (err) {
      console.error("Gagal memperbarui event:", err);
      return {
        message: "Gagal memperbarui event. Coba lagi.",
        success: false,
        redirectUrl: null,
      };
    }
  }, initialState);

  useEffect(() => {
    if (state.success && state.redirectUrl) {
      router.push(state.redirectUrl);
    }
  }, [state, router]);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const eventData = await getEventById(id);
        if (!eventData) {
          throw new Error("Event tidak ditemukan");
        }
        setEvent(eventData);
        setLoading(false);
      } catch (err) {
        console.error("Gagal memuat event:", err);
        setError("Gagal memuat event. Coba lagi nanti.");
        setLoading(false);
      }
    }

    fetchEvent();
  }, [id]);

  const eventImagePreview = getImageUrl(event?.imageUrl, "events");

  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    setFileError(""); // Clear previous errors

    if (file) {
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        setFileError("Ukuran file tidak boleh melebihi 1MB");
        setNewImage(null);
        e.target.value = null; // Reset file input
        return;
      }

      // If file size is valid, set the new image
      setNewImage(file);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4 py-8">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-t-blue-600 border-b-blue-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-3 text-gray-600 text-sm font-medium">Memuat data event...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="max-w-2xl mx-auto bg-red-50 p-4 rounded-lg shadow-sm">
          <p className="text-red-600 text-sm font-medium">{error || "Event tidak ditemukan"}</p>
        </div>
        <Link href="/admin/events" className="block max-w-2xl mx-auto mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
          Kembali ke Daftar Event
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 sm:py-10">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-5 sm:p-7">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-3">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">Edit Event: {event.name}</h1>
        </div>

        {state.message && <div className={`p-3 mb-5 rounded-lg text-sm font-medium ${state.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{state.message}</div>}

        {/* Display file error message if present */}
        {fileError && <div className="p-3 mb-5 rounded-lg text-sm font-medium bg-red-100 text-red-800">{fileError}</div>}

        <form action={formAction} className="space-y-5">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium text-gray-900 mb-1.5">
              Nama Event
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={event.name}
              placeholder="Masukkan nama event"
              className="border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors w-full"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="startDate" className="text-sm font-medium text-gray-900 mb-1.5">
                Tanggal Mulai
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                defaultValue={event.startDate ? new Date(event.startDate).toISOString().split("T")[0] : ""}
                className="border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="endDate" className="text-sm font-medium text-gray-900 mb-1.5">
                Tanggal Selesai
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                defaultValue={event.endDate ? new Date(event.endDate).toISOString().split("T")[0] : ""}
                className="border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                required
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="location" className="text-sm font-medium text-gray-900 mb-1.5">
              Lokasi
            </label>
            <input
              type="text"
              id="location"
              name="location"
              defaultValue={event.location}
              placeholder="Masukkan lokasi event"
              className="border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="description" className="text-sm font-medium text-gray-900 mb-1.5">
              Deskripsi
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={event.description}
              placeholder="Masukkan deskripsi event"
              className="border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              rows="4"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="status" className="text-sm font-medium text-gray-900 mb-1.5">
                Status
              </label>
              <select id="status" name="status" defaultValue={event.status} className="border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
                <option value="UPCOMING">Upcoming</option>
                <option value="ONGOING">Ongoing</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="type" className="text-sm font-medium text-gray-900 mb-1.5">
                Tipe
              </label>
              <select id="type" name="type" defaultValue={event.type} className="border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
                <option value="REGULAR">Regular</option>
                <option value="SIFEST">SIFEST</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="academicYear" className="text-sm font-medium text-gray-900 mb-1.5">
              Tahun Akademik
            </label>
            <input
              type="text"
              id="academicYear"
              name="academicYear"
              defaultValue={event.academicYear}
              placeholder="Contoh: 2024/2025"
              className="border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="imageUrl" className="text-sm font-medium text-gray-900 mb-1.5">
              Gambar Utama
            </label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-2">
              <div className="w-20 h-20 relative rounded-lg overflow-hidden shadow-sm bg-gray-100">
                <Image src={eventImagePreview} alt="Gambar Event" fill style={{ objectFit: "cover" }} className="transition-transform duration-300 hover:scale-105" />
              </div>
              <input
                type="file"
                id="imageUrl"
                name="imageUrl"
                accept="image/*"
                onChange={handleImageChange}
                className="border border-gray-300 rounded-lg p-2 text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors w-full sm:w-auto"
              />
            </div>
            <p className="text-xs text-gray-500">Biarkan kosong jika tidak ingin mengubah gambar</p>
            {/* Add file size information */}
            <p className="text-xs text-gray-500 mt-1">Format: PNG, JPG, GIF hingga 1MB</p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
            <EditButton />
            <Link href={`/admin/events/${id}`} className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors text-center">
              Batal
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
