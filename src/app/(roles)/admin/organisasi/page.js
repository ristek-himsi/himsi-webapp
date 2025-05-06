import Link from "next/link";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

// Fungsi untuk mengambil daftar struktur organisasi
async function getOrganizationStructures() {
  return await prisma.organizationStructure.findMany({
    include: {
      leader: { select: { name: true } },
      viceLeader: { select: { name: true } },
      secretary: { select: { name: true } },
      treasurer: { select: { name: true } },
    },
    orderBy: { academicYear: "desc" },
  });
}

export default async function OrganizationStructurePage() {
  // TODO: Tambahkan autentikasi untuk memastikan hanya admin yang bisa akses
  const structures = await getOrganizationStructures();

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Manajemen Struktur Organisasi</h1>
        <Link href="/admin/organisasi/add" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Tambah Struktur
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Tahun Akademik</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Ketua</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Wakil Ketua</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Sekretaris</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Bendahara</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status Aktif</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {structures.map((structure) => (
              <tr key={structure.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-900">{structure.academicYear}</td>
                <td className="px-4 py-3 text-gray-900">{structure.leader?.name || "-"}</td>
                <td className="px-4 py-3 text-gray-900">{structure.viceLeader?.name || "-"}</td>
                <td className="px-4 py-3 text-gray-900">{structure.secretary?.name || "-"}</td>
                <td className="px-4 py-3 text-gray-900">{structure.treasurer?.name || "-"}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${structure.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{structure.isActive ? "Aktif" : "Tidak Aktif"}</span>
                </td>
                <td className="px-4 py-3 flex space-x-2">
                  <Link href={`/admin/organisasi/edit/${structure.id}`} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-sm">
                    Edit
                  </Link>
                  <form
                    action={async () => {
                      "use server";
                      await prisma.organizationStructure.delete({
                        where: { id: structure.id },
                      });
                      redirect("/admin/organisasi");
                    }}
                    className="inline"
                  >
                    <button type="submit" className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors text-sm">
                      Hapus
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
