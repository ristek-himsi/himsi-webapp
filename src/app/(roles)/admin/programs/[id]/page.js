import ProgramDetail from "@/components/admin/ProgramDetail";
import React from "react";
import { getProgramById } from "../libs/data";

const Page = async ({ params }) => {
  const id = parseInt(params.id);

  const program = await getProgramById(id);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Detail Program</h1>
        <ProgramDetail program={program} />
      </div>
    </div>
  );
};

export default Page;
