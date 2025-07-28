import React, { Suspense } from "react";
import { ProgramFilterWrapper } from "./components/ProgramFilterWrapper";
import { getAllPrograms } from "@/app/(roles)/admin/programs/libs/data";
import Loading from "@/app/loading";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Program & Kegiatan | HIMSI SAINTEK UIN Raden Fatah Palembang",
  description: "Jelajahi berbagai program unggulan dan kegiatan rutin HIMSI SAINTEK UIN Raden Fatah Palembang. Mulai dari program akademik, pengembangan soft skill, pengabdian masyarakat, hingga program kerja sama strategis.",
};

// Komponen yang berisi konten utama
const ProgramContent = async () => {
  const programs = await getAllPrograms();

  return <ProgramFilterWrapper initialPrograms={programs} />;
};

// Server Component utama
const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      {/* Header Section - Mobile First */}
      <div className="px-3 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-12 pb-4 sm:pb-6 mt-14">
        <div className="max-w-7xl mx-auto">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">Program Kegiatan</h1>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto sm:mx-0">Jelajahi berbagai program kegiatan yang kami selenggarakan</p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <Suspense fallback={<Loading />}>
        <ProgramContent />
      </Suspense>
    </div>
  );
};

export default Page;
