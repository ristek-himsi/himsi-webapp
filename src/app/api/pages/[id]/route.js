import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
  try {
    const page = await prisma.page.findFirst({
      where: { id: parseInt(params.id) },
    });
    if (!page) {
      return NextResponse.json({ success: false, message: "Page not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: page });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error fetching page: " + error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const page = await prisma.page.update({
      where: { id: parseInt(params.id) },
      data: {
        title: body.title,
        slug: body.slug,
        content: body.content,
        isPublished: body.isPublished,
      },
    });
    return NextResponse.json({ success: true, data: page });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error updating page: " + error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await prisma.page.delete({
      where: { id: parseInt(params.id) },
    });
    return NextResponse.json({ success: true, message: "Page deleted" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error deleting page: " + error.message }, { status: 500 });
  }
}
