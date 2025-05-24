import prisma from "@/lib/prisma";

export async function getAllSifest() {
  try {
    const sifests = await prisma.sIFest.findMany({
      include: {
        events: true,
      },
    });
    return sifests;
  } catch (e) {
    console.error(e);
    return {
      message: "gagal mengambil data seluruh sifest",
    };
  }
}

export async function getSifestById(id) {
  try {
    const sifest = await prisma.sIFest.findUnique({
      where: {
        id: id,
      },
    });
    return sifest;
  } catch (e) {
    console.error(e);
    return {
      message: "gagal mengabil data si fest by id",
    };
  }
}

export async function getSifestDetail(id) {
  try {
    const sifest = await prisma.sIFest.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        events: {
          include: {
            gallery: true,
          },
          orderBy: {
            startDate: "asc",
          },
        },
      },
    });

    return sifest;
  } catch (e) {
    console.error(e);
    return {
      message: "gagal mengambil detail sifest",
    };
  }
}
