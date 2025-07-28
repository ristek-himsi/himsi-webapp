// src/components/DivisionCard.js
import Image from 'next/image';
import Link from 'next/link';
import { UsersIcon, PuzzlePieceIcon } from '@heroicons/react/24/solid';

// Asumsikan getImageUrl ada di lib atau utils
import { getImageUrl } from '@/lib/supabase';

const DivisionCard = ({ division }) => {
  const divisionName = division?.name || "Nama Divisi";
  // Di sini, Anda mungkin punya field 'iconUrl' atau 'logoUrl'. Saya gunakan 'logoUrl' dari kode Anda.
  const divisionLogoUrl = division?.logoUrl; 
  const divisionDescription = division?.description || "Deskripsi divisi belum tersedia.";
  const memberCount = division?.memberCount || 0;
  const programCount = division?.programCount || 0;
  const divisionSlugOrId = division?.slug || division?.id || "#";

  // Mencoba mengambil URL gambar, jika gagal atau tidak ada, akan null
  const actualImageUrl = getImageUrl(divisionLogoUrl, "divisi"); // Pastikan bucket "divisi" sesuai

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full group transform hover:-translate-y-1 overflow-hidden">
      {/* Area Ikon/Logo: tinggi disesuaikan, h-32 di mobile, sm:h-36, md:h-40 */}
      <div className="relative h-32 sm:h-36 md:h-40 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center overflow-hidden">
        {actualImageUrl ? (
          <div className="relative w-full h-full">
            <Image 
              src={actualImageUrl} 
              alt={`${divisionName} logo`} 
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Overlay untuk memberikan efek hover */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-all duration-300"></div>
          </div>
        ) : (
          // Fallback jika tidak ada logo: Inisial nama divisi
          <>
            <span className="text-4xl sm:text-5xl font-bold text-white opacity-80 group-hover:opacity-100 transition-opacity z-10">
              {divisionName ? divisionName.charAt(0).toUpperCase() : '?'}
            </span>
            {/* Overlay halus (opsional) */}
            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-all duration-300"></div>
          </>
        )}
      </div>
      
      {/* Konten Teks: padding disesuaikan, p-4 di mobile, sm:p-5, md:p-6 */}
      <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
        <h3 className="font-bold text-lg sm:text-xl text-gray-800 group-hover:text-blue-600 transition-colors duration-300 mb-1.5 sm:mb-2">
          {divisionName}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-3 md:line-clamp-4 flex-grow">
          {divisionDescription}
        </p>
        {/* Info Anggota & Program: ukuran font dan ikon disesuaikan */}
        <div className="mt-auto pt-3 sm:pt-4 border-t border-gray-100 space-y-1.5 sm:space-y-2">
          <div className="flex items-center text-xs sm:text-sm text-gray-500">
            <UsersIcon className="h-4 w-4 sm:h-4.5 sm:w-4.5 mr-1.5 text-blue-500 flex-shrink-0" />
            <span>{memberCount} Anggota</span>
          </div>
          <div className="flex items-center text-xs sm:text-sm text-gray-500">
            <PuzzlePieceIcon className="h-4 w-4 sm:h-4.5 sm:w-4.5 mr-1.5 text-blue-500 flex-shrink-0" />
            <span>{programCount} Program Kerja</span>
          </div>
        </div>
      </div>
      
      {/* Tombol Link: padding dan ukuran font disesuaikan */}
      <Link 
        href={divisionSlugOrId === "#" ? "#" : `/divisi/${divisionSlugOrId}`} 
        className={`block bg-gray-50 group-hover:bg-blue-50 text-center py-2.5 sm:py-3 px-4 sm:px-6 text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${divisionSlugOrId === "#" ? "pointer-events-none opacity-50" : ""}`}
      >
        Pelajari Lebih Lanjut
      </Link>
    </div>
  );
};

export default DivisionCard;