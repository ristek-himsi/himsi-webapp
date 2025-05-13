"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { deleteFile, uploadImage } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

const MAX_FILE_SIZE = 500 * 1024; // 500KB dalam bytes

export async function addAchievementAction(prevState, formData) {
  try {
    const title = formData.get("title");
    const description = formData.get("description");
    const divisionId = formData.get("divisionId");
    const date = formData.get("date");
    const imageFile = formData.get("imageUrl");

    if (!title || !description || !divisionId || !date) {
      return { message: "Semua field wajib diisi" };
    }

    let imageUrl;
    if (imageFile && imageFile.size > 0) {
      if (imageFile.size > MAX_FILE_SIZE) {
        return { message: `Ukuran file terlalu besar. Maksimum ${MAX_FILE_SIZE / 1024}KB.` };
      }

      try {
        const fileName = await uploadImage(imageFile, "achievements");
        imageUrl = fileName;
      } catch (error) {
        console.error("Error uploading image:", error);
        return { message: "Gagal mengupload gambar. Silakan coba lagi." };
      }
    } else {
      imageUrl = "achievements/default-achievement.png";
    }

    await prisma.achievement.create({
      data: {
        title,
        description,
        division: { connect: { id: parseInt(divisionId) } },
        date: new Date(date),
        imageUrl,
      },
    });

    revalidatePath("/admin/achievements");

    return {
      success: true,
      redirectUrl: "/admin/achievements",
      message: "Pencapaian berhasil dibuat!",
    };
  } catch (error) {
    console.error("Error creating achievement:", error);
    return { message: `Terjadi kesalahan: ${error.message}` };
  }
}

export async function updateAchievementAction(prevState, formData, achievementId) {
  try {
    const title = formData.get("title");
    const description = formData.get("description");
    const divisionId = formData.get("divisionId");
    const date = formData.get("date");
    const imageFile = formData.get("imageUrl");

    if (!title || !description || !divisionId || !date) {
      return { message: "Semua field wajib diisi" };
    }

    const existingAchievement = await prisma.achievement.findUnique({
      where: { id: parseInt(achievementId) },
      select: { imageUrl: true },
    });

    if (!existingAchievement) {
      return { message: "Pencapaian tidak ditemukan" };
    }

    const achievementData = {
      title,
      description,
      division: { connect: { id: parseInt(divisionId) } },
      date: new Date(date),
    };

    if (imageFile && imageFile.size > 0) {
      if (imageFile.size > MAX_FILE_SIZE) {
        return { message: `Ukuran file terlalu besar. Maksimum ${MAX_FILE_SIZE / 1024}KB.` };
      }

      try {
        const fileName = await uploadImage(imageFile, "achievements");
        achievementData.imageUrl = fileName;

        if (existingAchievement.imageUrl) {
          try {
            await deleteFile(existingAchievement.imageUrl, "achievements");
            console.log("Old image deleted successfully");
          } catch (deleteError) {
            console.error("Error deleting old image:", deleteError);
            // Continue with the update even if deletion fails
          }
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        return { message: "Gagal mengupload gambar. Silakan coba lagi." };
      }
    }

    await prisma.achievement.update({
      where: { id: parseInt(achievementId) },
      data: achievementData,
    });

    revalidatePath(`/admin/achievements/${achievementId}`);
    revalidatePath("/admin/achievements");

    return {
      success: true,
      redirectUrl: `/admin/achievements/${achievementId}`,
      message: "Pencapaian berhasil diperbarui!",
    };
  } catch (error) {
    console.error("Error updating achievement:", error);
    return { message: `Terjadi kesalahan: ${error.message}` };
  }
}

export async function DeleteAchievementAction(_, formData, id) {
  const achievementId = parseInt(id);

  try {
    const existingAchievement = await prisma.achievement.findUnique({
      where: {
        id: achievementId,
      },
    });

    if (!existingAchievement) {
      return {
        message: " achievement tidak tersedia untuk dihapus",
      };
    }

    await prisma.achievement.delete({
      where: {
        id: achievementId,
      },
    });

    if (existingAchievement.imageUrl) {
      try {
        await deleteFile(existingAchievement.imageUrl, "achievements");
        console.log("achievement berhasil dihapus");
      } catch (e) {
        console.log(e);
        return {
          message: "gagal menghapus achievement",
          success: false,
        };
      }
    }

    revalidatePath("/admin/achievements");

    return {
      message: "berhasil menghapus achievement",
      success: true,
      redirectUrl: "/admin/achievements",
    };
  } catch (e) {
    console.log(e);
    return {
      message: "gagalm menghapus achievement",
      success: false,
    };
  }
}
