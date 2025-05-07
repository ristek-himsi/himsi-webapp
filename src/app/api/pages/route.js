import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const pages = await prisma.page.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: pages });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error fetching pages: " + error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const page = await prisma.page.create({
      data: {
        title: body.title,
        slug: body.slug,
        content: body.content,
        isPublished: body.isPublished,
      },
    });
    return NextResponse.json({ success: true, data: page });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error creating page: " + error.message }, { status: 500 });
  }
}
