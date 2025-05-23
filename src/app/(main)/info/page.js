import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/app/(roles)/admin/posts/libs/data"; // Pastikan path ini benar
import { getImageUrl } from "@/lib/supabase"; // Pastikan path ini benar
import { format } from "date-fns";
import CategoryFilter from "./components/CategoryFilter"; // Pastikan path ini benar
import TimeFilter from "./components/TimeFilter"; // Pastikan path ini benar
import Pagination from "./components/Pagination"; // Tambahkan impor Pagination, pastikan path benar

export const metadata = {
  title: "Info & Berita | HIMSI SAINTEK UIN Raden Fatah Palembang",
  description: "Dapatkan informasi terkini, berita, pengumuman, dan update terbaru dari HIMSI SAINTEK UIN Raden Fatah Palembang. Tetap terhubung dengan perkembangan organisasi dan dunia teknologi informasi.",
};

const ITEMS_PER_PAGE = 3; // Jumlah artikel per halaman, sesuaikan jika perlu

// Fungsi untuk mendapatkan class warna berdasarkan kategori (tetap sama)
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

// Fungsi untuk mendapatkan label kategori dalam bahasa Indonesia (tetap sama)
const getCategoryLabel = (category) => {
  switch (category) {
    case "NEWS":
      return "Berita";
    case "ANNOUNCEMENT":
      return "Pengumuman";
    case "ARTICLE":
      return "Artikel";
    default:
      return category;
  }
};

// Fungsi untuk mendapatkan label filter waktu (disesuaikan dengan TimeFilter.js)
const getTimeFilterLabel = (timeFilter) => {
  switch (timeFilter) {
    case "TODAY":
      return "hari ini";
    case "THIS_WEEK":
      return "minggu ini";
    case "THIS_MONTH":
      return "bulan ini";
    case "THIS_YEAR":
      return "tahun ini";
    // Opsi "LAST_WEEK" dan "LAST_MONTH" tidak ada lagi di TimeFilter.js
    default:
      return ""; // Atau "semua waktu" jika filter adalah "ALL" tapi itu ditangani di JSX
  }
};

const PostsPage = async ({ searchParams }) => {
  const postsResponse = await getAllPosts();
  const selectedCategory = searchParams.category || "ALL";
  const selectedTimeFilter = searchParams.timeFilter || "ALL";
  const currentPage = parseInt(searchParams.page || "1", 10);

  // 1. Filter only PUBLISHED posts
  let filteredPosts =
    postsResponse?.success && postsResponse?.data?.length > 0
      ? {
          success: postsResponse.success,
          data: postsResponse.data.filter((post) => post.status === "PUBLISHED"),
        }
      : postsResponse;

  // 2. Apply category filter
  if (filteredPosts?.success && filteredPosts?.data?.length > 0 && selectedCategory !== "ALL") {
    filteredPosts = {
      success: filteredPosts.success,
      data: filteredPosts.data.filter((post) => post.category === selectedCategory),
    };
  }

  // 3. Apply time filter (disesuaikan dengan TimeFilter.js)
  if (filteredPosts?.success && filteredPosts?.data?.length > 0 && selectedTimeFilter !== "ALL") {
    const now = new Date();
    let startDate;

    switch (selectedTimeFilter) {
      case "TODAY":
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case "THIS_WEEK":
        const dayOfWeek = now.getDay(); // Sunday - Saturday : 0 - 6
        const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Monday as start of week
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - daysToSubtract);
        startDate.setHours(0, 0, 0, 0);
        break;
      case "THIS_MONTH":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case "THIS_YEAR":
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      // Tidak ada case untuk LAST_WEEK dan LAST_MONTH lagi
      default:
        // Jika ada nilai timeFilter yang tidak dikenal, anggap sebagai tidak ada filter waktu
        startDate = null;
        break;
    }

    if (startDate) {
      filteredPosts = {
        success: filteredPosts.success,
        data: filteredPosts.data.filter((post) => {
          const postDate = new Date(post.createdAt);
          return postDate >= startDate;
        }),
      };
    }
  }

  // 4. Sort posts by creation date (newest first)
  if (filteredPosts?.success && filteredPosts?.data?.length > 0) {
    filteredPosts.data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  // 5. Pagination logic
  const totalItems = filteredPosts?.success ? filteredPosts.data.length : 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const paginatedData = filteredPosts?.success && filteredPosts?.data?.length > 0 ? filteredPosts.data.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE) : [];

  const postsToDisplay = {
    success: filteredPosts?.success || false,
    data: paginatedData,
  };

  return (
    <div className="p-4 sm:p-6 mt-14 bg-gradient-to-b from-blue-50 via-white to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center sm:text-left">Info & Berita HIMSI</h1>

        {/* Filters */}
        <div className="mb-8 grid grid-cols-1 gap-4">
          <CategoryFilter />
          <TimeFilter />
        </div>

        {/* Posts Count and Filter Info */}
        {totalItems > 0 && (
          <div className="mb-6 p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-700">
              Menampilkan <span className="font-semibold">{postsToDisplay.data.length}</span> dari <span className="font-semibold">{totalItems}</span> artikel
              {selectedCategory !== "ALL" && ` dalam kategori "${getCategoryLabel(selectedCategory)}"`}
              {selectedTimeFilter !== "ALL" && ` untuk periode "${getTimeFilterLabel(selectedTimeFilter)}"`}.
            </p>
          </div>
        )}

        {/* Posts Grid */}
        {postsToDisplay?.success && postsToDisplay?.data?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {postsToDisplay.data.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48">
                  {post.imageUrl ? (
                    <Image src={getImageUrl(post.imageUrl, "posts")} alt={post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority={postsToDisplay.data.indexOf(post) < 3} /> // Prioritaskan gambar di atas fold
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="absolute top-2 left-2">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getCategoryColorClass(post.category)}`}>{getCategoryLabel(post.category)}</span>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 rounded text-xs font-medium bg-black bg-opacity-60 text-white">{format(new Date(post.createdAt), "dd MMM yyyy")}</span>
                  </div>
                </div>

                <div className="p-4 flex-grow flex flex-col">
                  <h2 className="text-lg font-semibold mb-2 line-clamp-2 hover:text-indigo-600 transition-colors duration-200">{post.title}</h2>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3 flex-grow">{post.content?.substring(0, 150)}...</p> {/* Ringkasan konten */}
                  <div className="flex items-center mb-3 text-xs text-gray-500">
                    <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                    </svg>
                    <span>{post.author?.name || "Penulis Tidak Dikenal"}</span>
                  </div>
                  {post.tags && post.tags.length > 0 && (
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">
                            #{tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && <span className="text-xs text-gray-500 px-1 py-0.5">+{post.tags.length - 3} lagi</span>}
                      </div>
                    </div>
                  )}
                  <div className="mt-auto">
                    {" "}
                    {/* Mendorong tombol ke bawah */}
                    <Link href={`/info/${post.id}`} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md font-medium text-sm transition-all duration-300 ease-in-out flex items-center justify-center group">
                      <span>Lihat Detail</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-600 text-lg mb-2 font-medium">Tidak ada artikel yang ditemukan</p>
              <p className="text-gray-500 text-sm">
                {selectedCategory !== "ALL" || selectedTimeFilter !== "ALL" ? "Coba ubah filter pencarian atau pilih periode waktu yang berbeda." : "Saat ini belum ada artikel yang dipublikasikan. Silakan cek kembali nanti."}
              </p>
            </div>
          </div>
        )}

        {/* Pagination Component */}
        {totalItems > 0 && totalPages > 1 && (
          <div className="mt-10">
            <Pagination currentPage={currentPage} totalPages={totalPages} totalItems={totalItems} itemsPerPage={ITEMS_PER_PAGE} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsPage;
