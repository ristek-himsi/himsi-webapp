"use client";

import React, { useEffect, useState } from "react";
import { addPostAction } from "../libs/action";
import { useRouter } from "next/navigation";
import { useActionState } from "react";

const initialState = {
  message: "",
  success: false,
};

const CreatePostPage = () => {
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const [state, formAction] = useActionState(addPostAction, initialState);

  useEffect(() => {
    if (state.success && state.redirectUrl) {
      router.push(state.redirectUrl);
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
        }
      } catch (error) {
        console.error("Unexpected fetch error:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Tambah Postingan Baru</h1>
      {state.message && <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-md">{state.message}</div>}

      <form action={formAction} className="space-y-4">
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
          <input type="file" id="imageUrl" name="imageUrl" className="border rounded-md p-2" />
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
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Simpan Postingan
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostPage;
