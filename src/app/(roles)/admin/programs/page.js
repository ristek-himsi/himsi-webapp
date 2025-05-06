import { ProgramsPage } from "@/components/admin/ProgramPage";
import { getAllPrograms } from "./libs/data";

const Page = async () => {
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

export default Page;
