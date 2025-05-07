"use server";

import prisma from "@/lib/prisma";

export async function getAllAchievements() {
  try {
    const achievements = await prisma.achievement.findMany({
      include: {
        division: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return achievements;
  } catch (e) {
    console.error("Error fetching achievements:", e.message);
    throw new Error("Failed to fetch achievements");
  }
}

export async function getAchievementDetail(id) {
  try {
    const achievement = await prisma.achievement.findUnique({
      where: { id: parseInt(id) },
      include: {
        division: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!achievement) {
      throw new Error("Achievement not found");
    }

    return achievement;
  } catch (e) {
    console.error("Error fetching achievement detail:", e.message);
    throw new Error("Failed to fetch achievement detail");
  }
}
