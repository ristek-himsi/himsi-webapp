import { NextResponse } from "next/server";
import { getAchievementDetail } from "@/app/(roles)/admin/achievements/libs/data";
import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
  try {
    const achievement = await getAchievementDetail(params.id);
    return NextResponse.json({ success: true, data: achievement });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error fetching achievement: " + error.message }, { status: error.message.includes("not found") ? 404 : 500 });
  }
}

export async function PUT(request, { params }) {
  return NextResponse.json({ success: false, message: "Use server action for updating achievements" }, { status: 400 });
}

export async function DELETE(request, { params }) {
  try {
    const achievement = await prisma.achievement.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!achievement) {
      return NextResponse.json({ success: false, message: "Achievement not found" }, { status: 404 });
    }

    await prisma.achievement.delete({
      where: { id: parseInt(params.id) },
    });

    return NextResponse.json({ success: true, message: "Achievement deleted" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error deleting achievement: " + error.message }, { status: 500 });
  }
}
