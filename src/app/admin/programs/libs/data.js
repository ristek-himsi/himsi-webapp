import prisma from "@/lib/prisma";

export async function getAllPrograms() {
  const programs = await prisma.program.findMany({
    include: {
      division: true,
    },
  });
  return programs;
}

export async function getProgramById(id) {
  try {
    const program = await prisma.program.findFirst({
      where: {
        id,
      },
      include: {
        division: true,
      },
    });
    return program;
  } catch (e) {
    console.error("Error fetching program by ID:", e);
    return null;
  }
}
