// src/components/NewsCard.js
import Link from 'next/link';
import Image from 'next/image';

// Asumsikan getImageUrl ada di lib atau utils
import { getImageUrl } from '@/lib/supabase';

const NewsCard = ({ post }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "Tanggal tidak tersedia";
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const publishDate = formatDate(post?.publishedAt || post?.createdAt);
  const postTitle = post?.title || "Judul Berita Tidak Tersedia";
  const postCategory = post?.category;
  const postExcerpt = post?.excerpt || (post?.content ? post?.content.substring(0, 120) + "..." : "Tidak ada ringkasan konten.");
  const postAuthorName = post?.author?.name || "Penulis Anonim";
  const postAuthorAvatar = post?.author?.avatarUrl;
  const postId = post?.id || "#";
  const postImageUrl = post?.imageUrl;


  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full group transform hover:-translate-y-1">
      {/* Tinggi gambar disesuaikan: h-48 di mobile, sm:h-52, md:h-56 */}
      <div className="h-48 sm:h-52 md:h-56 relative overflow-hidden">
        <Image
          src={getImageUrl(postImageUrl, "posts")} // Pastikan bucket "posts" sesuai
          alt={postTitle}
          layout="fill"
          objectFit="cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="group-hover:scale-105 transition-transform duration-500 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
        {postCategory && (
          <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 bg-indigo-600 text-white px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold shadow-md uppercase tracking-wider">
            {postCategory}
          </div>
        )}
      </div>
      {/* Padding konten disesuaikan: p-4 di mobile, sm:p-5 */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        <h3 className="font-bold text-lg sm:text-xl mb-1.5 sm:mb-2 text-gray-800 group-hover:text-indigo-600 transition-colors duration-300 line-clamp-2">
          {postTitle}
        </h3>
        <div className="flex items-center text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 text-indigo-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          <span>Dipublikasikan pada {publishDate}</span>
        </div>
        <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4 line-clamp-3 flex-grow">
          {postExcerpt}
        </p>
        <div className="flex items-center mt-auto pt-3 sm:pt-4 border-t border-gray-100">
          <div className="flex items-center flex-1 min-w-0"> {/* min-w-0 untuk mencegah overflow teks author */}
            {postAuthorAvatar ? (
              <Image src={postAuthorAvatar} alt={postAuthorName} width={28} height={28} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full mr-2 object-cover flex-shrink-0" />
            ) : (
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-300 rounded-full mr-2 flex items-center justify-center text-gray-500 text-[10px] sm:text-xs flex-shrink-0">
                {postAuthorName ? postAuthorName.charAt(0).toUpperCase() : 'P'}
              </div>
            )}
            <span className="text-xs sm:text-sm font-medium text-gray-700 line-clamp-1">{postAuthorName}</span>
          </div>
          <Link
            href={postId === "#" ? "#" : `/info/${postId}`} // Pastikan path /info/ sesuai
            className={`inline-flex items-center text-indigo-600 hover:text-indigo-800 text-xs sm:text-sm font-semibold group-hover:underline whitespace-nowrap ${postId === "#" ? "pointer-events-none opacity-50" : ""}`}
          >
            Baca <span className="hidden sm:inline ml-1">Selengkapnya</span> <span aria-hidden="true" className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;