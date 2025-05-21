import { NextResponse } from "next/server";
import { getAllEvents } from "@/app/(roles)/admin/events/libs/data";

export async function GET() {
  try {
    const events = await getAllEvents();
    return NextResponse.json({
      data: events,
      success: true,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        message: "gagal mengambil seluruh events",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
