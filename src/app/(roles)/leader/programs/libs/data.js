import prisma from "@/lib/prisma";

import { getDivisionByLeaderId } from "../../members/libs/data";

export async function getAllProgramsByDivisionId() {
  const divisionId = await getDivisionByLeaderId();

  const programs = await prisma.program.findMany({
    where: {
      divisionId: divisionId,
    },
  });

  return programs;
}
