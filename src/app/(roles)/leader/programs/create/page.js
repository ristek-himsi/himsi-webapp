export const dynamic = "force-dynamic";

import React from "react";
import { getDivisionByLeaderId } from "../../members/libs/data";
import { getDivisionNameByLeaderId } from "../../members/add/libs/data";
import AddProgramLeaderForm from "@/components/admin/AddProgramLeaderForm";

const Page = async () => {
  const divisionId = await getDivisionByLeaderId();
  const divisionName = await getDivisionNameByLeaderId();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Tambah Program Divisi</h1>

      <AddProgramLeaderForm divisionId={divisionId} divisionName={divisionName} />
    </div>
  );
};

export default Page;
