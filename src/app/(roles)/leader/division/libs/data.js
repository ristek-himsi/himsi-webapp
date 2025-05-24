import prisma from "@/lib/prisma";

export async function getDivisionById(id) {
  try {
    const division = await prisma.division.findUnique({
      where: {
        id: id,
      },
    });
    return division;
  } catch (e) {
    console.error(e);
    return {
      message: "gagalm mengambil data divisi by id",
    };
  }
}
