// /app/api/members/add/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/auth";
import { uploadImage } from "@/lib/supabase";

export async function POST(request) {
  try {
    // Get the current user
    const { session } = await getUser();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Prepare FormData
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const position = formData.get("position");
    const divisionId = formData.get("divisionId") ? parseInt(formData.get("divisionId")) : null;
    const role = formData.get("role") || "MEMBER";
    const photo = formData.get("photo");

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    // Check permissions
    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    const isAdmin = currentUser.role === "ADMIN";
    const isDivisionLeader = currentUser.role === "DIVISION_LEADER";

    // Check if current user has permission to add members
    if (!isAdmin && !isDivisionLeader) {
      return NextResponse.json({ error: "Permission denied" }, { status: 403 });
    }

    // Division leaders can only add members to their division
    if (isDivisionLeader && divisionId !== currentUser.divisionId) {
      return NextResponse.json({ error: "Division leaders can only add members to their own division" }, { status: 403 });
    }

    // Non-admins cannot add users with ADMIN role
    if (!isAdmin && role === "ADMIN") {
      return NextResponse.json({ error: "Only administrators can add new admins" }, { status: 403 });
    }

    // Check if a user with this email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "A user with this email already exists" }, { status: 400 });
    }

    // Check if adding a Division Leader and there's already a leader for that division
    if (role === "DIVISION_LEADER" && divisionId) {
      const existingLeader = await prisma.user.findFirst({
        where: {
          divisionId: divisionId,
          role: "DIVISION_LEADER",
        },
      });

      if (existingLeader) {
        return NextResponse.json(
          {
            error: "This division already has a leader. Please change the existing leader's role first.",
          },
          { status: 400 }
        );
      }
    }

    // Handle file upload if photo is provided
    let photoUrl = null;
    if (photo && photo.size > 0) {
      try {
        const fileName = await uploadImage(photo, "users");
        photoUrl = fileName;
      } catch (uploadError) {
        console.error("Error uploading file:", uploadError);
        return NextResponse.json({ error: "Failed to upload photo", details: uploadError.message }, { status: 500 });
      }
    }

    // Create user in database
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        position: position || "",
        role,
        divisionId,
        photo_url: photoUrl,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      include: {
        division: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: "Member added successfully",
        user: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding member:", error);
    return NextResponse.json({ error: "Failed to add member", details: error.message }, { status: 500 });
  }
}
