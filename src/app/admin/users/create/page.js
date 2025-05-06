import UserAddForm from "@/components/admin/UserAddForm";
import prisma from "@/lib/prisma";

async function getDivisions() {
  return await prisma.division.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });
}

export default async function AddUserPage() {
  const divisions = await getDivisions();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Tambah Pengguna Baru</h1>
      <div className="max-w-2xl">
        <UserAddForm divisions={divisions} />
      </div>
    </div>
  );
}
