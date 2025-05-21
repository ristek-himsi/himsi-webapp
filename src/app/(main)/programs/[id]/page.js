import React from "react";
import { getProgramById } from "@/app/(roles)/admin/programs/libs/data";
import { ProgramDetailCard } from "../components/ProgramDetailCard";

const ProgramDetailPage = async ({ params }) => {
  const id = parseInt(params.id);
  const program = await getProgramById(id);

  return (
    <div className="max-w-7xl mt-10 mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ProgramDetailCard program={program} />
    </div>
  );
};

export default ProgramDetailPage;
