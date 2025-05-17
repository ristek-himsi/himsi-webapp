import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import MemberNavbar from "@/components/admin/MemberNavbar";

export default async function AdminLayout({ children }) {
  const { user, session } = await getUser();

  // Redirect if no session or not admin
  if (!session || user?.role !== "MEMBER") {
    redirect("/auth/member/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <MemberNavbar user={user} />
      <main className="flex-grow py-4 sm:py-6">
        <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-8">{children}</div>
      </main>
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">© {new Date().getFullYear()} HIMSI Member Panel. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
