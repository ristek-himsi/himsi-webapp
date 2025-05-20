import React, { Suspense } from "react";
import { getAllDivisions } from "@/app/(roles)/admin/divisions/libs/data";
import DivisionCard from "./components/DivisionCard";
import Loading from "@/app/loading";

// Server Component untuk fetch data
const DivisionsContent = async () => {
  const divisions = await getAllDivisions();
  const totalDivisions = divisions.length;

  return (
    <>
      {/* Info jumlah divisi */}
      <div className="mb-6 bg-white rounded-lg shadow-md p-4">
        <p className="text-center text-gray-700">
          Total <span className="font-semibold">{totalDivisions}</span> divisi
        </p>
      </div>

      {/* Divisi Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {divisions.map((division) => (
          <DivisionCard key={division.id} division={division} />
        ))}
      </div>
    </>
  );
};

// Main Page Component dengan Suspense
const DivisionsPage = () => {
  return (
    <div className="p-6 mt-14 bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-center">Divisi Organisasi</h1>
        <p className="text-gray-600 text-center mt-2">Mengenal berbagai divisi dalam organisasi kami</p>
      </div>

      <Suspense fallback={<Loading />}>
        <DivisionsContent />
      </Suspense>
    </div>
  );
};

export default DivisionsPage;
