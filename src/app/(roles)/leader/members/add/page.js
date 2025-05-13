export const dynamic = "force-dynamic";

import React from "react";
import { getDivisionByLeaderId } from "../libs/data";
import { getDivisionNameByLeaderId } from "./libs/data";
import AddMemberForm from "@/components/admin/AddMemberForm";

const Page = async () => {
  const divisionId = await getDivisionByLeaderId();
  const divisionName = await getDivisionNameByLeaderId();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Sleek header with minimalist design */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Tambah Anggota</h1>
          <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-indigo-500 mr-2"></span>
            Divisi {divisionName}
          </div>
        </div>

        {/* Modern card with subtle shadow */}
        <div className="bg-white backdrop-blur-sm bg-opacity-80 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100">
          {/* Smooth internal spacing */}
          <div className="p-1">
            <AddMemberForm divisionId={divisionId} divisionName={divisionName} />
          </div>
        </div>

        {/* Subtle footer note */}
        <div className="mt-6 flex justify-center">
          <div className="flex items-center text-xs text-slate-500">
            <svg className="w-4 h-4 mr-1 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Data anggota akan langsung tersimpan ke sistem
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
