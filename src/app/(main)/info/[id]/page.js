import React from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { getPostDetail } from "@/app/(roles)/admin/posts/libs/data";
import { getImageUrl } from "@/lib/supabase";

const PostDetailPage = async ({ params }) => {
  const id = params.id;
  const postResponse = await getPostDetail(id);

  if (!postResponse?.success || !postResponse?.data) {
    return (
      <div className="container mx-auto px-4 py-8 mt-10">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold text-sm sm:text-base">Error!</strong>
          <span className="block sm:inline text-sm sm:text-base"> Tidak dapat menemukan post dengan ID ini.</span>
        </div>
      </div>
    );
  }

  const post = postResponse.data;

  // Function to format content paragraphs
  const formatContent = (content) => {
    if (!content) return [];
    return content.split(/\r\n\r\n|\n\n/).filter((para) => para.trim().length > 0);
  };

  const paragraphs = formatContent(post.content);

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

  return (
    <div className="container mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 mt-14 sm:mt-14">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Post Header */}
        <div className="relative">
          {/* Featured Image */}
          <div className="w-full h-40 sm:h-48 md:h-64 lg:h-80 relative">
            {post.imageUrl ? (
              <Image src={getImageUrl(post.imageUrl, "posts")} alt={post.title} fill className="object-cover" priority />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-xs sm:text-sm">No Image Available</span>
              </div>
            )}
          </div>

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className={`px-2 py-1 rounded-md text-xs sm:text-sm font-medium ${getCategoryColorClass(post.category)}`}>{post.category}</span>
          </div>
        </div>

        {/* Post Content */}
        <div className="p-3 sm:p-5 lg:p-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">{post.title}</h1>

          {/* Author and Date */}
          <div className="flex items-center mb-4 sm:mb-6 border-b border-gray-200 pb-3 sm:pb-4">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden mr-2 sm:mr-3">
              {post.author?.photo_url ? (
                <Image src={getImageUrl(post.author.photo_url, "users")} alt={post.author.name} width={40} height={40} className="rounded-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-500 text-xs">No Pic</span>
                </div>
              )}
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium">{post.author?.name || "Unknown Author"}</p>
              <p className="text-xs text-gray-500 text-[10px] sm:text-xs">
                {post.publishedAt ? `Diterbitkan: ${format(new Date(post.publishedAt), "dd MMMM yyyy, HH:mm")}` : `Dibuat: ${format(new Date(post.createdAt), "dd MMMM yyyy, HH:mm")}`}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="prose max-w-none text-gray-700">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags Section */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-gray-200">
              <h3 className="text-base sm:text-lg font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {post.tags.map((tag, index) => (
                  <span key={index} className="bg-purple-100 text-purple-800 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 sm:mt-8 text-xs sm:text-sm text-gray-500 flex flex-col sm:flex-row sm:justify-between">
            <p>ID Post: {post.id}</p>
            <p>Terakhir diubah: {format(new Date(post.updatedAt), "dd MMMM yyyy, HH:mm")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
