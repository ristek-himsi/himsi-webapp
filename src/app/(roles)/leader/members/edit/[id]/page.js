import React from "react";
import { getUserById } from "@/lib/admin/data/users";
import { getImageUrl } from "@/lib/supabase";
import MemberEditForm from "@/components/admin/MemberEditForm";

const page = async ({ params }) => {
  const id = parseInt(params.id);

  const user = await getUserById(id);
  const photoPreview = getImageUrl(user.photo_url, "users");

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Halaman Edit</h1>

      <MemberEditForm user={user} photoPreview={photoPreview} />
    </div>
  );
};

export default page;
