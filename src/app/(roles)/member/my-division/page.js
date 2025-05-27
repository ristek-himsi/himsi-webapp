import React from "react";
import { getUser } from "@/lib/auth";
import { getUserById } from "@/lib/admin/data/users";
import { getDivisionDetail } from "../../admin/divisions/libs/data";
import Image from "next/image";
import { getImageUrl } from "@/lib/supabase";
import ProgramCard from "./components/ProgramCard";

const page = async () => {
  const { user } = await getUser();
  const userData = await getUserById(user?.id);
  const divisionDetail = await getDivisionDetail(userData?.divisionId);
  console.log(divisionDetail);

  // Filter and sort upcoming programs by start date (nearest first)
  const upcomingPrograms = divisionDetail?.programs?.filter((program) => program.status === "UPCOMING")?.sort((a, b) => new Date(a.startDate) - new Date(b.startDate)) || [];

  if (!divisionDetail) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Divisi Tidak Ditemukan</h1>
          <p className="text-gray-600">Mohon hubungi administrator untuk bantuan</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3 sm:mb-4">Halaman Divisi Saya</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
          </div>

          {/* Division Info Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
                {/* Logo */}
                {divisionDetail.logoUrl && (
                  <div className="flex-shrink-0 mx-auto lg:mx-0">
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                      <Image src={getImageUrl(divisionDetail.logoUrl, "divisi")} alt={`Logo ${divisionDetail.name}`} width={120} height={120} className="relative rounded-2xl object-cover shadow-2xl ring-2 ring-white/20" />
                    </div>
                  </div>
                )}

                {/* Division Details */}
                <div className="flex-1 text-center lg:text-left text-white">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">{divisionDetail.name}</h2>
                  <p className="text-blue-100 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">{divisionDetail.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="text-blue-200 text-sm font-medium mb-1">Leader</div>
                      <div className="text-white font-semibold text-lg">{divisionDetail.leader?.name || "Belum ditentukan"}</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="text-blue-200 text-sm font-medium mb-1">Total Anggota</div>
                      <div className="text-white font-semibold text-lg">{divisionDetail.users?.length || 0} orang</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="text-blue-200 text-sm font-medium mb-1">Dibuat</div>
                      <div className="text-white font-semibold">{new Date(divisionDetail.createdAt).toLocaleDateString("id-ID")}</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="text-blue-200 text-sm font-medium mb-1">Update Terakhir</div>
                      <div className="text-white font-semibold">{new Date(divisionDetail.updatedAt).toLocaleDateString("id-ID")}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vision & Mission */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Vision */}
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Visi</h3>
              </div>
              <div className="text-gray-600 leading-relaxed">
                {divisionDetail.vision && divisionDetail.vision !== "-" ? <p className="text-base sm:text-lg">{divisionDetail.vision}</p> : <p className="italic text-gray-400">Visi belum ditetapkan</p>}
              </div>
            </div>

            {/* Mission */}
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Misi</h3>
              </div>
              <div className="text-gray-600 leading-relaxed">
                {divisionDetail.mission && divisionDetail.mission !== "-" ? <p className="text-base sm:text-lg">{divisionDetail.mission}</p> : <p className="italic text-gray-400">Misi belum ditetapkan</p>}
              </div>
            </div>
          </div>

          {/* Leader Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 sm:p-8">
            <div className="flex items-center mb-6 sm:mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Ketua Divisi</h3>
            </div>

            {divisionDetail.leader ? (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                  {divisionDetail.leader.photo_url && (
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                      <Image src={getImageUrl(divisionDetail.leader.photo_url, "users")} alt={divisionDetail.leader.name} width={80} height={80} className="relative rounded-full object-cover ring-2 ring-white shadow-lg" />
                    </div>
                  )}
                  <div className="text-center sm:text-left">
                    <h4 className="text-xl font-bold text-gray-800 mb-1">{divisionDetail.leader.name}</h4>
                    <p className="text-gray-600 mb-2">{divisionDetail.leader.email}</p>
                    <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold rounded-full shadow-md">{divisionDetail.leader.position}</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-400 italic text-center py-8">Ketua divisi belum ditentukan</p>
            )}
          </div>

          {/* Members Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 sm:p-8">
            <div className="flex items-center mb-6 sm:mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Anggota Divisi ({divisionDetail.users?.length || 0})</h3>
            </div>

            {divisionDetail.users && divisionDetail.users.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {divisionDetail.users.map((member) => (
                  <div key={member.id} className="group bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 sm:p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200">
                    <div className="flex flex-col items-center text-center">
                      {member.photo_url ? (
                        <div className="relative mb-4">
                          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-0 group-hover:opacity-75 transition duration-300"></div>
                          <Image src={getImageUrl(member.photo_url, "users")} alt={member.name} width={60} height={60} className="relative rounded-full object-cover ring-2 ring-white shadow-md" />
                        </div>
                      ) : (
                        <div className="w-15 h-15 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center mb-4">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                      )}
                      <h4 className="font-bold text-gray-800 text-sm sm:text-base mb-1 line-clamp-2">{member.name}</h4>
                      <p className="text-gray-600 text-xs mb-3 line-clamp-1">{member.email}</p>
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${
                          member.role === "DIVISION_LEADER" ? "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border border-purple-200" : "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200"
                        }`}
                      >
                        {member.position}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <p className="text-gray-400 italic">Belum ada anggota terdaftar</p>
              </div>
            )}
          </div>

          {/* Programs Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 sm:p-8">
            <div className="flex items-center mb-6 sm:mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Program Kerja Mendatang ({upcomingPrograms.length})</h3>
            </div>

            {upcomingPrograms.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {upcomingPrograms.map((program) => (
                  <ProgramCard key={program.id} program={program} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-gray-400 italic">Belum ada program kerja mendatang</p>
              </div>
            )}
          </div>

          {/* Achievements Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 sm:p-8">
            <div className="flex items-center mb-6 sm:mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Prestasi ({divisionDetail.achievements?.length || 0})</h3>
            </div>

            {divisionDetail.achievements && divisionDetail.achievements.length > 0 ? (
              <div className="space-y-4 sm:space-y-6">
                {divisionDetail.achievements.map((achievement, index) => (
                  <div key={index} className="group bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border-l-4 border-yellow-500 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <h4 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-yellow-700 transition-colors">{achievement.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{achievement.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <p className="text-gray-400 italic">Belum ada prestasi</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
