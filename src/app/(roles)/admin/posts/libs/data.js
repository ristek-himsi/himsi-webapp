"use server";

import prisma from "@/lib/prisma";

export async function getAllPosts() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            photo_url: true,
          },
        },
        tags: {
          select: {
            tag: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    const transformedPosts = posts.map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      imageUrl: post.imageUrl,
      category: post.category,
      status: post.status,
      publishedAt: post.publishedAt,
      author: post.author,
      tags: post.tags.map((pt) => pt.tag),
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }));

    return { success: true, data: transformedPosts };
  } catch (e) {
    console.error("Error fetching posts:", e.message);
    return { success: false, message: "Failed to fetch posts" };
  }
}

export async function getPostDetail(id) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            photo_url: true,
          },
        },
        tags: {
          select: {
            tag: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!post) {
      return { success: false, message: "Post not found" };
    }

    const transformedPost = {
      id: post.id,
      title: post.title,
      content: post.content,
      imageUrl: post.imageUrl,
      category: post.category,
      status: post.status,
      publishedAt: post.publishedAt,
      author: post.author,
      tags: post.tags.map((pt) => pt.tag),
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };

    return { success: true, data: transformedPost };
  } catch (e) {
    console.error("Error fetching post detail:", e.message);
    return { success: false, message: "Failed to fetch post detail" };
  }
}
