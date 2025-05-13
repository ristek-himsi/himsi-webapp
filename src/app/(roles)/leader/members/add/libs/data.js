import prisma from "@/lib/prisma";
import { getUser } from "@/lib/auth";

export async function getDivisionNameByLeaderId() {
  const { session } = await getUser();
  const id = session.userId;
  try {
    const divisionName = await prisma.division.findFirst({
      where: {
        leaderId: id,
      },
    });

    return divisionName.name;
  } catch (e) {
    console.error(e);
  }
}
