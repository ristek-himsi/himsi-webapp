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
    <div className=" bg-slate-50 py-6 px-4 sm:px-6">
      <div className="w-full max-w-md sm:max-w-4xl mx-auto bg-white rounded-md shadow-md p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">Manajemen Struktur Organisasi</h1>
          <Link
            href="/admin/organisasi/add"
            className="w-full sm:w-auto px-5 py-2.5 bg-teal-600 text-white rounded-md hover:bg-teal-700 hover:scale-105 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-transform text-sm text-center"
          >
            Tambah Struktur
          </Link>
        </div>

        {structures.length === 0 && (
          <div className="bg-amber-50 border-l-4 border-amber-500 text-amber-700 p-4 rounded-md">
            <p>Belum ada struktur organisasi yang tersedia.</p>
          </div>
        )}

        {/* Mobile: Card Layout */}
        <div className="sm:hidden space-y-3">
          {structures.map((structure) => (
            <div key={structure.id} className="bg-white shadow-sm p-4 rounded-md hover:shadow-md transition-shadow">
              <h3 className="text-sm font-semibold text-slate-800 mb-3">Tahun Akademik: {structure.academicYear}</h3>
              <div className="space-y-2 text-xs text-slate-600">
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
                  <span className={`inline-block px-1.5 py-0.5 text-xs font-medium rounded-full ${structure.isActive ? "bg-teal-100 text-teal-800" : "bg-rose-100 text-rose-800"}`}>{structure.isActive ? "Aktif" : "Tidak Aktif"}</span>
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-200 flex flex-col space-y-3">
                <Link
                  href={`/admin/organisasi/edit/${structure.id}`}
                  className="w-full px-5 py-2.5 bg-teal-600 text-white rounded-md hover:bg-teal-700 hover:scale-105 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-transform text-sm text-center"
                >
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
                >
                  <button type="submit" className="w-full px-5 py-2.5 bg-rose-600 text-white rounded-md hover:bg-rose-700 hover:scale-105 focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 transition-transform text-sm">
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
            <div role="rowgroup" className="bg-slate-100">
              <div role="row" className="grid grid-cols-7 gap-6 px-4 py-3">
                <div role="columnheader" className="text-left text-sm font-semibold text-slate-800 min-w-[120px]">
                  Tahun Akademik
                </div>
                <div role="columnheader" className="text-left text-sm font-semibold text-slate-800 min-w-[120px]">
                  Ketua
                </div>
                <div role="columnheader" className="text-left text-sm font-semibold text-slate-800 min-w-[120px]">
                  Wakil Ketua
                </div>
                <div role="columnheader" className="text-left text-sm font-semibold text-slate-800 min-w-[120px]">
                  Sekretaris
                </div>
                <div role="columnheader" className="text-left text-sm font-semibold text-slate-800 min-w-[120px]">
                  Bendahara
                </div>
                <div role="columnheader" className="text-left text-sm font-semibold text-slate-800 min-w-[120px]">
                  Status Aktif
                </div>
                <div role="columnheader" className="text-left text-sm font-semibold text-slate-800 min-w-[120px]">
                  Aksi
                </div>
              </div>
            </div>
            <div role="rowgroup">
              {structures.map((structure) => (
                <div key={structure.id} role="row" className="grid grid-cols-7 gap-6 px-4 py-3 border-b border-slate-200 odd:bg-white even:bg-slate-50 hover:bg-slate-50 transition-colors">
                  <div role="cell" className="text-sm text-slate-800 min-w-[120px]">
                    {structure.academicYear}
                  </div>
                  <div role="cell" className="text-sm text-slate-800 min-w-[120px]">
                    {structure.leader?.name || "-"}
                  </div>
                  <div role="cell" className="text-sm text-slate-800 min-w-[120px]">
                    {structure.viceLeader?.name || "-"}
                  </div>
                  <div role="cell" className="text-sm text-slate-800 min-w-[120px]">
                    {structure.secretary?.name || "-"}
                  </div>
                  <div role="cell" className="text-sm text-slate-800 min-w-[120px]">
                    {structure.treasurer?.name || "-"}
                  </div>
                  <div role="cell" className="min-w-[120px]">
                    <span className={`inline-block px-1.5 py-0.5 text-xs font-medium rounded-full ${structure.isActive ? "bg-teal-100 text-teal-800" : "bg-rose-100 text-rose-800"}`}>{structure.isActive ? "Aktif" : "Tidak Aktif"}</span>
                  </div>
                  <div role="cell" className="flex space-x-3 min-w-[120px]">
                    <Link
                      href={`/admin/organisasi/edit/${structure.id}`}
                      className="px-5 py-2.5 bg-teal-600 text-white rounded-md hover:bg-teal-700 hover:scale-105 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-transform text-sm"
                    >
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
                    >
                      <button type="submit" className="px-5 py-2.5 bg-rose-600 text-white rounded-md hover:bg-rose-700 hover:scale-105 focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 transition-transform text-sm">
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
    </div>
  );
}
