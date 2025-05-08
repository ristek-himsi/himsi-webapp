import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const data = await request.json();
    const { name, email, bio, positionInHimsi, profileImage, graduationYear, entryYear, currentJob, company, linkedinUrl } = data;

    // Validate required fields
    if (!name || !email || !bio || !positionInHimsi || !profileImage || !graduationYear || !entryYear || !currentJob || !company || !linkedinUrl) {
      return NextResponse.json({ success: false, message: "Semua kolom wajib diisi" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, message: "Format email tidak valid" }, { status: 400 });
    }

    // Validate positionInHimsi is valid JSON
    if (typeof positionInHimsi !== "object") {
      return NextResponse.json({ success: false, message: "Position in HIMSI harus berupa objek JSON yang valid" }, { status: 400 });
    }

    // Validate years are numbers
    if (isNaN(graduationYear) || isNaN(entryYear)) {
      return NextResponse.json({ success: false, message: "Tahun kelulusan dan tahun masuk harus berupa angka" }, { status: 400 });
    }

    // Check if alumni exists
    const existingAlumni = await prisma.alumni.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (!existingAlumni) {
      return NextResponse.json({ success: false, message: "Alumni tidak ditemukan" }, { status: 404 });
    }

    // Check for duplicate email (excluding current alumni)
    const emailConflict = await prisma.alumni.findFirst({
      where: {
        email,
        id: { not: parseInt(id, 10) },
      },
    });
    if (emailConflict) {
      return NextResponse.json({ success: false, message: "Email sudah terdaftar oleh alumni lain" }, { status: 400 });
    }

    const updatedAlumni = await prisma.alumni.update({
      where: { id: parseInt(id, 10) },
      data: {
        name,
        email,
        bio,
        positionInHimsi,
        profileImage,
        graduationYear: parseInt(graduationYear, 10),
        entryYear: parseInt(entryYear, 10),
        currentJob,
        company,
        linkedinUrl,
      },
    });

    return NextResponse.json({ success: true, data: updatedAlumni, message: "Alumni berhasil diperbarui" }, { status: 200 });
  } catch (error) {
    console.error("Error updating alumni:", error);
    if (error.code === "P2002") {
      return NextResponse.json({ success: false, message: "Email sudah terdaftar" }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: "Gagal memperbarui alumni: " + error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    // Check if alumni exists
    const existingAlumni = await prisma.alumni.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (!existingAlumni) {
      return NextResponse.json({ success: false, message: "Alumni tidak ditemukan" }, { status: 404 });
    }

    await prisma.alumni.delete({
      where: { id: parseInt(id, 10) },
    });

    return NextResponse.json({ success: true, message: "Alumni berhasil dihapus" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting alumni:", error);
    return NextResponse.json({ success: false, message: "Gagal menghapus alumni: " + error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
