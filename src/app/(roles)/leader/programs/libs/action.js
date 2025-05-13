"use server";

import prisma from "@/lib/prisma";
import { uploadImage } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";
import { deleteFile } from "@/lib/supabase";

export async function addProgramByLeaderAction(_, formData) {
  try {
    const name = formData.get("name");
    const divisionId = parseInt(formData.get("divisionId"));
    const description = formData.get("description");
    const photo = formData.get("photo");
    const status = formData.get("status");
    const start_date = formData.get("start_date");
    const end_date = formData.get("end_date");

    let logoUrl;
    if (photo) {
      try {
        const fileName = await uploadImage(photo, "programs");
        logoUrl = fileName;
      } catch (error) {
        console.error("Error uploading image:", error);
        return { message: "Gagal mengupload logo. Silakan coba lagi." };
      }
    } else {
      // Provide default logo if none uploaded
      logoUrl = "users/default-user.png";
    }

    // Convert date strings to proper DateTime objects
    const startDateTime = new Date(start_date);
    const endDateTime = new Date(end_date);

    const programData = {
      name,
      divisionId,
      description,
      imageUrl: logoUrl,
      status,
      startDate: startDateTime,
      endDate: endDateTime,
    };

    await prisma.program.create({
      data: programData,
    });

    // Revalidate the divisions page to show new data
    revalidatePath("/leader/programs");

    // Return success status and redirect URL untuk diproses di client
    return {
      success: true,
      redirectUrl: "/leader/programs",
      message: "Program berhasil dibuat!",
    };
  } catch (e) {
    console.log(e);
    return {
      message: "Ada yang salah di tambah programs bro",
      success: false, // Fixed typo from "succes" to "success"
    };
  }
}

export async function deleteProgramByLeaderAction(_, formData, id) {
  try {
    const programId = parseInt(id);

    // Validasi ID
    if (isNaN(programId)) {
      return {
        success: false,
        message: "ID program tidak valid.",
      };
    }

    // Cek apakah program ada
    const program = await prisma.program.findUnique({
      where: { id: programId },
    });

    if (!program) {
      return {
        success: false,
        message: "Program tidak ditemukan.",
      };
    }

    // Lakukan penghapusan
    await prisma.program.delete({
      where: { id: programId },
    });

    if (program.imageUrl) {
      try {
        // Hapus file dari storage dengan path yang sesuai
        await deleteFile(program.imageUrl, "programs");
        console.log(`Berhasil menghapus gambar: ${program.imageUrl}`);
      } catch (imageError) {
        console.error("Error deleting image from storage:", imageError);
        // Lanjutkan proses meskipun penghapusan gambar gagal
      }
    }

    revalidatePath("/leader/programs");
    return {
      success: true,
      redirectUrl: "/leader/programs",
      message: "Berhasil menghapus program.",
    };
  } catch (e) {
    console.error("Error deleting program:", e);
    return {
      success: false,
      message: "Gagal menghapus program: " + e.message,
    };
  }
}

const MAX_FILE_SIZE = 1024 * 1024;

export async function editProgramByLeaderAction(prevState, formData, id) {
  try {
    // Extract form data
    const name = formData.get("name");
    const description = formData.get("description");
    const status = formData.get("status");
    const startDate = formData.get("startDate");
    const endDate = formData.get("endDate");
    const photoFile = formData.get("photo");

    // Form validation
    if (!name || !description || !status || !startDate || !endDate) {
      return { message: "Semua field wajib diisi" };
    }

    // Get existing program to check current image
    const existingProgram = await prisma.program.findUnique({
      where: { id: parseInt(id) },
      select: { imageUrl: true, divisionId: true },
    });

    if (!existingProgram) {
      return { message: "Program tidak ditemukan" };
    }

    // Prepare program data for update
    const programData = {
      name,
      description,
      status,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    };

    // Handle image upload if a new file is provided
    if (photoFile && photoFile.size > 0) {
      // Check file size
      if (photoFile.size > MAX_FILE_SIZE) {
        return { message: `Ukuran file terlalu besar. Maksimum ${MAX_FILE_SIZE / 1024}KB.` };
      }

      try {
        // Upload new image
        const fileName = await uploadImage(photoFile, "programs");
        programData.imageUrl = fileName;

        // Delete old image if it exists
        if (existingProgram.imageUrl) {
          try {
            await deleteFile(existingProgram.imageUrl, "programs");
            console.log("Old image deleted successfully");
          } catch (deleteError) {
            console.error("Error deleting old image:", deleteError);
            // Continue with the update even if deletion fails
          }
        }
      } catch (uploadError) {
        console.error("Error uploading image:", uploadError);
        return { message: "Gagal mengupload gambar. Silakan coba lagi." };
      }
    }

    // Update program in database
    await prisma.program.update({
      where: { id: parseInt(id) },
      data: programData,
    });

    // Revalidate paths to refresh cache
    revalidatePath(`/leader/programs/${id}`);
    revalidatePath("/leader/programs");

    return {
      success: true,
      redirectUrl: `/leader/programs`,
      message: "Program berhasil diperbarui!",
    };
  } catch (error) {
    console.error("Error updating program:", error);
    return { message: `Terjadi kesalahan: ${error.message}` };
  }
}
