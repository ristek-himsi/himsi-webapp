"use server";

import { redirect } from "next/navigation";
import { loginSchema } from "@/lib/schema";
import bcrypt from "bcrypt";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function signIn(_, formData) {
  try {
    const validate = loginSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!validate.success) {
      return { message: "Email atau kata sandi tidak valid" };
    }

    const existingAdmin = await prisma.user.findFirst({
      where: {
        email: validate.data.email,
        role: "ADMIN",
      },
    });

    if (!existingAdmin) {
      return { message: "Email atau kata sandi tidak valid" };
    }

    if (!existingAdmin.password) {
      return { message: "Akun tidak memiliki kata sandi yang valid" };
    }

    const validatePassword = await bcrypt.compare(validate.data.password, existingAdmin.password);

    if (!validatePassword) {
      return { message: "Email atau kata sandi tidak valid" };
    }

    const session = await lucia.createSession(existingAdmin.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return redirect("/admin");
  } catch (error) {
    console.error("Error saat login:", error);
    return { message: "Terjadi kesalahan server. Silakan coba lagi." };
  }
}
