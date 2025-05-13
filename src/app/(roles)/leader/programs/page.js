export const dynamic = "force-dynamic";

import React from "react";
import { getAllProgramsByDivisionId } from "./libs/data";
import Link from "next/link";
import { Plus } from "lucide-react";
import ProgramCardLeader from "@/components/admin/ProgramCardLeader";

const ProgramsByDivisionPage = async () => {
  const programs = await getAllProgramsByDivisionId();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Programs by Division</h1>

        <Link href="/leader/programs/create" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-medium py-2 px-3 sm:px-4 rounded-lg transition-colors duration-200 whitespace-nowrap">
          <Plus size={18} className="flex-shrink-0" />
          <span>Add Program</span>
        </Link>
      </div>

      {programs && programs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {programs.map((program) => (
            <ProgramCardLeader key={program.id} program={program} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8 text-center mt-4">
          <p className="text-gray-600 text-base sm:text-lg mb-4">No programs found for this division.</p>
          <Link href="/admin/programs/create" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-medium py-2 px-3 sm:px-4 rounded-lg transition-colors duration-200">
            <Plus size={16} className="flex-shrink-0" />
            <span>Create your first program</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProgramsByDivisionPage;
