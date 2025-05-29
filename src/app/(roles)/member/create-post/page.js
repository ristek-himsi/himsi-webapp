import React from "react";
import { getUser } from "@/lib/auth";
import { getUserById } from "@/lib/admin/data/users";
import CreateArticleForm from "./components/CreateArticleForm";

const page = async () => {
  const { user } = await getUser();
  const userData = await getUserById(parseInt(user?.id));
  console.log(userData);

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8">
        <CreateArticleForm userData={userData} />
      </div>
    </div>
  );
};

export default page;
