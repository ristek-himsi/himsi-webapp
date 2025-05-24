"use server";
import prisma from "@/lib/prisma";
import { deleteFile, uploadImage } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function updateDivisionByLeaderAction(_, formData, divisionId) {
  try {
    // Extract form data
    const description = formData.get("description");
    const mission = formData.get("mission");
    const vision = formData.get("vision");
    const logoFile = formData.get("logo");
    const leaderId = formData.get("leaderId");

    // Validate required fields - hanya description yang wajib diisi
    if (!description) {
      return { message: "Deskripsi wajib diisi" };
    }

    // Get existing division to check if we need to update the logo
    const existingDivision = await prisma.division.findUnique({
      where: { id: parseInt(divisionId) },
      select: { logoUrl: true },
    });

    if (!existingDivision) {
      return { message: "Divisi tidak ditemukan" };
    }

    // Prepare data for division update
    const divisionData = {
      description,
      mission: mission || null,
      vision: vision || null,
    };

    // Handle logo upload if provided
    if (logoFile && logoFile.size > 0) {
      // Check file size
      if (logoFile.size > MAX_FILE_SIZE) {
        return { message: `Ukuran file terlalu besar. Maksimum ${MAX_FILE_SIZE / (1024 * 1024)}MB.` };
      }

      try {
        const fileName = await uploadImage(logoFile, "divisi");
        divisionData.logoUrl = fileName;

        if (existingDivision.logoUrl) {
          try {
            await deleteFile(existingDivision.logoUrl, "divisi");
            console.log("Old image deleted successfully");
          } catch (deleteError) {
            console.error("Error deleting old image:", deleteError);
            // Continue with the update even if deletion fails
          }
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        return { message: "Gagal mengupload logo. Silakan coba lagi." };
      }
    }

    // Handle leader connection/disconnection
    if (leaderId && leaderId !== "") {
      divisionData.leader = {
        connect: { id: parseInt(leaderId) },
      };
    } else {
      // Jika tidak ada leader yang dipilih, hapus relasi dengan leader sebelumnya
      divisionData.leader = { disconnect: true };
    }

    // Update division in database
    await prisma.division.update({
      where: { id: parseInt(divisionId) },
      data: divisionData,
    });

    // Revalidate paths
    revalidatePath(`/leader/division/${divisionId}`);

    // Return success response
    return {
      success: true,
      redirectUrl: `/leader/division/${divisionId}`,
      message: "Divisi berhasil diperbarui!",
    };
  } catch (error) {
    console.error("Error updating division:", error);

    // Handle unique constraint violations
    if (error.code === "P2002") {
      if (error.meta?.target?.includes("name")) {
        return { message: "Nama divisi sudah digunakan. Silakan gunakan nama lain." };
      }
      if (error.meta?.target?.includes("leader_id")) {
        return { message: "Leader yang dipilih sudah memimpin divisi lain." };
      }
    }

    return { message: `Terjadi kesalahan: ${error.message}` };
  }
}
