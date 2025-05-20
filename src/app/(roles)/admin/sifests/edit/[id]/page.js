import React from "react";
import { getSifestById } from "../../libs/data";

// Import the EditSifestForm component
import EditSifestForm from "../../components/EditSifestForm";

const EditSifestPage = async ({ params }) => {
  const id = parseInt(params.id);
  const sifest = await getSifestById(id);

  return (
    <div className="container mx-auto py-8 px-4">
      <EditSifestForm sifest={sifest} />
    </div>
  );
};

export default EditSifestPage;
