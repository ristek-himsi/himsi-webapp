"use client";

import React from "react";
import Image from "next/image";
import { getImageUrl } from "@/lib/supabase";
import { format } from "date-fns";

const DivisionDetailContent = ({ division }) => {
  // Menghitung jumlah anggota dan program
  const memberCount = division.users ? division.users.length : 0;
  const programCount = division.programs ? division.programs.length : 0;
  const achievementCount = division.achievements ? division.achievements.length : 0;

  return (
    <div className="p-6 mt-14">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Detail Divisi</h1>
        <p className="text-gray-600 mt-2">Informasi lengkap tentang divisi dan anggotanya</p>
      </div>

      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Logo */}
          <div className="relative w-32 h-32 rounded-lg overflow-hidden">
            {division.logoUrl ? (
              <Image 
                src={getImageUrl(division.logoUrl, "divisi")} 
                alt={division.name} 
                width={128} 
                height={128} 
                className="object-cover w-full h-full" 
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No Logo</span>
              </div>
            )}
          </div>

          {/* Division Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold mb-2">{division.name}</h1>
            <p className="text-gray-600 mb-4">{division.description}</p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <div className="bg-blue-50 px-3 py-1 rounded-full text-blue-700 text-sm">{memberCount} Anggota</div>
              <div className="bg-green-50 px-3 py-1 rounded-full text-green-700 text-sm">{programCount} Program</div>
              <div className="bg-purple-50 px-3 py-1 rounded-full text-purple-700 text-sm">{achievementCount} Prestasi</div>
            </div>
          </div>
        </div>

        {/* Vision & Mission */}
        {(division.vision !== "-" || division.mission !== "-") && (
          <div className="mt-6 grid md:grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <h3 className="font-semibold mb-2">Visi</h3>
              <p className="text-gray-700">{division.vision !== "-" ? division.vision : "Belum ada visi yang ditetapkan"}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Misi</h3>
              <p className="text-gray-700">{division.mission !== "-" ? division.mission : "Belum ada misi yang ditetapkan"}</p>
            </div>
          </div>
        )}
      </div>

      {/* Leader Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Ketua Divisi</h2>
        {division.leader ? (
          <div className="flex items-center">
            <div className="mr-4 relative w-16 h-16 rounded-full overflow-hidden">
              {division.leader.photo_url ? (
                <Image 
                  src={getImageUrl(division.leader.photo_url, "users")} 
                  alt={division.leader.name} 
                  width={64} 
                  height={64} 
                  className="rounded-full object-cover" 
                />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-500 text-xs">No Pic</span>
                </div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{division.leader.name}</h3>
              <p className="text-gray-600">{division.leader.position}</p>
              <p className="text-gray-500 text-sm">{division.leader.email}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-600">Belum ada ketua divisi</p>
        )}
      </div>

      {/* Members Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Anggota ({memberCount})</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {division.users &&
            division.users.map((user) => (
              <div key={user.id} className="flex items-center p-3 border rounded-lg">
                <div className="mr-3 relative w-12 h-12 rounded-full overflow-hidden">
                  {user.photo_url ? (
                    <Image 
                      src={getImageUrl(user.photo_url, "users")} 
                      alt={user.name} 
                      width={48} 
                      height={48} 
                      className="rounded-full object-cover" 
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-gray-500 text-xs">No Pic</span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-gray-600 text-sm">{user.position}</p>
                </div>
                {user.role === "DIVISION_LEADER" && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Ketua</span>
                )}
              </div>
            ))}
        </div>
      </div>

      {/* Programs Section */}
      {division.programs && division.programs.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Program ({programCount})</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {division.programs.map((program) => (
              <div key={program.id} className="border rounded-lg overflow-hidden">
                <div className="relative h-48">
                  {program.imageUrl ? (
                    <Image 
                      src={getImageUrl(program.imageUrl, "programs")} 
                      alt={program.name} 
                      fill
                      className="object-cover" 
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <span 
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        program.status === "COMPLETED" 
                          ? "bg-green-100 text-green-800" 
                          : program.status === "ONGOING" 
                          ? "bg-blue-100 text-blue-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {program.status}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{program.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{program.description}</p>

                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Mulai: {format(new Date(program.startDate), "dd MMM yyyy")}</span>
                    <span>Selesai: {format(new Date(program.endDate), "dd MMM yyyy")}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Achievements Section */}
      {division.achievements && division.achievements.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Prestasi ({achievementCount})</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {division.achievements.map((achievement) => (
              <div key={achievement.id} className="border rounded-lg overflow-hidden">
                <div className="relative h-40">
                  {achievement.imageUrl ? (
                    <Image 
                      src={getImageUrl(achievement.imageUrl, "achievements")} 
                      alt={achievement.title} 
                      fill
                      className="object-cover" 
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-semibold mb-2">{achievement.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{achievement.description}</p>
                  <p className="text-xs text-gray-500">{format(new Date(achievement.date), "dd MMMM yyyy")}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DivisionDetailContent;