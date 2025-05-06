import React from "react";
import { getAllDivisions } from "../../divisions/libs/data";
import ProgramForm from "@/components/admin/ProgramForm";

const Page = async () => {
  const divisions = await getAllDivisions();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Halaman Tambah Programs Berdasarkan Divisi</h1>

      <ProgramForm divisions={divisions} />
    </div>
  );
};

export default Page;
