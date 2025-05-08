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
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 shadow-xl rounded-lg">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Manajemen Struktur Organisasi</h1>
        <Link href="/admin/organisasi/add" className="px-5 py-2.5 bg-blue-900 text-white rounded-lg hover:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-base w-full sm:w-auto text-center">
          Tambah Struktur
        </Link>
      </div>

      {/* Mobile: Card Layout */}
      <div className="sm:hidden space-y-4">
        {structures.map((structure) => (
          <div key={structure.id} className="bg-white shadow-md p-5 rounded-lg hover:shadow-lg transition-shadow">
            <h3 className="text-base font-semibold text-gray-900 mb-3">Tahun Akademik: {structure.academicYear}</h3>
            <div className="space-y-3 text-base text-gray-700">
              <p>
                <span className="font-medium">Ketua:</span> {structure.leader?.name || "-"}
              </p>
              <p>
                <span className="font-medium">Wakil Ketua:</span> {structure.viceLeader?.name || "-"}
              </p>
              <p>
                <span className="font-medium">Sekretaris:</span> {structure.secretary?.name || "-"}
              </p>
              <p>
                <span className="font-medium">Bendahara:</span> {structure.treasurer?.name || "-"}
              </p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${structure.isActive ? "bg-green-200 text-green-900" : "bg-red-200 text-red-900"}`}>{structure.isActive ? "Aktif" : "Tidak Aktif"}</span>
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end space-x-3">
              <Link href={`/admin/organisasi/edit/${structure.id}`} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-base">
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
                <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-base">
                  Hapus
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>

      {/* Tablet/Laptop: Table Layout */}
      <div className="hidden sm:block overflow-x-auto">
        <div role="table" aria-describedby="organization-structure-table" className="w-full border-collapse">
          <div role="rowgroup" className="bg-blue-50">
            <div role="row" className="flex">
              <div role="columnheader" className="px-3 py-2 sm:px-4 sm:py-3 text-left text-sm font-semibold text-blue-900 flex-1">
                Tahun Akademik
              </div>
              <div role="columnheader" className="px-3 py-2 sm:px-4 sm:py-3 text-left text-sm font-semibold text-blue-900 flex-1">
                Ketua
              </div>
              <div role="columnheader" className="px-3 py-2 sm:px-4 sm:py-3 text-left text-sm font-semibold text-blue-900 flex-1">
                Wakil Ketua
              </div>
              <div role="columnheader" className="px-3 py-2 sm:px-4 sm:py-3 text-left text-sm font-semibold text-blue-900 flex-1">
                Sekretaris
              </div>
              <div role="columnheader" className="px-3 py-2 sm:px-4 sm:py-3 text-left text-sm font-semibold text-blue-900 flex-1">
                Bendahara
              </div>
              <div role="columnheader" className="px-3 py-2 sm:px-4 sm:py-3 text-left text-sm font-semibold text-blue-900 flex-1">
                Status Aktif
              </div>
              <div role="columnheader" className="px-3 py-2 sm:px-4 sm:py-3 text-left text-sm font-semibold text-blue-900 flex-1">
                Aksi
              </div>
            </div>
          </div>
          <div role="rowgroup">
            {structures.map((structure) => (
              <div key={structure.id} role="row" className="flex odd:bg-white even:bg-blue-25 hover:bg-blue-100 transition-colors">
                <div role="cell" className="px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-gray-900 flex-1">
                  {structure.academicYear}
                </div>
                <div role="cell" className="px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-gray-900 flex-1">
                  {structure.leader?.name || "-"}
                </div>
                <div role="cell" className="px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-gray-900 flex-1">
                  {structure.viceLeader?.name || "-"}
                </div>
                <div role="cell" className="px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-gray-900 flex-1">
                  {structure.secretary?.name || "-"}
                </div>
                <div role="cell" className="px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-gray-900 flex-1">
                  {structure.treasurer?.name || "-"}
                </div>
                <div role="cell" className="px-3 py-2 sm:px-4 sm:py-3 flex-1">
                  <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${structure.isActive ? "bg-green-200 text-green-900" : "bg-red-200 text-red-900"}`}>{structure.isActive ? "Aktif" : "Tidak Aktif"}</span>
                </div>
                <div role="cell" className="px-3 py-2 sm:px-4 sm:py-3 flex space-x-3 flex-1">
                  <Link href={`/admin/organisasi/edit/${structure.id}`} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-base">
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
                    <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-base">
                      Hapus
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
