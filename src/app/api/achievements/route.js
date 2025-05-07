import { NextResponse } from "next/server";
import { getAllAchievements } from "@/app/(roles)/admin/achievements/libs/data";

export async function GET() {
  try {
    const achievements = await getAllAchievements();
    return NextResponse.json({ success: true, data: achievements });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error fetching achievements: " + error.message }, { status: 500 });
  }
}

export async function POST(request) {
  return NextResponse.json({ success: false, message: "Use server action for creating achievements" }, { status: 400 });
}
