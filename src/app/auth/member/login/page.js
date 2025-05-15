// Member Page Component
import { LoginFormMember } from "@/components/LoginFormMember";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function MemberPage() {
  const { session, user } = await getUser();

  if (session && user?.role === "MEMBER") {
    return redirect("/member");
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-10">
      <div className="w-full max-w-md">
        <LoginFormMember />
      </div>
    </div>
  );
}
