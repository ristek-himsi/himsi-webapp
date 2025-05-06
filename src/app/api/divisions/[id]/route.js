import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ success: false, message: "ID divisi tidak valid" }, { status: 400 });
    }

    const division = await prisma.division.findFirst({
      where: { id },
      include: {
        leader: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        // members: {
        //   select: {
        //     id: true,
        //     name: true,
        //     email: true,
        //     joinedAt: true,
        //   },
        // },
      },
    });

    if (!division) {
      return NextResponse.json({ success: false, message: "Divisi tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: division });
  } catch (error) {
    console.error("Error fetching division:", error);
    return NextResponse.json({ success: false, message: `Terjadi kesalahan: ${error.message}` }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ success: false, message: "ID divisi tidak valid" }, { status: 400 });
    }

    // Pastikan divisi ada sebelum menghapus
    const existingDivision = await prisma.division.findUnique({
      where: { id },
    });

    if (!existingDivision) {
      return NextResponse.json({ success: false, message: "Divisi tidak ditemukan" }, { status: 404 });
    }

    // Hapus divisi
    await prisma.division.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Divisi berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting division:", error);

    // Jika error terjadi karena kendala relasi
    if (error.code === "P2003") {
      return NextResponse.json(
        {
          success: false,
          message: "Tidak dapat menghapus divisi karena masih memiliki ketergantungan data",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: false, message: `Terjadi kesalahan: ${error.message}` }, { status: 500 });
  }
}
