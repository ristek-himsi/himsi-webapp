import React from "react";
import Image from "next/image";
import { getAllPosts } from "@/app/(roles)/admin/posts/libs/data";
import { getImageUrl } from "@/lib/supabase";
import { format } from "date-fns";

const PostsPage = async () => {
  const posts = await getAllPosts();
  console.log(posts);

  return (
    <div className="p-6 mt-14">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Halaman Info</h1>

      {/* Check if posts exist and have data */}
      {posts?.success && posts?.data?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.data.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Post Image */}
              <div className="relative h-48">
                {post.imageUrl ? (
                  <Image src={getImageUrl(post.imageUrl, "posts")} alt={post.title} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${post.status === "PUBLISHED" ? "bg-green-100 text-green-800" : post.status === "DRAFT" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"}`}>
                    {post.status}
                  </span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-2 left-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">{post.category}</span>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-4">
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
                <div className="text-xs text-gray-500 space-y-1">
                  <p>Dibuat: {format(new Date(post.createdAt), "dd MMM yyyy, HH:mm")}</p>
                  <p>Diupdate: {format(new Date(post.updatedAt), "dd MMM yyyy, HH:mm")}</p>
                  {post.publishedAt && <p>Dipublikasi: {format(new Date(post.publishedAt), "dd MMM yyyy, HH:mm")}</p>}
                </div>
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

export default PostsPage;
