import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
export default async function RootLayout({ children }) {
  const { session, user } = await getUser();

  if (!session || user.role !== "MEMBER") {
    return redirect("/auth/member/login");
  }

  return (
    <div className="scroll-smooth">
      <div className="font-inter text-gray-900 bg-gray-50">
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">{children}</main>
          {/* <Footer /> */}
        </div>
      </div>
    </div>
  );
}
