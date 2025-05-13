"use client";

import React from "react";
import { User, Mail, Briefcase, Building, Trash } from "lucide-react";
import Link from "next/link";
import { deleteUser } from "@/lib/admin/action/users/user";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { getImageUrl } from "@/lib/supabase";

const initialState = {
  message: "",
};

const DeleteButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      size="sm"
      disabled={pending}
      className="cursor-pointer min-w-[80px]"
      variant="destructive"
    >
      <Trash className="h-3 w-3 mr-1" />
      {pending ? "Menghapus..." : "Hapus"}
    </Button>
  );
};

const FormDelete = ({ userId }) => {
  const router = useRouter();

  const deleteUserWithID = async (_, formData) => {
    const result = await deleteUser(_, formData, userId);
    if (!result?.error) router.refresh();
    return result;
  };

  const [state, formAction] = React.useActionState(deleteUserWithID, initialState);

  return (
    <form action={formAction}>
      <DeleteButton />
    </form>
  );
};

const getRoleBadgeColor = (role) => {
  switch (role) {
    case "ADMIN":
      return "bg-blue-100 text-blue-800";
    case "DIVISION_LEADER":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const UserCard = ({ user }) => {
  const photoUrl = user?.photo_url ? getImageUrl(user.photo_url, "users")
    : null;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        <div className="bg-gray-200 rounded-full p-2 mr-3">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={user.name}
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover"
            />
          ) : (
            <User className="h-6 w-6 sm:h-8 sm:w-8 text-gray-500" />
          )}
        </div>
        <div>
          <h3 className="font-medium text-base sm:text-lg">{user.name}</h3>
          <div
            className={`inline-block px-2 py-1 text-xs sm:text-sm rounded-full font-medium ${getRoleBadgeColor(
              user.role
            )}`}
          >
            {user.role === "ADMIN" ? "Admin" : user.role === "DIVISION_LEADER" ? "Pemimpin Divisi" : "Member"}
          </div>
        </div>
      </div>

      <div className="space-y-2 text-base text-gray-600">
        <div className="flex items-center">
          <Mail className="h-4 w-4 mr-2" />
          <span>{user.email}</span>
        </div>
        {user.position && (
          <div className="flex items-center">
            <Briefcase className="h-4 w-4 mr-2" />
            <span>{user.position}</span>
          </div>
        )}
        {user.division && (
          <div className="flex items-center">
            <Building className="h-4 w-4 mr-2" />
            <span>{user.division.name}</span>
          </div>
        )}
        <div className="flex items-center">
          <Briefcase className="h-4 w-4 mr-2" />
          <span>ID: {user.id}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end space-x-3">
        <Link href={`/admin/users/${user.id}`}>
          <Button size="sm" variant="outline" className="min-w-[80px]">
            Edit
          </Button>
        </Link>
        <FormDelete userId={user.id} />
      </div>
    </div>
  );
};

export default UserCard;