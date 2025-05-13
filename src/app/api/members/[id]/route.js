// /app/api/members/[id]/route.js - adding GET and PUT methods
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth, getUser } from "@/lib/auth";
import { uploadImage, getImageUrl, deleteFile, extractFilenameFromUrl } from "@/lib/supabase";

// GET handler to fetch a member by ID
export async function GET(request, { params }) {
  try {
    // Get the current user
    const { session } = await getUser();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id } = params;
    const userId = parseInt(id);
    // Fetch user with division info
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        division: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (!user) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }
    // Check permissions
    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
    });
    // Admin can view any user
    // Division leader can only view members from their division
    if (currentUser.role !== "ADMIN" && !(currentUser.role === "DIVISION_LEADER" && user.divisionId === currentUser.divisionId)) {
      return NextResponse.json({ error: "Permission denied" }, { status: 403 });
    }
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching member:", error);
    return NextResponse.json({ error: "Failed to fetch member", details: error.message }, { status: 500 });
  }
}

// PUT handler to update a member
export async function PUT(request, { params }) {
  try {
    // Get the current user
    const { session } = await getUser();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id } = params;
    const userId = parseInt(id);

    // Prepare FormData
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const position = formData.get("position");
    const divisionId = formData.get("divisionId") ? parseInt(formData.get("divisionId")) : null;
    const role = formData.get("role");
    const photo = formData.get("photo");

    // Get the existing user
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
      include: { division: true },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    // Check permissions
    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    // Check role-based permissions
    const isAdmin = currentUser.role === "ADMIN";
    const isDivisionLeader = currentUser.role === "DIVISION_LEADER";
    const isManagingSameDivision = isDivisionLeader && existingUser.divisionId === currentUser.divisionId;
    const isUpdatingSelf = currentUser.id === userId;

    // Only admins can change roles
    if (role !== existingUser.role && !isAdmin) {
      return NextResponse.json({ error: "Only administrators can change member roles" }, { status: 403 });
    }

    // Division leaders can only edit members in their division
    if (!isAdmin && !isUpdatingSelf && (!isDivisionLeader || !isManagingSameDivision)) {
      return NextResponse.json({ error: "Permission denied" }, { status: 403 });
    }

    // Handle file upload if photo is provided
    let photoUrl = existingUser.photo_url;
    if (photo && photo.size > 0) {
      try {
        // Delete existing photo if it exists
        if (existingUser.photo_url) {
          const existingFilename = extractFilenameFromUrl(existingUser.photo_url);
          if (existingFilename) {
            await deleteFile(existingFilename, "users").catch((err) => console.warn("Failed to delete old photo:", err));
          }
        }

        // Upload new photo
        const fileName = await uploadImage(photo, "users");
        photoUrl = fileName;
      } catch (uploadError) {
        console.error("Error uploading file:", uploadError);
        return NextResponse.json({ error: "Failed to upload photo", details: uploadError.message }, { status: 500 });
      }
    }

    // Prepare update data
    const updateData = {
      name,
      email,
      ...(position !== undefined && { position }),
      ...(divisionId && { divisionId }),
      ...(role && { role }),
      ...(photoUrl && { photo_url: photoUrl }),
      updatedAt: new Date(),
    };

    // Check if updating to Division Leader and there's already a leader for that division
    if (role === "DIVISION_LEADER" && divisionId) {
      const existingLeader = await prisma.user.findFirst({
        where: {
          divisionId: divisionId,
          role: "DIVISION_LEADER",
          id: { not: userId }, // Exclude the current user
        },
      });

      if (existingLeader) {
        return NextResponse.json({ error: "This division already has a leader. Please change the existing leader's role first." }, { status: 400 });
      }
    }

    // Update the user in the database
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      include: {
        division: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json({
      message: "Member updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating member:", error);
    return NextResponse.json({ error: "Failed to update member", details: error.message }, { status: 500 });
  }
}

// DELETE handler to delete a member
export async function DELETE(request, { params }) {
  try {
    // Get the current user
    const { session } = await getUser();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const userId = parseInt(id);

    // Get the body if any
    const body = await request.json().catch(() => ({}));
    const { divisionId } = body;

    // Check if user exists
    const userToDelete = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        ledDivision: true,
      },
    });

    if (!userToDelete) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    // Check if user is trying to delete a division leader
    if (userToDelete.role === "DIVISION_LEADER") {
      return NextResponse.json({ error: "Cannot delete a division leader. Please change the division leader first." }, { status: 403 });
    }

    // Check if current user has permission to delete this member
    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    // Admin can delete any user
    // Division leader can only delete members from their division
    if (currentUser.role !== "ADMIN" && !(currentUser.role === "DIVISION_LEADER" && userToDelete.divisionId === currentUser.divisionId)) {
      return NextResponse.json({ error: "Permission denied" }, { status: 403 });
    }

    // Soft delete the user (set deletedAt field)
    const deletedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        deletedAt: new Date(),
        // Optionally remove from division
        divisionId: null,
      },
    });

    return NextResponse.json({ message: "Member deleted successfully", user: deletedUser }, { status: 200 });
  } catch (error) {
    console.error("Error deleting member:", error);
    return NextResponse.json({ error: "Failed to delete member", details: error.message }, { status: 500 });
  }
}
