import React from "react";
import { getUser } from "@/lib/auth";
import { getMemberPosts } from "./libs/data";
import { getImageUrl } from "@/lib/supabase";
import Link from "next/link";

const page = async () => {
  const { user } = await getUser();
  const posts = await getMemberPosts(user?.id);

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-6xl">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Daftar Draft Ajuan Artikel</h1>
        <p className="text-sm md:text-base text-gray-600">Artikel yang belum disetujui dan masih dalam status draft</p>
      </div>

      {posts.success ? (
        <div className="space-y-4 md:space-y-6">
          {posts.data.length > 0 ? (
            posts.data.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {/* Mobile Layout */}
                <div className="block md:hidden">
                  {/* Image Section - Full width on mobile */}
                  <div className="w-full h-48 relative">
                    <img src={getImageUrl(post.imageUrl, "posts")} alt={post.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">{post.status}</span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{post.title}</h2>

                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                      <span>Kategori: {post.category}</span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.content.length > 150 ? `${post.content.substring(0, 150)}...` : post.content}</p>

                    <div className="space-y-3">
                      <div className="text-xs text-gray-500">
                        <p>
                          Dibuat:{" "}
                          {new Date(post.createdAt).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Link href={`/member/my-posts/edit/${post.id}`}>
                          <button className="flex-1 px-3 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">Edit</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:flex">
                  {/* Image Section */}
                  <div className="w-48 lg:w-56 h-32 lg:h-36 flex-shrink-0">
                    <img src={getImageUrl(post.imageUrl, "posts")} alt={post.title} className="w-full h-full object-cover" />
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-4 lg:p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 pr-4">
                        <h2 className="text-lg lg:text-xl font-semibold text-gray-800 mb-2 line-clamp-2">{post.title}</h2>
                        <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
                          <span>Kategori: {post.category}</span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">{post.status}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm lg:text-base mb-4 line-clamp-2 lg:line-clamp-3">{post.content.length > 200 ? `${post.content.substring(0, 200)}...` : post.content}</p>

                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="text-xs lg:text-sm text-gray-500">
                        <p>
                          Dibuat:{" "}
                          {new Date(post.createdAt).toLocaleDateString("id-ID", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                        <p className="hidden lg:block">
                          Diupdate:{" "}
                          {new Date(post.updatedAt).toLocaleDateString("id-ID", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Link href={`/member/my-posts/edit/${post.id}`}>
                          <button className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">Edit</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 md:py-12">
              <div className="bg-gray-50 rounded-lg p-6 md:p-8 mx-4 md:mx-0">
                <svg className="mx-auto h-10 w-10 md:h-12 md:w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">Belum Ada Draft Artikel</h3>
                <p className="text-sm md:text-base text-gray-500 mb-4">Anda belum memiliki artikel dalam status draft.</p>
                <button className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm md:text-base">Buat Artikel Baru</button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8 md:py-12">
          <div className="bg-red-50 rounded-lg p-6 md:p-8 mx-4 md:mx-0">
            <svg className="mx-auto h-10 w-10 md:h-12 md:w-12 text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.966-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 className="text-base md:text-lg font-medium text-red-900 mb-2">Gagal Memuat Data</h3>
            <p className="text-sm md:text-base text-red-600">Terjadi kesalahan saat memuat daftar artikel draft.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
