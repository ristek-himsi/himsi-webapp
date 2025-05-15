"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { getImageUrl } from "@/lib/supabase";
import ProgramDeleteForm from "@/app/(roles)/admin/programs/components/ProgramDeleteForm";

// Program Card Component
export const ProgramCard = ({ program }) => {
  const previewImage = getImageUrl(program.imageUrl, "programs")
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={previewImage || "/placeholder-image.jpg"}
          alt={program.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{program.name}</h3>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            program.status === "UPCOMING" ? "bg-blue-100 text-blue-800" : 
            program.status === "ONGOING" ? "bg-green-100 text-green-800" : 
            "bg-gray-100 text-gray-800"
          }`}>
            {program.status}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{program.description}</p>
        
        <div className="text-xs text-gray-500 mb-3">
          <div className="flex items-center mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(program.startDate)} - {formatDate(program.endDate)}
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            {program.division.name}
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
           {/* disini */}
           <ProgramDeleteForm id={program.id} />
          <Link href={`/admin/programs/${program.id}`}>
            <Button variant="outline" size="sm" className="text-xs cursor-pointer">
              Detail
            </Button>
          </Link>
          <Link href={`/admin/programs/edit/${program.id}`}>
            <Button variant="default" size="sm" className="text-xs cursor-pointer">
              Edit
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Main Page Component