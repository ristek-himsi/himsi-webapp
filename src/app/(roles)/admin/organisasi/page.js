import { Suspense } from "react";
import Loading from "@/app/loading";
import OrganizationStructureClient from "./components/OrganizationStructureClient";
import { getOrganizationStructures } from "./libs/data";

export default function OrganizationStructurePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<Loading />}>
        <OrganizationStructureServerWrapper />
      </Suspense>
    </div>
  );
}

// Server wrapper component
async function OrganizationStructureServerWrapper() {
  const structures = await getOrganizationStructures();

  return <OrganizationStructureClient structures={structures} />;
}
