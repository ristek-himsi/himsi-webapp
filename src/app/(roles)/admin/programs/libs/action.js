"use server";

import { getImageUrl, uploadImage } from "@/lib/supabase";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Add a new program
 */
export async function addProgramAction(prevState, formData) {
  try {
    // Extract data from FormData
    const name = formData.get("name");
    const description = formData.get("description");
    const status = formData.get("status");
    const divisionId = parseInt(formData.get("divisionId"));
    const startDate = new Date(formData.get("startDate"));
    const endDate = new Date(formData.get("endDate"));

    // Validasi data
    if (!name || !description || !status || !divisionId || !startDate || !endDate) {
      return {
        message: "Semua field wajib diisi",
        error: true,
        success: false,
      };
    }

    // Handle file upload
    const imageFile = formData.get("image");
    let imageUrl = null;

    if (imageFile && imageFile.size > 0) {
      try {
        // Upload gambar ke Supabase menggunakan fungsi yang sudah ada
        const fileName = await uploadImage(imageFile, "programs");

        // Dapatkan URL publik gambar
        imageUrl = getImageUrl(fileName, "programs");
      } catch (error) {
        console.error("Error processing image:", error);
        return {
          message: "Gagal mengupload gambar: " + error.message,
          error: true,
          success: false,
        };
      }
    } else {
      return {
        message: "Gambar wajib diunggah",
        error: true,
        success: false,
      };
    }

    // Simpan data program ke database menggunakan Prisma
    const program = await prisma.program.create({
      data: {
        name,
        description,
        imageUrl,
        status,
        divisionId,
        startDate,
        endDate,
      },
    });

    console.log("Program berhasil ditambahkan:", program);

    // Revalidate related pages
    revalidatePath("/admin/programs");

    return {
      message: "Program berhasil ditambahkan",
      error: false,
      success: true,
      redirectUrl: "/admin/programs",
    };
  } catch (error) {
    console.error("Error adding program:", error);
    return {
      message: "Terjadi kesalahan: " + error.message,
      error: true,
      success: false,
    };
  }
}

/**
 * Update an existing program
 */
export async function updateProgramAction(_, formData, programId) {
  try {
    // Extract data from FormData
    const name = formData.get("name");
    const description = formData.get("description");
    const status = formData.get("status");
    const divisionId = parseInt(formData.get("divisionId"));
    const startDate = new Date(formData.get("startDate"));
    const endDate = new Date(formData.get("endDate"));
    const currentImageUrl = formData.get("currentImageUrl");

    // Validasi data
    if (!name || !description || !status || !divisionId || !startDate || !endDate) {
      return {
        message: "Semua field wajib diisi",
        error: true,
        success: false,
      };
    }

    // Siapkan data update
    const updateData = {
      name,
      description,
      status,
      divisionId,
      startDate,
      endDate,
    };

    // Handle file upload jika ada
    const imageFile = formData.get("image");
    if (imageFile && imageFile.size > 0) {
      try {
        // Upload gambar baru ke Supabase
        const fileName = await uploadImage(imageFile, "programs");

        // Dapatkan URL publik gambar baru
        updateData.imageUrl = getImageUrl(fileName, "programs");
      } catch (error) {
        console.error("Error processing image:", error);
        return {
          message: "Gagal mengupload gambar: " + error.message,
          error: true,
          success: false,
        };
      }
    } else {
      // Pertahankan gambar yang ada jika tidak ada upload baru
      updateData.imageUrl = currentImageUrl;
    }

    // Update data program di database
    const program = await prisma.program.update({
      where: { id: parseInt(programId) },
      data: updateData,
    });

    console.log("Program berhasil diperbarui:", program);

    // Revalidate related paths
    revalidatePath("/admin/programs");
    revalidatePath(`/admin/programs/${programId}`);

    return {
      message: "Program berhasil diperbarui",
      error: false,
      success: true,
      redirectUrl: `/admin/programs/${programId}`,
    };
  } catch (error) {
    console.error("Error updating program:", error);
    return {
      message: "Terjadi kesalahan: " + error.message,
      error: true,
      success: false,
    };
  }
}

/**
 * Delete a program
 */
export async function deleteProgramAction(programId) {
  try {
    // Hapus program dari database
    await prisma.program.delete({
      where: { id: parseInt(programId) },
    });

    console.log("Program berhasil dihapus:", programId);

    // Revalidate related paths
    revalidatePath("/admin/programs");

    return {
      message: "Program berhasil dihapus",
      success: true,
      error: false,
    };
  } catch (error) {
    console.error("Error deleting program:", error);
    return {
      message: "Terjadi kesalahan saat menghapus program: " + error.message,
      success: false,
      error: true,
    };
  }
}
