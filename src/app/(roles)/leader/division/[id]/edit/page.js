import React from "react";
import { getDivisionById } from "../../libs/data";
import EditDivisionForm from "../../components/EditDivisionForm";

const page = async ({ params }) => {
  const id = parseInt(params.id);
  const division = await getDivisionById(id);

  // Handle jika division tidak ditemukan
  if (!division) {
    return (
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-red-600">Division tidak ditemukan</h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">Division dengan ID {id} tidak ada.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 break-words">Edit Divisi: {division.name}</h1>
          <p className="text-gray-600 text-sm sm:text-base">Ubah informasi divisi dan simpan perubahan</p>
        </div>

        {/* Client Component Form */}
        <EditDivisionForm division={division} />
      </div>
    </div>
  );
};

export default page;
