"use server";

import prisma from "@/lib/prisma";
import { uploadImage, deleteFile } from "@/lib/supabase"; // Sesuaikan dengan path upload utility Anda
import { revalidatePath } from "next/cache";

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 2MB

export async function editMemberPostAction(prevState, formData, postId) {
  try {
    const title = formData.get("title");
    const content = formData.get("content");
    const imageFile = formData.get("image");

    // Validasi field wajib
    if (!title || !content) {
      return { message: "Judul dan konten wajib diisi" };
    }

    // Cek apakah post exists dan ambil data yang diperlukan
    const existingPost = await prisma.post.findUnique({
      where: { id: parseInt(postId) },
      select: {
        imageUrl: true,
        status: true,
        authorId: true, // pastikan user hanya bisa edit post miliknya
      },
    });

    if (!existingPost) {
      return { message: "Postingan tidak ditemukan" };
    }

    // Siapkan data untuk update
    const postData = {
      title,
      content,
      updatedAt: new Date(),
    };

    // Handle upload gambar jika ada
    if (imageFile && imageFile.size > 0) {
      if (imageFile.size > MAX_FILE_SIZE) {
        return { message: `Ukuran file terlalu besar. Maksimum ${MAX_FILE_SIZE / (1024 * 1024)}MB.` };
      }

      try {
        // Upload gambar baru
        const fileName = await uploadImage(imageFile, "posts");
        postData.imageUrl = fileName;

        // Hapus gambar lama jika ada
        if (existingPost.imageUrl) {
          try {
            await deleteFile(existingPost.imageUrl, "posts");
            console.log("Old image deleted successfully");
          } catch (deleteError) {
            console.error("Error deleting old image:", deleteError);
            // Lanjut update meski gagal hapus gambar lama
          }
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        return { message: "Gagal mengupload gambar. Silakan coba lagi." };
      }
    }

    // Update post di database
    const updatedPost = await prisma.post.update({
      where: { id: parseInt(postId) },
      data: postData,
    });

    // Revalidate pages yang terkait
    revalidatePath(`/member/my-posts`);

    return {
      success: true,
      redirectUrl: `/member/my-posts`, // atau sesuai route member posts
      message: "Postingan berhasil diperbarui!",
    };
  } catch (error) {
    console.error("Error updating member post:", error);
    return { message: `Terjadi kesalahan: ${error.message}` };
  }
}
