import ProgramDetail from "@/components/admin/ProgramDetail";
import React from "react";
import { getProgramById } from "../libs/data";

const page = async ({ params }) => {
  const id = parseInt(params.id);

  const program = await getProgramById(id);

  return (
    <div>
      <h1>Halaman detail programs</h1>
      <ProgramDetail program={program} />
    </div>
  );
};

export default page;
