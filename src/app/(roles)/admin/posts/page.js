"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getImageUrl } from "@/lib/supabase";
import { FileTextIcon } from "lucide-react";
import DeletePostForm from "./components/DeletePostForm";
import Loading from "@/app/loading";

// Loading component with skeleton UI

// Content component with actual data
const PostsContent = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
    // This shouldn't show because of Suspense, but keeping it as a fallback
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 sm:py-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Daftar Postingan</h1>
          <button
            onClick={() => router.push("/admin/posts/create")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 w-full sm:w-auto text-center cursor-pointer"
          >
            Tambah Postingan
          </button>
        </div>

        {error && (
          <div className="bg-red-50 p-4 rounded-lg shadow-sm mb-6">
            <p className="text-red-600 text-sm font-medium">{error}</p>
          </div>
        )}

        {posts.length === 0 ? (
          <div className="bg-yellow-50 p-4 rounded-lg shadow-sm border border-yellow-200 text-yellow-800">
            <p className="text-sm font-medium">Tidak ada postingan yang ditemukan. Silakan tambah postingan baru.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-xl shadow-sm p-4 sm:p-5 hover:shadow-md transition-shadow duration-200">
                <div className="mb-4">
                  <div className="w-full h-24 sm:h-32 relative rounded-lg overflow-hidden">
                    <Image src={getPostImageUrl(post?.imageUrl)} alt={post.title} fill style={{ objectFit: "cover" }} className="transition-transform duration-300 hover:scale-105" />
                  </div>
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900 mt-3 line-clamp-2">{post.title}</h2>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{post.content}</p>

                <div className="flex items-center mb-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 relative mr-2">
                    <Image src={getUserAvatar(post?.author?.photo_url)} alt={post.author.name} fill style={{ objectFit: "cover" }} className="rounded-full" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
                    <p className="text-xs text-gray-500">Penulis</p>
                  </div>
                </div>

                <div className="flex justify-between mb-3 text-sm text-gray-600">
                  <div className="flex items-center">
                    <FileTextIcon size={14} className="text-blue-600 mr-1" />
                    <span>{post.category}</span>
                  </div>
                  <div className="flex items-center">
                    <span>{post.status}</span>
                  </div>
                </div>

                <div className="flex flex-row justify-center gap-2">
                  <button onClick={() => router.push(`/admin/posts/${post.id}/edit`)} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 w-1/2 cursor-pointer">
                    Edit
                  </button>
                  <DeletePostForm id={post?.id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Main component with Suspense
const PostsPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <PostsContent />
    </Suspense>
  );
};

export default PostsPage;
