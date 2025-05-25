"use server";

import { redirect } from "next/navigation";
import { loginSchema } from "@/lib/schema";
import bcrypt from "bcrypt";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";

export async function signInMember(_, formData) {
  try {
    // Log untuk debugging (hapus di production)
    console.log("Member sign in attempt for email:", formData.get("email"));

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

    // Cari member di database
    let existingMember;
    try {
      existingMember = await prisma.user.findFirst({
        where: {
          email: validate.data.email,
          role: "MEMBER",
        },
      });
    } catch (dbError) {
      console.error("Database query error:", dbError);
      return {
        message: "Database connection error. Please try again later.",
      };
    }

    if (!existingMember) {
      console.log("Member not found or incorrect role");
      return {
        message: "Invalid email or password",
      };
    }

    // Validasi password menggunakan async version
    let validatePassword;
    try {
      validatePassword = await bcrypt.compare(validate.data.password, existingMember.password);
    } catch (bcryptError) {
      console.error("Password comparison error:", bcryptError);
      return {
        message: "Authentication error. Please try again.",
      };
    }

    if (!validatePassword) {
      console.log("Password validation failed for member");
      return {
        message: "Invalid email or password",
      };
    }

    // Buat session
    let session;
    try {
      session = await lucia.createSession(existingMember.id, {
        // Optional: tambah metadata untuk member session
        userRole: "MEMBER",
        loginTime: new Date().toISOString(),
      });
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

    console.log("Member sign in successful for user:", existingMember.id);

    // Redirect ke member dashboard
    try {
      return redirect("/member");
    } catch (redirectError) {
      console.error("Redirect error:", redirectError);
      return {
        message: "Authentication successful but failed to redirect. Please navigate to /member manually.",
      };
    }
  } catch (error) {
    // Catch all untuk error yang tidak terduga
    console.error("Unexpected error in signInMember:", error);

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
