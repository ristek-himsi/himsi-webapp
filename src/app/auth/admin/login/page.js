import { LoginFormAdmin } from "@/components/login-form";

export default function AdminPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-10">
      <div className="w-full max-w-md">
        <LoginFormAdmin />
      </div>
    </div>
  );
}
