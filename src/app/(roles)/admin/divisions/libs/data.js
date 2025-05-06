"use server";

import prisma from "@/lib/prisma";

export async function getAllDivisions() {
  try {
    // Ambil semua data divisi beserta relasi yang diperlukan
    const divisions = await prisma.division.findMany({
      include: {
        leader: {
          select: {
            id: true,
            name: true,
            email: true,
            photo_url: true,
            position: true,
            role: true,
          },
        },
        users: {
          select: {
            id: true,
            name: true,
            role: true,
            position: true,
          },
        },
        programs: true,
      },
    });

    // Transformasi data untuk frontend
    const transformedDivisions = divisions.map((division) => {
      // Filter users untuk mendapatkan anggota divisi saja (bukan leader)
      // Perhatikan: dalam skema, tidak ada role MEMBER, jadi yang dihitung
      // adalah semua user yang terdaftar dalam divisi
      // (Jika perlu filter khusus, bisa ditambahkan di sini)

      return {
        id: division.id,
        name: division.name,
        description: division.description,
        logoUrl: division.logoUrl,
        vision: division.vision,
        mission: division.mission,
        leader: division.leader,
        memberCount: division.users.length,
        programCount: division.programs.length,
        createdAt: division.createdAt,
        updatedAt: division.updatedAt,
      };
    });

    return transformedDivisions;
  } catch (e) {
    console.error("Error fetching divisions:", e.message);
    throw new Error("Failed to fetch divisions");
  }
}

// Tambahan fungsi untuk mendapatkan detail satu divisi dengan data lebih lengkap
export async function getDivisionDetail(id) {
  try {
    const division = await prisma.division.findUnique({
      where: { id: parseInt(id) },
      include: {
        leader: {
          select: {
            id: true,
            name: true,
            email: true,
            photo_url: true,
            position: true,
            role: true,
          },
        },
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            photo_url: true,
            position: true,
            role: true,
          },
        },
        programs: true,
        achievements: true,
      },
    });

    if (!division) {
      throw new Error("Division not found");
    }

    return division;
  } catch (e) {
    console.error("Error fetching division detail:", e.message);
    throw new Error("Failed to fetch division detail");
  }
}
