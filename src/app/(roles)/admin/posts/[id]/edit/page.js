"use client";

import React, { useEffect, useState } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { updatePostAction } from "../../libs/action";
import Image from "next/image";
import { getImageUrl } from "@/lib/supabase";

const initialState = {
  message: "",
  success: false,
};

const EditPostPage = ({ params }) => {
  const unwrappedParams = React.use(params);
  const id = unwrappedParams.id;
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [state, formAction] = useActionState((prevState, formData) => updatePostAction(prevState, formData, id), initialState);

  useEffect(() => {
    if (state.success && state.redirectUrl) {
      router.push(state.redirectUrl);
    }
  }, [state, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const postRes = await fetch(`/api/posts/${id}`);
        const postData = await postRes.json();

        if (!postData.success) {
          throw new Error(postData.message || "Gagal memuat data postingan");
        }

        setPost(postData.data);

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

  const getPostImageUrl = (imageUrl) => {
    if (!imageUrl) return "/placeholder-image.png";
    if (imageUrl.startsWith("http")) return imageUrl;
    const fileName = imageUrl.includes("/") ? imageUrl.split("/").pop() : imageUrl;
    return getImageUrl(fileName, "posts");
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
        <button onClick={() => router.push("/admin/posts")} className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Kembali ke Daftar Postingan
        </button>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <p>Postingan tidak ditemukan</p>
        </div>
        <button onClick={() => router.push("/admin/posts")} className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Kembali ke Daftar Postingan
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Postingan: {post.title}</h1>
        <button onClick={() => router.push(`/admin/posts/${id}`)} className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">
          Batal
        </button>
      </div>

      {state.message && <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-md">{state.message}</div>}

      <form action={formAction} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="title" className="text-sm font-medium mb-1">
            Judul
          </label>
          <input type="text" id="title" name="title" defaultValue={post.title} placeholder="Masukkan judul postingan" className="border rounded-md p-2" required />
        </div>

        <div className="flex flex-col">
          <label htmlFor="content" className="text-sm font-medium mb-1">
            Konten
          </label>
          <textarea id="content" name="content" defaultValue={post.content} placeholder="Masukkan konten postingan" className="border rounded-md p-2" rows="6" required></textarea>
        </div>

        <div className="flex flex-col">
          <label htmlFor="imageUrl" className="text-sm font-medium mb-1">
            Gambar Postingan
          </label>
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 relative border rounded-md overflow-hidden bg-gray-100">
              <Image src={getPostImageUrl(post.imageUrl)} alt="Gambar Postingan" fill className="object-contain" />
            </div>
            <input type="file" id="imageUrl" name="imageUrl" className="border rounded-md p-2" />
          </div>
          <p className="text-xs text-gray-500 mt-1">Biarkan kosong jika tidak ingin mengubah gambar</p>
        </div>

        <div className="flex flex-col">
          <label htmlFor="category" className="text-sm font-medium mb-1">
            Kategori
          </label>
          <select id="category" name="category" defaultValue={post.category} className="border rounded-md p-2" required>
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
          <select id="status" name="status" defaultValue={post.status} className="border rounded-md p-2" required>
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
          <select id="authorId" name="authorId" defaultValue={post.author?.id || ""} className="border rounded-md p-2" required>
            <option value="">-- Pilih Penulis --</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} - {user.email}
              </option>
            ))}
          </select>
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

export default EditPostPage;
