import prisma from "@/lib/prisma";

export async function getMemberPosts(id) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: parseInt(id),
        status: "DRAFT",
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      data: posts,
    };
  } catch (error) {
    console.error("Error fetching member posts:", error);
    return [];
  }
}

export async function getMemberPostById(id) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    return post;
  } catch (e) {
    console.error(e);
    return null;
  }
}
