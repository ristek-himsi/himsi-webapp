import React from "react";
import { getUser } from "@/lib/auth";
import { getUserById } from "@/lib/admin/data/users";
import { getDivisionById } from "../../leader/division/libs/data";
import { User, Mail, Shield, Calendar, MapPin, Trophy } from "lucide-react";
import { getImageUrl } from "@/lib/supabase";
import Link from "next/link";

const page = async () => {
  const { user } = await getUser();
  const userData = await getUserById(user?.id);
  const division = await getDivisionById(parseInt(userData?.divisionId));
  console.log(userData);

  // Format tanggal
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Mendapatkan initial dari nama
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Profil Member</h1>
          <p className="text-gray-600">Kelola dan sesuaikan informasi profil Anda</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header with gradient background */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-32 relative">
            <div className="absolute inset-0 bg-black opacity-10"></div>
          </div>

          {/* Profile Content */}
          <div className="relative px-8 pb-8">
            {/* Profile Picture */}
            <div className="flex justify-center -mt-16 mb-6">
              <div className="relative">
                {userData.photo_url ? (
                  <img src={getImageUrl(userData.photo_url, "users")} alt={userData.name} className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover" />
                ) : (
                  <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">{getInitials(userData.name)}</span>
                  </div>
                )}
                {/* Status badge */}
                <div className="absolute bottom-2 right-2 w-8 h-8 bg-green-500 rounded-full border-3 border-white flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{userData.name}</h2>
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${userData.role === "MEMBER" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"}`}>{userData.role}</span>
                {userData.position && <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">{userData.position}</span>}
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Informasi Kontak
                </h3>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-800">{userData.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Aktivitas
                </h3>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="mb-3">
                    <p className="text-sm text-gray-500">Bergabung Sejak</p>
                    <p className="font-medium text-gray-800">{formatDate(userData.createdAt)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            {userData.divisionId && (
              <div className="mt-6">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Divisi</p>
                      <p className="font-medium text-gray-800"> {division.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href={`/member/profile/edit/${userData.id}`}>
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
                  Edit Profil
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Status Akun</p>
                <p className="text-2xl font-bold text-green-600">Aktif</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Posisi</p>
                <p className="text-2xl font-bold text-blue-600">{userData.position}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Member Sejak</p>
                <p className="text-2xl font-bold text-purple-600">{new Date(userData.createdAt).getFullYear()}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
