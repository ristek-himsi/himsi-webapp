"use client";

import React, { useEffect, useState } from "react";
import { addPostAction } from "../libs/action";
import { useRouter } from "next/navigation";
import { useActionState } from "react";

const initialState = {
  message: "",
  success: false,
};

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB in bytes

const CreatePostPage = () => {
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const [state, formAction] = useActionState(addPostAction, initialState);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (state.success && state.redirectUrl) {
      router.push(state.redirectUrl);
    }

    // Update local error state when receiving error message from server action
    if (state.message) {
      setError(state.message);
    }
  }, [state, router]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        const json = await res.json();
        if (json.success) {
          setUsers(json.data);
        } else {
          console.error("Users fetch error:", json.message);
          setError(json.message);
        }
      } catch (error) {
        console.error("Unexpected fetch error:", error);
        setError("Gagal memuat data pengguna");
      }
    };

    fetchUsers();
  }, []);

  // Handle file selection and preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setError("");

    if (file) {
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        setError("Ukuran file tidak boleh melebihi 1MB");
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

  // Custom form submission handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Basic client-side validation for file size
    const imageFile = formData.get("imageUrl");
    if (imageFile && imageFile.size > 0) {
      if (imageFile.size > MAX_FILE_SIZE) {
        setError("Ukuran file tidak boleh melebihi 1MB");
        return;
      }
    }

    // Clear any previous errors
    setError("");

    // Submit the form using the action
    formAction(formData);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Tambah Postingan Baru</h1>

      {/* Display error message */}
      {error && <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-md">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="title" className="text-sm font-medium mb-1">
            Judul
          </label>
          <input type="text" id="title" name="title" placeholder="Masukkan judul postingan" className="border rounded-md p-2" required />
        </div>

        <div className="flex flex-col">
          <label htmlFor="content" className="text-sm font-medium mb-1">
            Konten
          </label>
          <textarea id="content" name="content" placeholder="Masukkan konten postingan" className="border rounded-md p-2" rows="6" required></textarea>
        </div>

        <div className="flex flex-col">
          <label htmlFor="imageUrl" className="text-sm font-medium mb-1">
            Gambar Postingan
          </label>

          <div className="mt-1 flex items-center">
            {/* Preview image */}
            {imagePreview && (
              <div className="h-24 w-24 rounded-md overflow-hidden bg-gray-100 mr-4 border flex items-center justify-center">
                <img src={imagePreview} alt="Image Preview" className="h-full w-full object-cover" />
              </div>
            )}

            <div className="flex flex-col">
              <div className="relative">
                <input type="file" id="imageUrl" name="imageUrl" onChange={handleFileChange} accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                <label htmlFor="imageUrl" className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium bg-white text-blue-600 hover:bg-gray-50 cursor-pointer inline-block">
                  Upload Gambar
                </label>
              </div>

              {fileName && <p className="mt-2 text-sm text-gray-600 truncate max-w-xs">{fileName}</p>}
              <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF hingga 1MB</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="category" className="text-sm font-medium mb-1">
            Kategori
          </label>
          <select id="category" name="category" className="border rounded-md p-2" required>
            <option value="">-- Pilih Kategori --</option>
            <option value="NEWS">Berita</option>
            <option value="ANNOUNCEMENT">Pengumuman</option>
            <option value="ARTICLE">Artikel</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="status" className="text-sm font-medium mb-1">
            Status
          </label>
          <select id="status" name="status" className="border rounded-md p-2" required>
            <option value="">-- Pilih Status --</option>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Terpublikasi</option>
            <option value="ARCHIVED">Diarsipkan</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="authorId" className="text-sm font-medium mb-1">
            Penulis
          </label>
          <select id="authorId" name="authorId" className="border rounded-md p-2" required>
            <option value="">-- Pilih Penulis --</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} - {user.email}
              </option>
            ))}
          </select>
        </div>

        <div className="pt-4">
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700" disabled={!!error}>
            Simpan Postingan
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostPage;
