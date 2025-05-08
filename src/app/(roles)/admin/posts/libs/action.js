"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { uploadImage } from "@/lib/supabase";

const MAX_FILE_SIZE = 500 * 1024; // 500KB

export async function addPostAction(prevState, formData) {
  try {
    const title = formData.get("title");
    const content = formData.get("content");
    const authorId = formData.get("authorId");
    const imageFile = formData.get("imageUrl");
    const category = formData.get("category");
    const status = formData.get("status");

    if (!title || !content || !authorId || !category || !status) {
      return { message: "Semua field wajib diisi" };
    }

    let imageUrl = "posts/default-post.png";
    if (imageFile && imageFile.size > 0) {
      if (imageFile.size > MAX_FILE_SIZE) {
        return { message: `Ukuran file terlalu besar. Maksimum ${MAX_FILE_SIZE / 1024}KB.` };
      }

      try {
        const fileName = await uploadImage(imageFile, "posts");
        imageUrl = `posts/${fileName}`;
      } catch (error) {
        console.error("Error uploading image:", error);
        return { message: "Gagal mengupload gambar. Silakan coba lagi." };
      }
    }

    const postData = {
      title,
      content,
      category,
      status,
      imageUrl,
      author: {
        connect: { id: parseInt(authorId) },
      },
    };

    if (status === "PUBLISHED") {
      postData.publishedAt = new Date();
    }

    await prisma.post.create({
      data: postData,
    });

    revalidatePath("/admin/posts");

    return {
      success: true,
      redirectUrl: "/admin/posts",
      message: "Postingan berhasil dibuat!",
    };
  } catch (error) {
    console.error("Error creating post:", error);
    return { message: `Terjadi kesalahan: ${error.message}` };
  }
}

export async function updatePostAction(prevState, formData, postId) {
  try {
    const title = formData.get("title");
    const content = formData.get("content");
    const authorId = formData.get("authorId");
    const imageFile = formData.get("imageUrl");
    const category = formData.get("category");
    const status = formData.get("status");

    if (!title || !content || !authorId || !category || !status) {
      return { message: "Semua field wajib diisi" };
    }

    const existingPost = await prisma.post.findUnique({
      where: { id: parseInt(postId) },
      select: { imageUrl: true, status: true },
    });

    if (!existingPost) {
      return { message: "Postingan tidak ditemukan" };
    }

    const postData = {
      title,
      content,
      category,
      status,
      author: {
        connect: { id: parseInt(authorId) },
      },
    };

    if (imageFile && imageFile.size > 0) {
      if (imageFile.size > MAX_FILE_SIZE) {
        return { message: `Ukuran file terlalu besar. Maksimum ${MAX_FILE_SIZE / 1024}KB.` };
      }

      try {
        const fileName = await uploadImage(imageFile, "posts");
        postData.imageUrl = `posts/${fileName}`;
      } catch (error) {
        console.error("Error uploading image:", error);
        return { message: "Gagal mengupload gambar. Silakan coba lagi." };
      }
    }

    if (status === "PUBLISHED" && existingPost.status !== "PUBLISHED") {
      postData.publishedAt = new Date();
    } else if (status !== "PUBLISHED") {
      postData.publishedAt = null;
    }

    await prisma.post.update({
      where: { id: parseInt(postId) },
      data: postData,
    });

    revalidatePath(`/admin/posts/${postId}`);
    revalidatePath("/admin/posts");

    return {
      success: true,
      redirectUrl: `/admin/posts/${postId}`,
      message: "Postingan berhasil diperbarui!",
    };
  } catch (error) {
    console.error("Error updating post:", error);
    return { message: `Terjadi kesalahan: ${error.message}` };
  }
}

export async function deletePostAction(postId) {
  try {
    await prisma.post.delete({
      where: { id: parseInt(postId) },
    });

    revalidatePath("/admin/posts");

    return {
      success: true,
      message: "Postingan berhasil dihapus!",
    };
  } catch (error) {
    console.error("Error deleting post:", error);
    return { message: `Terjadi kesalahan: ${error.message}` };
  }
}
