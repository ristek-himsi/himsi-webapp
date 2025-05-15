"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { deleteFile, uploadImage } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

// Konfigurasi ukuran file maksimum (2MB)
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB dalam bytes

export async function addUser(prevState, formData) {
  try {
    const name = formData.get("name");
    const email = formData.get("email");
    const role = formData.get("role");
    const divisionId = formData.get("divisionId");
    const position = formData.get("position");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const photo = formData.get("photo");

    console.log("addUser - photo:", photo?.name, photo instanceof File);
    console.log("addUser - divisionId:", divisionId);

    if (!name || !email || !role || !password || !confirmPassword) {
      return { message: "Nama, email, peran, dan kata sandi wajib diisi" };
    }

    const validRoles = ["ADMIN", "DIVISION_LEADER", "MEMBER"];
    if (!validRoles.includes(role)) {
      return { message: "Peran tidak valid" };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { message: "Format email tidak valid" };
    }

    if (divisionId) {
      const divisionExists = await prisma.division.findUnique({
        where: { id: parseInt(divisionId) },
      });
      if (!divisionExists) {
        return { message: "Divisi tidak valid" };
      }
    }

    if (position && position.length > 100) {
      return { message: "Posisi tidak boleh lebih dari 100 karakter" };
    }

    if (password !== confirmPassword) {
      return { message: "Kata sandi dan konfirmasi tidak cocok" };
    }
    if (password.length < 8) {
      return { message: "Kata sandi harus minimal 8 karakter" };
    }

    // Handle photo upload
    let photo_url;
    if (photo && photo.size > 0) {
      if (photo.size > MAX_FILE_SIZE) {
        return { message: `Ukuran file terlalu besar. Maksimum ${MAX_FILE_SIZE / 1024 / 1024}MB.` };
      }

      try {
        const fileName = await uploadImage(photo, "users");
        photo_url = fileName;
      } catch (error) {
        console.error("Error uploading photo:", error);
        return { message: "Gagal mengunggah foto. Silakan coba lagi." };
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        position: position || null,
        photo_url,
        division: divisionId ? { connect: { id: parseInt(divisionId) } } : undefined,
      },
    });

    // Revalidate the users page to show new data
    revalidatePath("/admin/users");

    return {
      success: true,
      redirectUrl: "/admin/users",
      message: "Pengguna berhasil ditambahkan",
    };
  } catch (error) {
    console.error("Error adding user:", error);
    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      return { message: "Email sudah digunakan" };
    }
    return { message: "Gagal menambahkan pengguna: " + error.message };
  }
}

export async function updateUser(prevState, formData, userId) {
  try {
    // Validasi userId
    if (!userId || isNaN(parseInt(userId))) {
      console.error("updateUser - Invalid userId:", userId);
      return { message: "ID pengguna tidak valid" };
    }

    const parsedUserId = parseInt(userId);
    console.log("updateUser - parsedUserId:", parsedUserId);

    const name = formData.get("name");
    const email = formData.get("email");
    const role = formData.get("role");
    const divisionId = formData.get("divisionId");
    const position = formData.get("position");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const photo = formData.get("photo");

    console.log("updateUser - photo:", photo?.name, photo instanceof File);
    console.log("updateUser - divisionId:", divisionId);
    console.log("updateUser - formData:", Object.fromEntries(formData));

    if (!name || !email || !role) {
      return { message: "Nama, email, dan peran wajib diisi" };
    }

    const validRoles = ["ADMIN", "DIVISION_LEADER", "MEMBER"];
    if (!validRoles.includes(role)) {
      return { message: "Peran tidak valid" };
    }

    const userExist = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userExist) {
      return {
        message: "tidak ada usernya",
      };
    }

    if (divisionId) {
      const divisionExists = await prisma.division.findUnique({
        where: { id: parseInt(divisionId) },
      });
      if (!divisionExists) {
        return { message: "Divisi tidak valid" };
      }
    }

    if (position && position.length > 100) {
      return { message: "Posisi tidak boleh lebih dari 100 karakter" };
    }

    if (password || confirmPassword) {
      if (password !== confirmPassword) {
        return { message: "Kata sandi dan konfirmasi tidak cocok" };
      }
      if (password.length < 8) {
        return { message: "Kata sandi harus minimal 8 karakter" };
      }
    }

    // Handle photo upload
    let photo_url = null;
    if (photo && photo.size > 0) {
      if (photo.size > MAX_FILE_SIZE) {
        return { message: `Ukuran file terlalu besar. Maksimum ${MAX_FILE_SIZE / 1024 / 1024}MB.` };
      }

      try {
        const fileName = await uploadImage(photo, "users");
        photo_url = fileName;

        if (userExist.photo_url) {
          try {
            await deleteFile(userExist.photo_url, "users");
            console.log("Old image deleted successfully");
          } catch (deleteError) {
            console.error("Error deleting old image:", deleteError);
            // Continue with the update even if deletion fails
          }
        }
      } catch (error) {
        console.error("Error uploading photo:", error);
        return { message: "Gagal mengunggah foto. Silakan coba lagi." };
      }
    }

    const updateData = {
      name,
      email,
      role,
      position: position || null,
      photo_url: photo_url || undefined,
      division: divisionId ? { connect: { id: parseInt(divisionId) } } : { disconnect: true },
    };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    console.log("updateUser - updateData:", updateData);

    await prisma.user.update({
      where: { id: parsedUserId },
      data: updateData,
    });

    // Revalidate paths
    revalidatePath(`/admin/users/${parsedUserId}`);
    revalidatePath("/admin/users");

    return {
      success: true,
      redirectUrl: "/admin/users",
      message: "Pengguna berhasil diperbarui",
    };
  } catch (error) {
    console.error("Error updating user:", error);
    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      return { message: "Email sudah digunakan" };
    }
    return { message: "Gagal memperbarui pengguna: " + error.message };
  }
}

export async function deleteUser(prevState, formData, userId) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });

    if (!existingUser) {
      return { message: "tidak ada user yang ingin dihapus" };
    }

    if (!userId || isNaN(parseInt(userId))) {
      return { message: "ID pengguna tidak valid" };
    }

    if (existingUser.photo_url) {
      try {
        const filename = existingUser.photo_url;
        if (filename) {
          await deleteFile(filename, "users");
          console.log("Berhasil menghapus gambar user di storage");
        }
      } catch (e) {
        console.log("Error deleting program user:", e);
      }
    }

    await prisma.user.update({
      where: { id: parseInt(userId) },
      data: {
        deletedAt: new Date(),
      },
    });

    // Revalidate paths
    revalidatePath("/admin/users");

    return {
      success: true,
      redirectUrl: "/admin/users",
      message: "Pengguna berhasil dihapus",
    };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { message: "Gagal menghapus pengguna: " + error.message };
  }
}
