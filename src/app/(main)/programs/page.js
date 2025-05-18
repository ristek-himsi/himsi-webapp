import React, { Suspense } from "react";
import { ProgramCard } from "./components/ProgramCard";
import { getAllPrograms } from "@/app/(roles)/admin/programs/libs/data";

// Komponen Loading untuk menampilkan skeleton saat data sedang dimuat
const ProgramSkeleton = () => {
  // Buat array dengan 6 item untuk menampilkan 6 skeleton card
  const skeletonItems = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {skeletonItems.map((index) => (
        <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
          <div className="h-48 w-full bg-gray-200"></div>
          <div className="p-5">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="flex items-center mb-3">
              <div className="h-4 w-4 rounded-full bg-gray-200 mr-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5 mb-4"></div>
            <div className="flex items-center justify-between">
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="flex items-center">
                <div className="h-4 bg-gray-200 rounded w-16 mr-1"></div>
                <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Komponen yang berisi konten utama, akan di-wrap dengan Suspense
const ProgramContent = async () => {
  const programs = await getAllPrograms();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {programs.map((program) => (
        <ProgramCard key={program.id} program={program} />
      ))}
    </div>
  );
};

// Server Component utama
const Page = () => {
  return (
    <div className="max-w-7xl mt-9 mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Program Kegiatan</h1>
        <p className="text-gray-600">Jelajahi berbagai program kegiatan yang kami selenggarakan</p>
      </div>

      <Suspense fallback={<ProgramSkeleton />}>
        <ProgramContent />
      </Suspense>
    </div>
  );
};

export default Page;
