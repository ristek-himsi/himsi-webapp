import prisma from "@/lib/prisma";

export async function getAllSifest() {
  try {
    const sifests = await prisma.sIFest.findMany({});
    return sifests;
  } catch (e) {
    console.error(e);
    return {
      message: "gagal mengambil data seluruh sifest",
    };
  }
}
