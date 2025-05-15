import { NextResponse } from "next/server";
import { getAllUser } from "@/lib/admin/data/users";
import { getUser } from "@/lib/auth";

export async function GET() {
  try {
    const users = await getAllUser();
    return NextResponse.json({
      success: true,
      data: users,
    });
  } catch (e) {
    console.error("gagal mengambil data users");
    return NextResponse.json(
      {
        success: false,
        message: "failed fetch users data",
      },
      {
        status: 500,
      }
    );
  }
}
