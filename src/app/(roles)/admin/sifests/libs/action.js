"use server";

import { deleteFile, getImageUrl, uploadImage } from "@/lib/supabase";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Add a new SIFest
 */
export async function addSifestAction(prevState, formData) {
  try {
    // Extract data from FormData
    const year = parseInt(formData.get("year"));
    const theme = formData.get("theme");
    const description = formData.get("description");
    const startDate = new Date(formData.get("startDate"));
    const endDate = new Date(formData.get("endDate"));

    // Validasi data
    if (!year || !theme || !description || !startDate || !endDate) {
      return {
        message: "Semua field wajib diisi",
        error: true,
        success: false,
      };
    }

    // Handle file upload
    const logo = formData.get("logo");
    let logoUrl = null;

    if (logo && logo.size > 0) {
      try {
        // Upload gambar ke Supabase menggunakan fungsi yang sudah ada
        const fileName = await uploadImage(logo, "sifests");

        // Dapatkan URL publik gambar
        logoUrl = fileName;
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
        message: "Logo wajib diunggah",
        error: true,
        success: false,
      };
    }

    // Simpan data SIFest ke database menggunakan Prisma
    const sifest = await prisma.sIFest.create({
      data: {
        year,
        theme,
        description,
        logoUrl,
        startDate,
        endDate,
      },
    });

    console.log("SIFest berhasil ditambahkan:", sifest);

    // Revalidate related pages
    revalidatePath("/admin/sifests");

    return {
      message: "SIFest berhasil ditambahkan",
      error: false,
      success: true,
      redirectUrl: "/admin/sifests",
    };
  } catch (error) {
    console.error("Error adding SIFest:", error);
    return {
      message: "Terjadi kesalahan: " + error.message,
      error: true,
      success: false,
    };
  }
}

/**
 * Update an existing SIFest
 */
export async function updateSifestAction(_, formData, sifestId) {
  try {
    // Extract data from FormData
    const year = parseInt(formData.get("year"));
    const theme = formData.get("theme");
    const description = formData.get("description");
    const startDate = new Date(formData.get("startDate"));
    const endDate = new Date(formData.get("endDate"));
    const currentLogoUrl = formData.get("currentLogoUrl");

    // Validasi data
    if (!year || !theme || !description || !startDate || !endDate) {
      return {
        message: "Semua field wajib diisi",
        error: true,
        success: false,
      };
    }

    const existingSifest = await prisma.sIFest.findUnique({
      where: {
        id: sifestId,
      },
    });

    if (!existingSifest) {
      return {
        message: "SIFest tidak ditemukan",
        error: true,
        success: false,
      };
    }

    // Siapkan data update
    const updateData = {
      year,
      theme,
      description,
      startDate,
      endDate,
    };

    // Handle file upload jika ada
    const logo = formData.get("logo");
    if (logo && logo.size > 0) {
      try {
        // Upload gambar baru ke Supabase
        const fileName = await uploadImage(logo, "sifests");

        // Dapatkan URL publik gambar baru
        updateData.logoUrl = fileName;

        if (existingSifest.logoUrl) {
          try {
            await deleteFile(existingSifest.logoUrl, "sifests");
            console.log("Old logo deleted successfully");
          } catch (deleteError) {
            console.error("Error deleting old logo:", deleteError);
            // Continue with the update even if deletion fails
          }
        }
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
      updateData.logoUrl = currentLogoUrl;
    }

    // Update data SIFest di database
    const sifest = await prisma.sIFest.update({
      where: { id: parseInt(sifestId) },
      data: updateData,
    });

    console.log("SIFest berhasil diperbarui:", sifest);

    // Revalidate related paths
    revalidatePath("/admin/sifests");
    revalidatePath(`/admin/sifests/${sifestId}`);

    return {
      message: "SIFest berhasil diperbarui",
      success: true,
      redirectUrl: `/admin/sifests`,
    };
  } catch (error) {
    console.error("Error updating SIFest:", error);
    return {
      message: "Terjadi kesalahan: " + error.message,
      success: false,
    };
  }
}

/**
 * Delete a SIFest
 */
export async function deleteSifestAction(_, formData, sifestId) {
  try {
    // Cek apakah SIFest ada
    const existingSifest = await prisma.sIFest.findUnique({
      where: {
        id: parseInt(sifestId),
      },
      include: {
        events: true, // Include related events to check if there are any
      },
    });

    if (!existingSifest) {
      return {
        message: "SIFest tidak ditemukan",
        error: true,
        success: false,
      };
    }

    // Cek apakah ada event yang terkait dengan SIFest ini
    if (existingSifest.events && existingSifest.events.length > 0) {
      return {
        message: "Tidak dapat menghapus SIFest karena masih memiliki event terkait",
        error: true,
        success: false,
      };
    }

    // Hapus SIFest dari database
    await prisma.sIFest.delete({
      where: { id: parseInt(sifestId) },
    });

    console.log("SIFest berhasil dihapus:", sifestId);

    // Hapus logo jika ada
    if (existingSifest.logoUrl) {
      try {
        await deleteFile(existingSifest.logoUrl, "sifests");
        console.log("Berhasil menghapus logo SIFest di storage");
      } catch (e) {
        console.log("Error deleting SIFest logo:", e);
      }
    }

    // Revalidate related paths
    revalidatePath("/admin/sifests");

    return {
      message: "SIFest berhasil dihapus",
      error: false,
      success: true,
      redirectUrl: "/admin/sifests",
    };
  } catch (error) {
    console.error("Error deleting SIFest:", error);
    return {
      message: "Terjadi kesalahan saat menghapus SIFest: " + error.message,
      error: true,
      success: false,
    };
  }
}
