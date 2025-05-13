"use server";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const sifests = await prisma.sIFest.findMany({
      select: {
        id: true,
        year: true,
        theme: true,
      },
      orderBy: {
        year: "desc",
      },
    });

    return NextResponse.json(sifests, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        message: "gagal mengambil data sifest",
      },
      {
        status: 500,
      }
    );
  }
}
