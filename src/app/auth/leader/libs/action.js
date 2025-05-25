"use server";

import { redirect } from "next/navigation";
import { loginSchema } from "@/lib/schema";
import bcrypt from "bcrypt";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

export async function signInLeader(_, formData) {
  try {
    console.log(formData.get("email"));

    const validate = loginSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!validate.success) {
      return {
        message: "Invalid email or password",
      };
    }

    const existingAdmin = await prisma.user.findFirst({
      where: {
        email: validate.data.email,
        role: "DIVISION_LEADER",
      },
    });

    if (!existingAdmin) {
      return {
        message: "Invalid email or password",
      };
    }

    const validatePassword = bcrypt.compareSync(validate.data.password, existingAdmin.password);

    if (!validatePassword) {
      return {
        message: "Invalid email or password",
      };
    }

    const session = await lucia.createSession(existingAdmin.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return redirect("/leader");
  } catch (error) {
    console.error("Sign in error:", error);
    return {
      message: "An error occurred during sign in. Please try again.",
    };
  }
}
