import prisma from "@/lib/prisma";
import OrganizationStructureForm from "@/components/admin/OrganizationStructureForm";

async function getUsers() {
  return await prisma.user.findMany({
    where: { role: { in: ["ADMIN", "DIVISION_LEADER"] } },
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });
}

export default async function AddOrganizationStructurePage() {
  const users = await getUsers();
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Tambah Struktur Organisasi</h1>
      <OrganizationStructureForm users={users} />
    </div>
  );
}
