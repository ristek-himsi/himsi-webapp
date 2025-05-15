import { getUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const { user } = await getUser();

  try {
    const userData = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    return NextResponse.json({
      data: userData,
      success: true,
      message: "berhasil mengambil user data by id",
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      message: "gagal mengambil user data by id",
    });
  }
}
