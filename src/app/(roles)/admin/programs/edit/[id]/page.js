import EditProgramForm from "@/components/admin/EditProgramForm";
import React from "react";
import { getAllDivisions } from "@/app/(roles)/admin/divisions/libs/data";
import { getProgramById } from "../../libs/data";

const page = async ({ params }) => {
  const id = params.id;

  const program = await getProgramById(parseInt(id));
  const divisions = await getAllDivisions();

  return (
    <div>
      <h1 className="text-center my-2 text-xl sm:text-2xl font-semibold">Halaman edit program</h1>
      <EditProgramForm program={program} divisions={divisions} />
    </div>
  );
};

export default page;
