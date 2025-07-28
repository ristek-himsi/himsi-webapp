import React from "react";
import { getDivisionById } from "../libs/data";
import Image from "next/image";
import { getImageUrl } from "@/lib/supabase";
import Link from "next/link";

const page = async ({ params }) => {
  const id = parseInt(params.id);
  const division = await getDivisionById(id);

  // Handle jika division tidak ditemukan
  if (!division) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-red-600">Division tidak ditemukan</h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">Division dengan ID {id} tidak ada.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            {/* Logo Division */}
            <div className="flex-shrink-0 mx-auto sm:mx-0">
              <Image src={getImageUrl(division.logoUrl, "divisi")} alt={`Logo ${division.name}`} width={80} height={80} className="sm:w-[120px] sm:h-[120px] rounded-lg object-cover" />
            </div>

            {/* Info Division */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">{division.name}</h1>
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg mb-3 sm:mb-4">{division.description}</p>
            </div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          {/* Vision */}
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Visi
            </h2>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{division.vision && division.vision !== "-" ? division.vision : "Visi belum ditetapkan"}</p>
          </div>

          {/* Mission */}
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Misi
            </h2>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{division.mission && division.mission !== "-" ? division.mission : "Misi belum ditetapkan"}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-4 sm:mt-6">
          <Link href={`/leader/division/${division.id}/edit`} className="flex-1 sm:flex-none">
            <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base font-medium">Edit Divisi</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
