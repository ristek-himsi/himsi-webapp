import prisma from "@/lib/prisma";

export async function getAchievemntByDivisionId(id) {
  try {
    // Gunakan findMany untuk mendapatkan semua achievement dalam divisi
    const achievements = await prisma.achievement.findMany({
      where: {
        divisionId: id,
      },
      orderBy: {
        createdAt: "desc", // Urutkan berdasarkan tanggal dibuat (terbaru dulu)
      },
    });

    return achievements; // Return array (bisa kosong [] jika tidak ada data)
  } catch (e) {
    console.error("Error fetching achievements:", e);
    return []; // Return empty array jika error, bukan object
  }
}
