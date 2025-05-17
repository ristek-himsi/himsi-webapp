import { Suspense } from "react";
import { LoginFormAdmin } from "@/components/login-form";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Loading from "@/app/loading";

// Admin auth check component
async function AdminAuthCheck({ children }) {
  const { session, user } = await getUser();

  if (session && user?.role === "ADMIN") {
    return redirect("/admin");
  }

  return children;
}

export default function AdminPage() {
  return (
    <Suspense fallback={<Loading />}>
      <AdminAuthContent />
    </Suspense>
  );
}

// This component contains the async logic
async function AdminAuthContent() {
  return (
    <AdminAuthCheck>
      <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-10">
        <div className="w-full max-w-md">
          <LoginFormAdmin />
        </div>
      </div>
    </AdminAuthCheck>
  );
}
