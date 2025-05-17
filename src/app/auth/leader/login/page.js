import { Suspense } from "react";
import { LoginFormLeader } from "@/components/LoginFormLeader";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Loading from "@/app/loading";

// Leader auth check component
async function LeaderAuthCheck({ children }) {
  const { session, user } = await getUser();

  if (session && user?.role === "DIVISION_LEADER") {
    return redirect("/leader");
  }

  return children;
}

export default function LeaderPage() {
  return (
    <Suspense fallback={<Loading />}>
      <LeaderAuthContent />
    </Suspense>
  );
}

// This component contains the async logic
async function LeaderAuthContent() {
  return (
    <LeaderAuthCheck>
      <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-10">
        <div className="w-full max-w-md">
          <LoginFormLeader />
        </div>
      </div>
    </LeaderAuthCheck>
  );
}
