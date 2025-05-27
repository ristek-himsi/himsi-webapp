"use server";

import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { deleteFile, uploadImage } from "@/lib/supabase";

export async function updateProfileMemberAction(_, formData, id) {
  const MAX_FILE_SIZE = 1 * 1024 * 1024;

  const name = formData.get("name");
  const email = formData.get("email");
  const photo = formData.get("photo");
  const oldPassword = formData.get("oldPassword");
  const newPassword = formData.get("newPassword");

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!existingUser) {
      return {
        message: "User tidak ditemukan",
        success: false,
      };
    }

    // Prepare data untuk update
    const updatedData = {
      name,
      email,
    };

    // Validasi dan update password jika ada input password
    if (oldPassword && newPassword) {
      const isOldPasswordValid = await bcrypt.compare(oldPassword, existingUser.password);

      if (!isOldPasswordValid) {
        return {
          message: "Password lama tidak benar",
          success: false,
        };
      }

      // Hash password baru
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      updatedData.password = hashedNewPassword;
    }

    // Handle photo upload jika ada
    if (photo && photo.size > 0) {
      if (photo.size > MAX_FILE_SIZE) {
        return {
          message: `Ukuran file terlalu besar. Maksimum ${MAX_FILE_SIZE / 1024 / 1024}MB.`,
          success: false,
        };
      }

      try {
        const fileName = await uploadImage(photo, "users");
        updatedData.photo_url = fileName;

        // Hapus foto lama jika ada
        if (existingUser.photo_url) {
          try {
            await deleteFile(existingUser.photo_url, "users");
            console.log("Old image deleted successfully");
          } catch (deleteError) {
            console.error("Error deleting old image:", deleteError);
            // Continue with the update even if deletion fails
          }
        }
      } catch (error) {
        console.error("Error uploading photo:", error);
        return {
          message: "Gagal mengunggah foto. Silakan coba lagi.",
          success: false,
        };
      }
    }

    // Update user
    await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: updatedData,
    });

    return {
      success: true,
      redirectUrl: "/member/profile", // Fix typo: redirecrUrl -> redirectUrl
      message: "Berhasil mengubah profil",
    };
  } catch (error) {
    console.error("Error updating profile:", error);
    return {
      message: "Gagal mengubah profil",
      success: false,
    };
  }
}
