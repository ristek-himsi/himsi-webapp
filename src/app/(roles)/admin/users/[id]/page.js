import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import UserEditForm from "@/components/admin/UserEditForm";

async function getUserById(id) {
  return await prisma.user.findFirst({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      divisionId: true,
      position: true,
      photo_url: true,
    },
  });
}

export default async function EditUserPage({ params }) {
  // Validasi params.id
  const id = parseInt(params.id);
  console.log("User ID:", id);

  if (isNaN(id)) {
    notFound();
  }

  // Ambil data pengguna
  const user = await getUserById(id);
  if (!user) {
    notFound();
  }
  console.log("User data:", user);

  // Ambil data divisi
  const divisions = await prisma.division.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Pengguna</h1>
      <UserEditForm user={user} divisions={divisions} />
    </div>
  );
}
