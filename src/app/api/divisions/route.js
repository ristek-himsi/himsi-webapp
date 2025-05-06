import { NextResponse } from "next/server";
import { getAllDivisions } from "@/app/admin/divisions/libs/data";

export async function GET() {
  try {
    const divisions = await getAllDivisions();
    return NextResponse.json({
      success: true,
      data: divisions,
    });
  } catch (e) {
    console.error("masalah saat pengmbilan seluruh data divisi dari api", e);
    return NextResponse.json(
      {
        success: false,
        message: "failed to fetch divisions data",
      },
      { status: 500 }
    );
  }
}
