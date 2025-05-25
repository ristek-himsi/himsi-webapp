"use server";

import { redirect } from "next/navigation";
import { loginSchema } from "@/lib/schema";
import bcrypt from "bcrypt";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

export async function signIn(_, formData) {
  try {
    // Log untuk debugging (hapus di production)
    console.log("Sign in attempt for email:", formData.get("email"));

    // Validasi input data
    const validate = loginSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!validate.success) {
      console.error("Validation failed:", validate.error.flatten());
      return {
        message: "Invalid email or password format",
      };
    }

    // Cari user di database
    let existingAdmin;
    try {
      existingAdmin = await prisma.user.findFirst({
        where: {
          email: validate.data.email,
          role: "ADMIN",
        },
      });
    } catch (dbError) {
      console.error("Database query error:", dbError);
      return {
        message: "Database connection error. Please try again later.",
      };
    }

    if (!existingAdmin) {
      console.log("User not found or not admin role");
      return {
        message: "Invalid email or password",
      };
    }

    // Validasi password
    let validatePassword;
    try {
      validatePassword = await bcrypt.compare(validate.data.password, existingAdmin.password);
    } catch (bcryptError) {
      console.error("Password comparison error:", bcryptError);
      return {
        message: "Authentication error. Please try again.",
      };
    }

    if (!validatePassword) {
      console.log("Password validation failed");
      return {
        message: "Invalid email or password",
      };
    }

    // Buat session
    let session;
    try {
      session = await lucia.createSession(existingAdmin.id, {});
    } catch (sessionError) {
      console.error("Session creation error:", sessionError);
      return {
        message: "Failed to create session. Please try again.",
      };
    }

    // Set cookie
    try {
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    } catch (cookieError) {
      console.error("Cookie setting error:", cookieError);
      return {
        message: "Failed to set authentication cookie. Please try again.",
      };
    }

    console.log("Sign in successful for user:", existingAdmin.id);

    // Redirect ke admin dashboard
    try {
      return redirect("/admin");
    } catch (redirectError) {
      console.error("Redirect error:", redirectError);
      return {
        message: "Authentication successful but failed to redirect. Please navigate to /admin manually.",
      };
    }
  } catch (error) {
    // Catch all untuk error yang tidak terduga
    console.error("Unexpected error in signIn:", error);

    // Jangan expose error details ke client di production
    if (process.env.NODE_ENV === "production") {
      return {
        message: "An unexpected error occurred. Please try again later.",
      };
    } else {
      return {
        message: `Development error: ${error.message}`,
      };
    }
  }
}
