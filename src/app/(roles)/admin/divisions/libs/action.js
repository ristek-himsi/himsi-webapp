"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { deleteFile, uploadImage } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

// Konfigurasi ukuran file maksimum (500KB)
const MAX_FILE_SIZE = 500 * 1024; // 500KB dalam bytes

export async function addDivisionAction(prevState, formData) {
  try {
    // Extract form data
    const name = formData.get("name");
    const description = formData.get("description");
    const mission = formData.get("mission");
    const vision = formData.get("vision");
    const logoFile = formData.get("logoUrl");
    const leaderId = formData.get("leaderId");

    // Validate required fields
    if (!name || !description || !mission || !vision) {
      return { message: "Semua field wajib diisi kecuali pemimpin divisi" };
    }

    // Handle logo upload
    let logoUrl;
    if (logoFile && logoFile.size > 0) {
      // Check file size
      if (logoFile.size > MAX_FILE_SIZE) {
        return { message: `Ukuran file terlalu besar. Maksimum ${MAX_FILE_SIZE / 1024}KB.` };
      }

      try {
        const fileName = await uploadImage(logoFile, "divisi");
        logoUrl = fileName;
      } catch (error) {
        console.error("Error uploading image:", error);
        return { message: "Gagal mengupload logo. Silakan coba lagi." };
      }
    } else {
      // Provide default logo if none uploaded
      logoUrl = "divisi/default-division.png";
    }

    // Prepare data for division creation
    const divisionData = {
      name,
      description,
      mission,
      vision,
      logoUrl,
    };

    // Add leader if selected
    if (leaderId && leaderId !== "") {
      divisionData.leader = {
        connect: { id: parseInt(leaderId) },
      };
    }

    // Create division in database
    await prisma.division.create({
      data: divisionData,
    });

    // Revalidate the divisions page to show new data
    revalidatePath("/admin/divisions");

    // Return success status and redirect URL untuk diproses di client
    return {
      success: true,
      redirectUrl: "/admin/divisions",
      message: "Divisi berhasil dibuat!",
    };
  } catch (error) {
    console.error("Error creating division:", error);

    // Handle unique constraint violations
    if (error.code === "P2002") {
      if (error.meta?.target?.includes("name")) {
        return { message: "Nama divisi sudah digunakan. Silakan gunakan nama lain." };
      }
      if (error.meta?.target?.includes("id")) {
        // ID conflict - ini biasanya tidak terjadi karena Prisma menggunakan autoincrement
        // Mari coba lagi tanpa ID eksplisit
        return { message: "Terjadi konflik ID. Silakan coba lagi." };
      }
      if (error.meta?.target?.includes("leader_id")) {
        return { message: "Leader yang dipilih sudah memimpin divisi lain." };
      }
    }

    return { message: `Terjadi kesalahan: ${error.message}` };
  }
}

export async function updateDivisionAction(prevState, formData, divisionId) {
  try {
    // Extract form data
    const name = formData.get("name");
    const description = formData.get("description");
    const mission = formData.get("mission");
    const vision = formData.get("vision");
    const logoFile = formData.get("logoUrl");
    const leaderId = formData.get("leaderId");

    // Validate required fields
    if (!name || !description || !mission || !vision) {
      return { message: "Semua field wajib diisi kecuali pemimpin divisi" };
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
      name,
      description,
      mission,
      vision,
    };

    // Handle logo upload if provided
    if (logoFile && logoFile.size > 0) {
      // Check file size
      if (logoFile.size > MAX_FILE_SIZE) {
        return { message: `Ukuran file terlalu besar. Maksimum ${MAX_FILE_SIZE / 1024}KB.` };
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
    revalidatePath(`/admin/divisions/${divisionId}`);
    revalidatePath("/admin/divisions");

    // Return success response
    return {
      success: true,
      redirectUrl: `/admin/divisions/${divisionId}`,
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
