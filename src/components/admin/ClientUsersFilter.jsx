"use client";

import React, { useState } from "react";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import UserCard from "@/components/admin/UserCard";

const ClientUsersFilter = ({ users }) => {
  const [roleFilter, setRoleFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter users based on role and search query
  const filteredUsers = users.filter((user) => {
    const matchesRole = roleFilter ? user.role === roleFilter : true;
    const matchesSearch = searchQuery
      ? user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesRole && matchesSearch;
  });

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">User Management</h1>
        <Link href="/admin/users/create">
          <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-1" />
            Add User
          </button>
        </Link>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row items-center bg-white rounded-lg shadow-sm px-4 py-3 gap-4">
        <div className="flex items-center w-full sm:flex-1">
          <Search className="h-5 w-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full outline-none bg-transparent text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="w-full sm:w-auto p-2 border border-gray-300 rounded-md bg-white text-base"
        >
          <option value="">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="DIVISION_LEADER">Division Leader</option>
          <option value="MEMBER">Member</option>
        </select>
      </div>

      <div className="mb-4 flex text-base">
        <span className="font-medium text-gray-500">Total users: {filteredUsers.length}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </>
  );
};

export default ClientUsersFilter;