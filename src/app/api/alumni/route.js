import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const alumni = await prisma.alumni.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: alumni }, { status: 200 });
  } catch (error) {
    console.error("Error fetching alumni:", error);
    return NextResponse.json({ success: false, message: "Gagal memuat data alumni: " + error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request) {
  try {
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

    // Check for duplicate email
    const existingAlumni = await prisma.alumni.findUnique({
      where: { email },
    });
    if (existingAlumni) {
      return NextResponse.json({ success: false, message: "Email sudah terdaftar" }, { status: 400 });
    }

    const alumni = await prisma.alumni.create({
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

    return NextResponse.json({ success: true, data: alumni, message: "Alumni berhasil ditambahkan" }, { status: 201 });
  } catch (error) {
    console.error("Error creating alumni:", error);
    if (error.code === "P2002") {
      return NextResponse.json({ success: false, message: "Email sudah terdaftar" }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: "Gagal menambahkan alumni: " + error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
