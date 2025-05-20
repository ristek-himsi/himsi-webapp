import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/app/(roles)/admin/posts/libs/data";
import { getImageUrl } from "@/lib/supabase";
import { format } from "date-fns";
import CategoryFilter from "./components/CategoryFilter";

const PostsPage = async ({ searchParams }) => {
  const posts = await getAllPosts();
  const selectedCategory = searchParams.category || "ALL";

  // Filter only PUBLISHED posts
  const publishedPosts =
    posts?.success && posts?.data?.length > 0
      ? {
          success: posts.success,
          data: posts.data.filter((post) => post.status === "PUBLISHED"),
        }
      : posts;

  // Apply category filter
  const filteredPosts =
    publishedPosts?.success && publishedPosts?.data?.length > 0
      ? {
          success: publishedPosts.success,
          data: selectedCategory === "ALL" ? publishedPosts.data : publishedPosts.data.filter((post) => post.category === selectedCategory),
        }
      : publishedPosts;

  return (
    <div className="p-4 sm:p-6 mt-14 bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Halaman Info</h1>

      {/* Category Filter (Client Component) */}
      <CategoryFilter />

      {/* Check if posts exist and have data */}
      {filteredPosts?.success && filteredPosts?.data?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredPosts.data.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
              {/* Post Image */}
              <div className="relative h-48">
                {post.imageUrl ? (
                  <Image src={getImageUrl(post.imageUrl, "posts")} alt={post.title} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColorClass(post.category)}`}>{post.category}</span>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-4 flex-grow flex flex-col">
                <h2 className="text-xl font-semibold mb-2 line-clamp-2">{post.title}</h2>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.content}</p>

                {/* Author Info */}
                <div className="flex items-center mb-4">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden mr-3">
                    {post.author.photo_url ? (
                      <Image src={getImageUrl(post.author.photo_url, "users")} alt={post.author.name} width={32} height={32} className="rounded-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-500 text-xs">No Pic</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{post.author.name}</p>
                    <p className="text-xs text-gray-500">{post.author.email}</p>
                  </div>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Timestamps */}
                <div className="text-xs text-gray-500 space-y-1 mt-auto mb-4">
                  <p>Dibuat: {format(new Date(post.createdAt), "dd MMM yyyy, HH:mm")}</p>
                </div>

                {/* Detail Button */}
                <Link href={`/info/${post.id}`} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md font-medium text-sm transition duration-300 ease-in-out flex items-center justify-center">
                  <span>Lihat Detail</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Tidak ada posts yang tersedia</p>
        </div>
      )}
    </div>
  );
};

// Fungsi untuk mendapatkan class warna berdasarkan kategori
const getCategoryColorClass = (category) => {
  switch (category) {
    case "NEWS":
      return "bg-blue-100 text-blue-800";
    case "ANNOUNCEMENT":
      return "bg-green-100 text-green-800";
    case "ARTICLE":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default PostsPage;
