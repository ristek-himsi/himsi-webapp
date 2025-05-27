import React from "react";
import { getUserById } from "@/lib/admin/data/users";
import EditUserForm from "../../components/EditUserForm";

const EditUserPage = async ({ params }) => {
  const id = parseInt(params.id);
  const user = await getUserById(id);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-500">User tidak ditemukan</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile User</h1>

          <EditUserForm user={user} />
        </div>
      </div>
    </div>
  );
};

export default EditUserPage;
