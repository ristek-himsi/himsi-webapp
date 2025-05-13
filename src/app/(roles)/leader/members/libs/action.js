"use server";
import { uploadImage } from "@/lib/supabase";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";

export async function addMemberAction(_, formData) {
  try {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const photo = formData.get("photo");
    const role = formData.get("role");
    const divisionId = parseInt(formData.get("divisionId"));
    const position = formData.get("position");

    let logoUrl;
    if (photo) {
      // Check file size

      try {
        const fileName = await uploadImage(photo, "users");
        logoUrl = fileName;
      } catch (error) {
        console.error("Error uploading image:", error);
        return { message: "Gagal mengupload logo. Silakan coba lagi." };
      }
    } else {
      // Provide default logo if none uploaded
      logoUrl = "users/default-user.png";
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare data for division creation
    const userData = {
      name,
      email,
      password: hashedPassword,
      photo_url: logoUrl,
      role,
      divisionId,
      position,
    };

    // Add leader if selected

    // Create division in database
    await prisma.user.create({
      data: userData,
    });

    // Revalidate the divisions page to show new data
    revalidatePath("/leader/members");

    // Return success status and redirect URL untuk diproses di client
    return {
      success: true,
      redirectUrl: "/leader/members",
      message: "Divisi berhasil dibuat!",
    };
  } catch (e) {
    console.log(e);
    return {
      message: "Ada yang salah di tambah user bro",
    };
  }
}

export async function editMemberAction(_, formData, id) {
  const position = formData.get("position");

  // Validasi apakah posisi sudah digunakan oleh user lain
  const existingUser = await prisma.user.findFirst({
    where: {
      position: position,
      id: {
        not: parseInt(id), // Pengecualian untuk user yang sedang diedit
      },
      deletedAt: null,
    },
  });

  // Jika sudah ada user dengan posisi yang sama
  if (existingUser) {
    return {
      message: `Posisi "${position}" sudah digunakan oleh ${existingUser.name}`,
    };
  }

  // Jika belum ada user dengan posisi yang sama, lanjutkan proses update
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        position: position,
      },
    });

    revalidatePath("/leader/members");

    return {
      success: true,
      redirectUrl: "/leader/members",
      message: "Berhasil mengubah posisi user",
    };
  } catch (error) {
    console.error("Error updating user position:", error);
    return {
      error: "Gagal mengubah posisi user",
    };
  }
}

export async function deleteMemberAction(_, formData, id) {
  try {
    // Update the user to set divisionId to null
    await prisma.user.update({
      where: { id: Number(id) },
      data: { divisionId: null },
    });

    // Revalidate the members page to update the UI
    revalidatePath("/leader/members");

    return { message: "Member removed from division successfully", success: true, redirectUrl: "/leader/members" };
  } catch (error) {
    console.error("Error removing member from division:", error);
    return { message: "Failed to remove member from division" };
  }
}
