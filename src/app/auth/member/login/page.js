import { Suspense } from "react";
import { LoginFormMember } from "@/components/LoginFormMember";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Loading from "@/app/loading";

// Member auth check component
async function MemberAuthCheck({ children }) {
  const { session, user } = await getUser();

  if (session && user?.role === "MEMBER") {
    return redirect("/member");
  }

  return children;
}

export default function MemberPage() {
  return (
    <Suspense fallback={<Loading />}>
      <MemberAuthContent />
    </Suspense>
  );
}

// This component contains the async logic
async function MemberAuthContent() {
  return (
    <MemberAuthCheck>
      <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-10">
        <div className="w-full max-w-md">
          <LoginFormMember />
        </div>
      </div>
    </MemberAuthCheck>
  );
}
