import prisma from "@/lib/prisma";
export async function getOrganizationStructures() {
  return await prisma.organizationStructure.findMany({
    include: {
      leader: { select: { name: true } },
      viceLeader: { select: { name: true } },
      secretary: { select: { name: true } },
      treasurer: { select: { name: true } },
    },
    orderBy: { academicYear: "desc" },
  });
}
