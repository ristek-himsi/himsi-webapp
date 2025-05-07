"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { uploadImage } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

// Konfigurasi ukuran file maksimum (2MB)
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB dalam bytes

export async function addEventAction(prevState, formData) {
  try {
    // Extract form data
    const name = formData.get("name");
    const description = formData.get("description");
    const imageFile = formData.get("imageUrl");
    const startDate = formData.get("startDate");
    const endDate = formData.get("endDate");
    const location = formData.get("location");
    const academicYear = formData.get("academicYear");
    const type = formData.get("type");
    const status = formData.get("status");
    const sifestId = formData.get("sifestId") || null;

    // Validate required fields
    if (!name || !description || !startDate || !endDate || !location || !academicYear || !type || !status) {
      return { message: "Semua field wajib diisi kecuali SIFest ID" };
    }

    // Validate dates (startDate should be before or equal to endDate)
    if (new Date(startDate) > new Date(endDate)) {
      return { message: "Tanggal mulai harus sebelum atau sama dengan tanggal selesai" };
    }

    // Handle image upload
    let imageUrl;
    if (imageFile && imageFile.size > 0) {
      // Check file size
      if (imageFile.size > MAX_FILE_SIZE) {
        return { message: `Ukuran file terlalu besar. Maksimum ${MAX_FILE_SIZE / (1024 * 1024)}MB.` };
      }

      try {
        const fileName = await uploadImage(imageFile, "events");
        imageUrl = `events/${fileName}`;
      } catch (error) {
        console.error("Error uploading image:", error);
        return { message: "Gagal mengupload gambar. Silakan coba lagi." };
      }
    } else {
      return { message: "Gambar event wajib diunggah" };
    }

    // Prepare data for event creation
    const eventData = {
      name,
      description,
      imageUrl,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      location,
      academicYear: parseInt(academicYear),
      type,
      status,
    };

    // Add SIFest relation if type is SIFEST and sifestId is provided
    if (type === "SIFEST" && sifestId) {
      // Verify SIFest exists
      const sifestExists = await prisma.sIFest.findUnique({
        where: { id: parseInt(sifestId) },
      });

      if (!sifestExists) {
        return { message: "SIFest dengan ID tersebut tidak ditemukan" };
      }

      eventData.sifest = {
        connect: { id: parseInt(sifestId) },
      };
    } else if (type === "SIFEST" && !sifestId) {
      return { message: "SIFest ID wajib diisi untuk event tipe SIFEST" };
    }

    // Create event in database
    await prisma.event.create({
      data: eventData,
    });

    // Revalidate the events page to show new data
    revalidatePath("/admin/events");

    // Return success status and redirect URL untuk diproses di client
    return {
      success: true,
      redirectUrl: "/admin/events",
      message: "Event berhasil dibuat!",
    };
  } catch (error) {
    console.error("Error creating event:", error);

    // Handle database errors
    if (error.code === "P2002") {
      return { message: "Terjadi konflik data. Silakan periksa kembali informasi event." };
    }

    return { message: `Terjadi kesalahan: ${error.message}` };
  }
}

export async function updateEventAction(prevState, formData, eventId) {
  try {
    // Extract form data
    const name = formData.get("name");
    const description = formData.get("description");
    const imageFile = formData.get("imageUrl");
    const startDate = formData.get("startDate");
    const endDate = formData.get("endDate");
    const location = formData.get("location");
    const academicYear = formData.get("academicYear");
    const type = formData.get("type");
    const status = formData.get("status");
    const sifestId = formData.get("sifestId") || null;

    // Validate required fields
    if (!name || !description || !startDate || !endDate || !location || !academicYear || !type || !status) {
      return { message: "Semua field wajib diisi kecuali SIFest ID" };
    }

    // Validate dates
    if (new Date(startDate) > new Date(endDate)) {
      return { message: "Tanggal mulai harus sebelum atau sama dengan tanggal selesai" };
    }

    // Get existing event to check if we need to update the image
    const existingEvent = await prisma.event.findUnique({
      where: { id: parseInt(eventId) },
      select: { imageUrl: true },
    });

    if (!existingEvent) {
      return { message: "Event tidak ditemukan" };
    }

    // Prepare data for event update
    const eventData = {
      name,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      location,
      academicYear: parseInt(academicYear),
      type,
      status,
    };

    // Handle image upload if provided
    if (imageFile && imageFile.size > 0) {
      // Check file size
      if (imageFile.size > MAX_FILE_SIZE) {
        return { message: `Ukuran file terlalu besar. Maksimum ${MAX_FILE_SIZE / (1024 * 1024)}MB.` };
      }

      try {
        const fileName = await uploadImage(imageFile, "events");
        eventData.imageUrl = `events/${fileName}`;
      } catch (error) {
        console.error("Error uploading image:", error);
        return { message: "Gagal mengupload gambar. Silakan coba lagi." };
      }
    }

    // Handle SIFest relation
    if (type === "SIFEST") {
      if (sifestId) {
        // Verify SIFest exists
        const sifestExists = await prisma.sIFest.findUnique({
          where: { id: parseInt(sifestId) },
        });

        if (!sifestExists) {
          return { message: "SIFest dengan ID tersebut tidak ditemukan" };
        }

        eventData.sifest = {
          connect: { id: parseInt(sifestId) },
        };
      } else {
        return { message: "SIFest ID wajib diisi untuk event tipe SIFEST" };
      }
    } else if (type === "REGULAR") {
      // Disconnect from any SIFest if event type changed to REGULAR
      eventData.sifest = { disconnect: true };
    }

    // Update event in database
    await prisma.event.update({
      where: { id: parseInt(eventId) },
      data: eventData,
    });

    // Revalidate paths
    revalidatePath(`/admin/events/${eventId}`);
    revalidatePath("/admin/events");

    // Return success response
    return {
      success: true,
      redirectUrl: `/admin/events/${eventId}`,
      message: "Event berhasil diperbarui!",
    };
  } catch (error) {
    console.error("Error updating event:", error);
    return { message: `Terjadi kesalahan: ${error.message}` };
  }
}

// Server action untuk menambahkan gambar ke galeri event
export async function addEventGalleryImagesAction(formData, eventId) {
  try {
    const files = formData.getAll("imageFile");
    const captions = formData.getAll("caption");

    if (!files || files.length === 0) {
      return { success: false, message: "Tidak ada file yang diunggah" };
    }

    const uploadedImages = [];

    // Proses setiap file yang diunggah
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const caption = captions[i] || "";

      // Skip if no file
      if (!file || file.size === 0) continue;

      // Upload file ke Supabase
      try {
        const fileName = await uploadImage(file, "events");
        uploadedImages.push({
          imageUrl: `events/${fileName}`,
          caption: caption,
        });
      } catch (uploadError) {
        console.error("Error uploading image:", uploadError);
        throw new Error(`Gagal mengunggah gambar: ${uploadError.message}`);
      }
    }

    if (uploadedImages.length === 0) {
      return { success: false, message: "Tidak ada gambar yang berhasil diunggah" };
    }

    // Tambahkan data gambar ke database
    const now = new Date();
    const galleryItems = await prisma.eventGallery.createMany({
      data: uploadedImages.map((image) => ({
        eventId: parseInt(eventId),
        imageUrl: image.imageUrl,
        caption: image.caption,
        uploadedAt: now,
      })),
    });

    // Revalidate path untuk memperbarui UI
    revalidatePath(`/admin/events/${eventId}`);

    return {
      success: true,
      message: `Berhasil mengunggah ${uploadedImages.length} gambar`,
    };
  } catch (error) {
    console.error(`Error adding gallery images to event ${eventId}:`, error);
    return {
      success: false,
      message: `Gagal menambahkan gambar: ${error.message}`,
    };
  }
}
