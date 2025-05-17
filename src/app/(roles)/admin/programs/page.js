import { ProgramsPage } from "@/components/admin/ProgramPage";
import { getAllPrograms } from "./libs/data";
import prisma from "@/lib/prisma";
import { Suspense } from "react";
import Loading from "@/app/loading";
// Loading component to show while data is being fetched

// Content component that fetches and renders the actual data
const ProgramsContent = async () => {
  const programs = await getAllPrograms();

  // Get all divisions for filter dropdown
  const divisions = await prisma.division.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return <ProgramsPage programs={programs} divisions={divisions} />;
};

const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ProgramsContent />
    </Suspense>
  );
};

export default Page;
