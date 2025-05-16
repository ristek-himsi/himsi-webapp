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
          <button onClick={() => router.push("/admin/posts")} className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
            Kembali ke Daftar Postingan
          </button>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-0">
        <div className="w-full max-w-md sm:max-w-2xl bg-white rounded-xl shadow-lg p-6">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg">
            <p>Postingan tidak ditemukan</p>
          </div>
          <button onClick={() => router.push("/admin/posts")} className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
            Kembali ke Daftar Postingan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-0">
      <div className="w-full max-w-md sm:max-w-2xl bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Edit Postingan: {post.title}</h1>
        </div>

        {state.message && <div className="p-3 mb-4 bg-red-50 text-red-700 rounded-lg border-l-4 border-red-500">{state.message}</div>}

        <form action={formAction} className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="title" className="text-sm font-medium text-gray-700 mb-1">
              Judul
            </label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={post.title}
              placeholder="Masukkan judul postingan"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="content" className="text-sm font-medium text-gray-700 mb-1">
              Konten
            </label>
            <textarea
              id="content"
              name="content"
              defaultValue={post.content}
              placeholder="Masukkan konten postingan"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-y"
              rows="6"
              required
            ></textarea>
          </div>

          <div className="flex flex-col">
            <label htmlFor="imageUrl" className="text-sm font-medium text-gray-700 mb-1">
              Gambar Postingan
            </label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-20 h-20 relative border border-gray-300 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                <Image src={getPostImageUrl(post?.imageUrl)} alt="Gambar Postingan" fill className="object-cover" />
              </div>
              <div className="w-full">
                <input
                  type="file"
                  id="imageUrl"
                  name="imageUrl"
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="text-xs text-gray-500 mt-2">Biarkan kosong jika tidak ingin mengubah gambar</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="category" className="text-sm font-medium text-gray-700 mb-1">
              Kategori
            </label>
            <select id="category" name="category" defaultValue={post.category} className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" required>
              <option value="">-- Pilih Kategori --</option>
              <option value="NEWS">Berita</option>
              <option value="ANNOUNCEMENT">Pengumuman</option>
              <option value="ARTICLE">Artikel</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="status" className="text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select id="status" name="status" defaultValue={post.status} className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" required>
              <option value="">-- Pilih Status --</option>
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Terpublikasi</option>
              <option value="ARCHIVED">Diarsipkan</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="authorId" className="text-sm font-medium text-gray-700 mb-1">
              Penulis
            </label>
            <select id="authorId" name="authorId" defaultValue={post.author?.id || ""} className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" required>
              <option value="">-- Pilih Penulis --</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} - {user.email}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <button type="submit" className="w-full bg-blue-600 cursor-pointer text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Simpan Perubahan
            </button>
          </div>
        </form>
        <button onClick={() => router.push(`/admin/posts/${id}`)} className="w-full mt-3 cursor-pointer bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors">
          Batal
        </button>
      </div>
    </div>
  );
};

export default EditPostPage;
