import React, { Suspense } from "react";
import { ProgramFilterWrapper } from "./components/ProgramFilterWrapper";
import { getAllPrograms } from "@/app/(roles)/admin/programs/libs/data";
import Loading from "@/app/loading";

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
    <div className="max-w-7xl mt-9 mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <div className="">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Program Kegiatan</h1>
        <p className="text-gray-600">Jelajahi berbagai program kegiatan yang kami selenggarakan</p>
      </div>

      <Suspense fallback={<Loading />}>
        <ProgramContent />
      </Suspense>
    </div>
  );
};

export default Page;
