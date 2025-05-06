"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addOrganizationStructure(prevState, formData) {
  try {
    const academicYear = parseInt(formData.get("academicYear"));
    const leaderId = parseInt(formData.get("leaderId"));
    const viceLeaderId = parseInt(formData.get("viceLeaderId"));
    const secretaryId = parseInt(formData.get("secretaryId"));
    const treasurerId = parseInt(formData.get("treasurerId"));
    const isActive = formData.get("isActive") === "on";

    // Validasi input
    if (!academicYear || isNaN(academicYear)) {
      return { message: "Tahun akademik wajib diisi dan harus valid" };
    }
    if (!leaderId || !viceLeaderId || !secretaryId || !treasurerId) {
      return { message: "Semua peran wajib diisi" };
    }

    // Validasi pengguna unik
    const userIds = [leaderId, viceLeaderId, secretaryId, treasurerId];
    if (new Set(userIds).size !== userIds.length) {
      return { message: "Setiap peran harus diisi oleh pengguna yang berbeda" };
    }

    // Validasi pengguna ada dan memiliki role yang sesuai
    const users = await prisma.user.findMany({
      where: { id: { in: userIds }, role: { in: ["ADMIN", "DIVISION_LEADER"] } },
    });
    if (users.length !== userIds.length) {
      return { message: "Pengguna tidak valid atau tidak memiliki peran yang sesuai" };
    }

    // Jika isActive true, nonaktifkan struktur lain
    if (isActive) {
      await prisma.organizationStructure.updateMany({
        where: { isActive: true },
        data: { isActive: false },
      });
    }

    // Tambah struktur
    await prisma.organizationStructure.create({
      data: {
        academicYear,
        leaderId,
        viceLeaderId,
        secretaryId,
        treasurerId,
        isActive,
      },
    });

    // Revalidate halaman
    revalidatePath("/admin/organisasi");

    return {
      success: true,
      redirectUrl: "/admin/organisasi",
      message: "Struktur organisasi berhasil ditambahkan",
    };
  } catch (error) {
    console.error("Error adding organization structure:", error);
    return { message: "Gagal menambahkan struktur organisasi: " + error.message };
  }
}

export async function updateOrganizationStructure(prevState, formData, id) {
  try {
    if (!id || isNaN(parseInt(id))) {
      return { message: "ID struktur tidak valid" };
    }

    const academicYear = parseInt(formData.get("academicYear"));
    const leaderId = parseInt(formData.get("leaderId"));
    const viceLeaderId = parseInt(formData.get("viceLeaderId"));
    const secretaryId = parseInt(formData.get("secretaryId"));
    const treasurerId = parseInt(formData.get("treasurerId"));
    const isActive = formData.get("isActive") === "on";

    // Validasi input
    if (!academicYear || isNaN(academicYear)) {
      return { message: "Tahun akademik wajib diisi dan harus valid" };
    }
    if (!leaderId || !viceLeaderId || !secretaryId || !treasurerId) {
      return { message: "Semua peran wajib diisi" };
    }

    // Validasi pengguna unik
    const userIds = [leaderId, viceLeaderId, secretaryId, treasurerId];
    if (new Set(userIds).size !== userIds.length) {
      return { message: "Setiap peran harus diisi oleh pengguna yang berbeda" };
    }

    // Validasi pengguna ada dan memiliki role yang sesuai
    const users = await prisma.user.findMany({
      where: { id: { in: userIds }, role: { in: ["ADMIN", "DIVISION_LEADER"] } },
    });
    if (users.length !== userIds.length) {
      return { message: "Pengguna tidak valid atau tidak memiliki peran yang sesuai" };
    }

    // Jika isActive true, nonaktifkan struktur lain
    if (isActive) {
      await prisma.organizationStructure.updateMany({
        where: { isActive: true, NOT: { id: parseInt(id) } },
        data: { isActive: false },
      });
    }

    // Perbarui struktur
    await prisma.organizationStructure.update({
      where: { id: parseInt(id) },
      data: {
        academicYear,
        leaderId,
        viceLeaderId,
        secretaryId,
        treasurerId,
        isActive,
      },
    });

    // Revalidate halaman
    revalidatePath("/admin/organisasi");
    revalidatePath(`/admin/organisasi/edit/${id}`);

    return {
      success: true,
      redirectUrl: "/admin/organisasi",
      message: "Struktur organisasi berhasil diperbarui",
    };
  } catch (error) {
    console.error("Error updating organization structure:", error);
    return { message: "Gagal memperbarui struktur organisasi: " + error.message };
  }
}

export async function deleteOrganizationStructure(prevState, formData, id) {
  try {
    if (!id || isNaN(parseInt(id))) {
      return { message: "ID struktur tidak valid" };
    }

    await prisma.organizationStructure.update({
      where: { id: parseInt(id) },
      data: { deletedAt: new Date() },
    });

    // Revalidate halaman
    revalidatePath("/admin/organisasi");

    return {
      success: true,
      redirectUrl: "/admin/organisasi",
      message: "Struktur organisasi berhasil dihapus",
    };
  } catch (error) {
    console.error("Error deleting organization structure:", error);
    return { message: "Gagal menghapus struktur organisasi: " + error.message };
  }
}
