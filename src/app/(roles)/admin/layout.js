import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminNavbar from "@/components/admin/AdminNavbar";

export default async function AdminLayout({ children }) {
  const { user, session } = await getUser();

  // Redirect if no session or not admin
  if (!session || user?.role !== "ADMIN") {
    redirect("/auth/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AdminNavbar user={user} />
      <main className="flex-1">
        <div className="max-w-full mx-auto">{children}</div>
      </main>
      <footer className="bg-white border-t border-gray-200 py-4 mt-auto">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">© {new Date().getFullYear()} HIMSI Admin Panel. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
