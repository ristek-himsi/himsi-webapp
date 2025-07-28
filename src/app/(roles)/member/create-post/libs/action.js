"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { uploadImage } from "@/lib/supabase";

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB sesuai dengan frontend

export async function addArticleByMemberAction(prevState, formData) {
  try {
    const title = formData.get("title");
    const category = formData.get("category");
    const content = formData.get("content");
    const authorId = parseInt(formData.get("authorId"));
    const imageFile = formData.get("imageUrl");

    // Validasi input wajib
    if (!title || !content || !authorId) {
      return { message: "Judul, konten, dan author wajib diisi" };
    }

    // Validasi kategori harus ARTICLE untuk member
    if (category !== "ARTICLE") {
      return { message: "Member hanya dapat membuat artikel dengan kategori ARTICLE" };
    }

    // Validasi authorId
    if (isNaN(authorId)) {
      return { message: "Author ID tidak valid" };
    }

    // Verifikasi user exists
    const user = await prisma.user.findUnique({
      where: { id: authorId },
    });

    if (!user) {
      return { message: "User tidak ditemukan" };
    }

    // Handle image upload
    let imageUrl = "posts/default-article.png"; // default image untuk article

    if (imageFile && imageFile.size > 0) {
      // Validasi ukuran file
      if (imageFile.size > MAX_FILE_SIZE) {
        return {
          message: `Ukuran file terlalu besar. Maksimum ${MAX_FILE_SIZE / (1024 * 1024)}MB.`,
        };
      }

      // Validasi tipe file
      const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!allowedTypes.includes(imageFile.type)) {
        return { message: "Format file tidak didukung. Gunakan JPG, PNG, GIF, atau WebP." };
      }

      try {
        const fileName = await uploadImage(imageFile, "posts");
        imageUrl = fileName;
      } catch (error) {
        console.error("Error uploading image:", error);
        return { message: "Gagal mengupload gambar. Silakan coba lagi." };
      }
    }

    // Create article dengan status DRAFT (akan di-review admin)
    const postData = {
      title: title.trim(),
      content: content.trim(),
      category: "ARTICLE",
      status: "DRAFT", // Member artikel harus review dulu
      imageUrl,
      author: {
        connect: { id: authorId },
      },
    };

    const newPost = await prisma.post.create({
      data: postData,
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    // Revalidate paths
    revalidatePath("/member/articles");
    revalidatePath("/admin/posts");

    return {
      success: true,
      message: "Artikel berhasil dibuat dan akan direview terlebih dahulu sebelum dipublikasikan!",
      redirectUrl: "/member/my-posts",
      data: {
        id: newPost.id,
        title: newPost.title,
      },
    };
  } catch (error) {
    console.error("Error creating article:", error);

    // Handle specific Prisma errors
    if (error.code === "P2002") {
      return { message: "Judul artikel sudah digunakan. Silakan gunakan judul lain." };
    }

    if (error.code === "P2003") {
      return { message: "Author tidak valid atau tidak ditemukan." };
    }

    return {
      message: `Terjadi kesalahan saat membuat artikel: ${error.message}`,
    };
  }
}
