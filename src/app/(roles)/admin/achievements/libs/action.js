"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { uploadImage } from "@/lib/supabase";
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
        imageUrl = `achievements/${fileName}`;
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
        achievementData.imageUrl = `achievements/${fileName}`;
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
