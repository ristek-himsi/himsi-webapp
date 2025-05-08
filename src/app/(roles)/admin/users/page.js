"use server";

import React from "react";
import { getAllUser } from "@/lib/admin/data/users";
import ClientUsersFilter from "@/components/admin/ClientUsersFilter";

// Server component to fetch users and render the client-side filter component
const AdminUsersPage = async () => {
  const users = await getAllUser();

  return (
    <div className="p-4 sm:p-6">
      <ClientUsersFilter users={users} />
    </div>
  );
};

export default AdminUsersPage;
