import React from "react";
import { getAllDivisions } from "../../divisions/libs/data";
import ProgramForm from "@/components/admin/ProgramForm";

const Page = async () => {
  const divisions = await getAllDivisions();

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Tambah Program</h1>
      <ProgramForm divisions={divisions} />
    </div>
  );
};

export default Page;
