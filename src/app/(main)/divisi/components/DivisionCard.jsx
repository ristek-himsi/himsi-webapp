"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/lib/supabase";

const DivisionCard = ({ division }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 bg-gray-100">
        {division.logoUrl ? (
          <Image 
            src={getImageUrl(division.logoUrl, "divisi")} 
            alt={division.name} 
            fill
            className="object-cover" 
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full bg-gray-200">
            <span className="text-gray-500">No Logo</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{division.name}</h2>
        <p className="text-gray-600 mb-4">{division.description}</p>

        <div className="border-t pt-4">
          <div className="flex items-center mb-3">
            {division.leader && division.leader.photo_url ? (
              <div className="mr-3 relative w-10 h-10 rounded-full overflow-hidden">
                <Image 
                  src={getImageUrl(division.leader.photo_url, "users")} 
                  alt={division.leader.name} 
                  width={40} 
                  height={40} 
                  className="rounded-full" 
                />
              </div>
            ) : (
              <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 flex items-center justify-center">
                <span className="text-gray-500 text-xs">No Pic</span>
              </div>
            )}

            <div>
              <p className="font-medium">{division.leader ? division.leader.name : "No Leader"}</p>
              <p className="text-sm text-gray-500">{division.leader ? division.leader.position : ""}</p>
            </div>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">{division.memberCount} Anggota</span>
            <span className="text-gray-600">{division.programCount} Program</span>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <Link 
            href={`/divisi/${division.id}`} 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Lihat Detail
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DivisionCard;