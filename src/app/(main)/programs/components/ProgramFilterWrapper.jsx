"use client";

import React, { useState } from "react";
import { ProgramCard } from "./ProgramCard";
import { ProgramFilter } from "./ProgramFilter";

export const ProgramFilterWrapper = ({ initialPrograms }) => {
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  
  const filteredPrograms = selectedStatus === "ALL" 
    ? initialPrograms 
    : initialPrograms.filter(program => program.status === selectedStatus);

  // Helper function untuk teks status
  const getStatusText = (status) => {
    switch (status) {
      case "UPCOMING":
        return "yang akan datang";
      case "ONGOING":
        return "yang sedang berlangsung";
      case "COMPLETED":
        return "yang telah selesai";
      default:
        return "";
    }
  };

  return (
    <>
      <ProgramFilter 
        selectedStatus={selectedStatus} 
        setSelectedStatus={setSelectedStatus} 
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrograms.length > 0 ? (
          filteredPrograms.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">
              Tidak ada program {selectedStatus !== "ALL" && getStatusText(selectedStatus)} yang ditemukan
            </p>
          </div>
        )}
      </div>
    </>
  );
};