import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import OrganizationStructureForm from "@/components/admin/OrganizationStructureForm";
import { getUserById } from "@/lib/admin/data/users";

async function getOrganizationStructure(id) {
  return await prisma.organizationStructure.findUnique({
    where: { id },
    include: {
      leader: { select: { name: true } },
      viceLeader: { select: { name: true } },
      secretary: { select: { name: true } },
      treasurer: { select: { name: true } },
    },
  });
}

async function getUsers() {
  return await prisma.user.findMany({
    where: { role: { in: ["ADMIN", "DIVISION_LEADER"] } },
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });
}

export default async function EditOrganizationStructurePage({ params }) {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    notFound();
  }

  const structure = await getOrganizationStructure(id);
  const users = await getUsers();
  const user = await getUserById(id);

  if (!structure) {
    notFound();
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Struktur Organisasi</h1>
      <OrganizationStructureForm user={user} users={users} structure={structure} />
    </div>
  );
}
