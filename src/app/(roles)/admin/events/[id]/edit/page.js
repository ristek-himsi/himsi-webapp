"use client";

import React, { useEffect, useState } from "react";
import { useActionState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getEventById, updateEvent } from "@/app/(roles)/admin/events/libs/data";
import { uploadImage, deleteFile, getImageUrl } from "@/lib/supabase";

const initialState = {
  message: "",
  success: false,
  redirectUrl: null,
};

export default function EditEventPage({ params }) {
  const router = useRouter();
  // const { id } = useParams();
  // const id = parseInt(params.id);
  const unwrappedParams = React.use(params);
  const id = parseInt(unwrappedParams.id);
  const [event, setEvent] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [state, formAction] = useActionState(async (prevState, formData) => {
    try {
      let imageUrl = event.imageUrl;

      // Jika ada gambar baru, unggah ke Supabase dan hapus gambar lama
      if (newImage) {
        const fileName = await uploadImage(newImage, "events");
        imageUrl = fileName;

        // Hapus gambar lama jika ada
        if (event.imageUrl) {
          const oldFileName = getImageUrl(event?.imageUrl, "events");
          await deleteFile(oldFileName, "events");
        }
      }

      // Perbarui event
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

  // Redirect jika operasi berhasil
  useEffect(() => {
    if (state.success && state.redirectUrl) {
      router.push(state.redirectUrl);
    }
  }, [state, router]);

  // Fetch event data
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

  // Function to get the appropriate image URL
  // const getEventImageUrl = (imageUrl) => {
  //   if (!imageUrl) return "/placeholder-image.jpg"; // Default placeholder if no image

  //   if (imageUrl.startsWith("http")) {
  //     return imageUrl; // Already a complete URL
  //   }

  //   // Extract filename to handle paths like events/xxx.png
  //   const fileName = imageUrl.includes("/") ? imageUrl.split("/").pop() : imageUrl;

  //   return getImageUrl(fileName, "events");
  // };

  const eventImagePreview = getImageUrl(event?.imageUrl, "events");

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewImage(e.target.files[0]);
    }
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

  if (error || !event) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error</p>
          <p>{error || "Event tidak ditemukan"}</p>
        </div>
        <Link href="/admin/events" className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 inline-block">
          Kembali ke Daftar Event
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Event: {event.name}</h1>
        <Link href={`/admin/events/${id}`} className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">
          Batal
        </Link>
      </div>

      {state.message && <div className={`p-3 mb-4 rounded-md ${state.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{state.message}</div>}

      <form action={formAction} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-medium mb-1">
            Nama Event
          </label>
          <input type="text" id="name" name="name" defaultValue={event.name} placeholder="Masukkan nama event" className="border rounded-md p-2" required />
        </div>

        <div className="flex flex-col">
          <label htmlFor="startDate" className="text-sm font-medium mb-1">
            Tanggal Mulai
          </label>
          <input type="date" id="startDate" name="startDate" defaultValue={event.startDate ? new Date(event.startDate).toISOString().split("T")[0] : ""} className="border rounded-md p-2" required />
        </div>

        <div className="flex flex-col">
          <label htmlFor="endDate" className="text-sm font-medium mb-1">
            Tanggal Selesai
          </label>
          <input type="date" id="endDate" name="endDate" defaultValue={event.endDate ? new Date(event.endDate).toISOString().split("T")[0] : ""} className="border rounded-md p-2" required />
        </div>

        <div className="flex flex-col">
          <label htmlFor="location" className="text-sm font-medium mb-1">
            Lokasi
          </label>
          <input type="text" id="location" name="location" defaultValue={event.location} placeholder="Masukkan lokasi event" className="border rounded-md p-2" required />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="text-sm font-medium mb-1">
            Deskripsi
          </label>
          <textarea id="description" name="description" defaultValue={event.description} placeholder="Masukkan deskripsi event" className="border rounded-md p-2" rows="4" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="status" className="text-sm font-medium mb-1">
            Status
          </label>
          <select id="status" name="status" defaultValue={event.status} className="border rounded-md p-2">
            <option value="UPCOMING">Upcoming</option>
            <option value="ONGOING">Ongoing</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="type" className="text-sm font-medium mb-1">
            Tipe
          </label>
          <select id="type" name="type" defaultValue={event.type} className="border rounded-md p-2">
            <option value="REGULAR">Regular</option>
            <option value="SIFEST">SIFEST</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="academicYear" className="text-sm font-medium mb-1">
            Tahun Akademik
          </label>
          <input type="text" id="academicYear" name="academicYear" defaultValue={event.academicYear} placeholder="Contoh: 2024/2025" className="border rounded-md p-2" required />
        </div>

        <div className="flex flex-col">
          <label htmlFor="imageUrl" className="text-sm font-medium mb-1">
            Gambar Utama
          </label>
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 relative border rounded-md overflow-hidden bg-gray-100">
              <Image src={eventImagePreview} alt="Gambar Event" fill className="object-contain" />
            </div>
            <input type="file" id="imageUrl" name="imageUrl" accept="image/*" onChange={handleImageChange} className="border rounded-md p-2" />
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
}
