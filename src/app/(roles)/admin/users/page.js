"use server";

import React, { Suspense } from "react";
import { getAllUser } from "@/lib/admin/data/users";
import ClientUsersFilter from "@/components/admin/ClientUsersFilter";
import Loading from "@/app/loading";

// Component to fetch and render users
const UsersContent = async () => {
  const users = await getAllUser();

  return <ClientUsersFilter users={users} />;
};

// Server component with loading state
const AdminUsersPage = () => {
  return (
    <div className="p-4 sm:p-6">
      <Suspense fallback={<Loading />}>
        <UsersContent />
      </Suspense>
    </div>
  );
};

export default AdminUsersPage;
