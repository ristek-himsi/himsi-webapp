"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getImageUrl } from "@/lib/supabase";
import { FileTextIcon, UserIcon } from "lucide-react";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/posts");
        const data = await res.json();

        if (data.success) {
          setPosts(data.data);
        } else {
          setError(data.message || "Gagal memuat data postingan");
        }
      } catch (err) {
        setError("Terjadi kesalahan saat memuat data: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleOpenDeleteModal = (post) => {
    setPostToDelete(post);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setPostToDelete(null);
  };

  const handleDeletePost = async () => {
    if (!postToDelete) return;

    try {
      const res = await fetch(`/api/posts/${postToDelete.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        setPosts(posts.filter((post) => post.id !== postToDelete.id));
        handleCloseDeleteModal();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Terjadi kesalahan saat menghapus postingan: " + err.message);
    }
  };

  const getPostImageUrl = (imageUrl) => {
    if (!imageUrl) return "/placeholder-image.png";
    if (imageUrl.startsWith("http")) return imageUrl;
    const fileName = imageUrl.includes("/") ? imageUrl.split("/").pop() : imageUrl;
    return getImageUrl(fileName, "posts");
  };

  const getUserAvatar = (photoUrl) => {
    if (!photoUrl) return "/placeholder-avatar.png";
    if (photoUrl.startsWith("http")) return photoUrl;
    return getImageUrl(photoUrl, "users");
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 bg-gray-50">
        <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Daftar Postingan</h1>
          <div className="h-10 w-32 bg-blue-100 rounded-lg animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="border rounded-lg p-4 sm:p-5 bg-white shadow-md">
              <div className="animate-pulse ease-in-out flex flex-col space-y-4">
                <div className="rounded bg-blue-100 h-24 w-full"></div>
                <div className="h-6 bg-blue-100 rounded w-3/4"></div>
                <div className="h-4 bg-blue-100 rounded w-full"></div>
                <div className="h-4 bg-blue-100 rounded w-full"></div>
                <div className="flex space-x-3 justify-center">
                  <div className="h-8 bg-blue-100 rounded w-20"></div>
                  <div className="h-8 bg-blue-100 rounded w-20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 bg-gray-50">
        <div className="bg-red-50 shadow-md rounded-lg p-5 border border-red-200 text-red-900">
          <p className="font-bold text-lg">Error</p>
          <p className="text-base">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Daftar Postingan</h1>
        <button
          onClick={() => router.push("/admin/posts/create")}
          className="bg-blue-900 text-white py-2 px-5 rounded-lg hover:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-base w-full sm:w-auto text-center"
        >
          Tambah Postingan
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="bg-yellow-50 shadow-md rounded-lg p-5 border border-yellow-200 text-yellow-900">
          <p className="text-base">Tidak ada postingan yang ditemukan. Silakan tambah postingan baru.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {posts.map((post) => (
            <div key={post.id} className="border rounded-lg p-4 sm:p-5 bg-white shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <div className="w-full h-24 relative">
                  <Image src={getPostImageUrl(post.imageUrl)} alt={post.title} fill className="object-cover rounded" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mt-3">{post.title}</h2>
              </div>

              <p className="text-base text-gray-600 mb-4 line-clamp-3">{post.content}</p>

              <div className="flex items-center mt-4 mb-3 p-3 bg-blue-100 rounded-lg">
                <div className="w-8 h-8 sm:w-10 sm:h-10 relative mr-3">
                  <Image src={getUserAvatar(post.author.photo_url)} alt={post.author.name} fill className="object-cover rounded-full" />
                </div>
                <div>
                  <p className="font-medium text-base">{post.author.name}</p>
                  <p className="text-sm text-gray-600">Penulis</p>
                </div>
              </div>

              <div className="flex justify-between my-3">
                <div className="flex items-center">
                  <FileTextIcon size={16} className="text-blue-600 mr-1" />
                  <span className="text-sm font-medium text-gray-700">{post.category}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-700">{post.status}</span>
                </div>
              </div>

              <div className="mt-4 flex justify-center space-x-3">
                <button onClick={() => router.push(`/admin/posts/${post.id}`)} className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-base">
                  Detail
                </button>
                <button
                  onClick={() => router.push(`/admin/posts/${post.id}/edit`)}
                  className="bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-base"
                >
                  Edit
                </button>
                <button onClick={() => handleOpenDeleteModal(post)} className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-base">
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-5 sm:p-6 max-w-sm sm:max-w-md w-full shadow-xl">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Konfirmasi Hapus</h3>
            <p className="text-base text-gray-600 mb-6">Apakah Anda yakin ingin menghapus postingan "{postToDelete?.title}"? Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex justify-end space-x-3">
              <button onClick={handleCloseDeleteModal} className="py-2.5 px-5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                Batal
              </button>
              <button onClick={handleDeletePost} className="py-2.5 px-5 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostsPage;
