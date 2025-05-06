"use server";

import { redirect } from "next/navigation";
import { getUser, lucia } from "@/lib/auth";
import { cookies } from "next/headers";

export async function logout(_, formData) {
  const { session } = await getUser();

  if (!session) {
    return {
      error: "Unauthorized",
    };
  }
  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  return redirect("/auth/admin/login");
}
