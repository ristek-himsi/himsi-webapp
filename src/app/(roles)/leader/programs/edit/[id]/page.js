import React from "react";
import { getProgramById } from "@/app/(roles)/admin/programs/libs/data";
import { getImageUrl } from "@/lib/supabase";
import EditProgramForm from "@/components/leader/EditProgramForm";

const Page = async ({ params }) => {
  const id = parseInt(params.id);
  const program = await getProgramById(id);

  const programImagePreview = getImageUrl(program?.imageUrl, "programs");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Program</h1>

      <EditProgramForm program={program} programImagePreview={programImagePreview} />
    </div>
  );
};

export default Page;
