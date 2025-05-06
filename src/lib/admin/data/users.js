import prisma from "@/lib/prisma";

export async function getAllUser() {
  return await prisma.user.findMany({
    where: { deletedAt: null },
    include: { division: true },
  });
}

export async function getUserById(id) {
  const user = prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return user;
}
