"use client";

import React from "react";

export const ProgramFilter = ({ selectedStatus, setSelectedStatus }) => {
  const statuses = [
    { value: "ALL", label: "Semua" },
    { value: "UPCOMING", label: "Akan Datang" },
    { value: "ONGOING", label: "Berlangsung" },
    { value: "COMPLETED", label: "Selesai" },
  ];

  return (
    <div className="mb-6">
      <div className="flex flex-wrap justify-center gap-2">
        {statuses.map((status) => (
          <button
            key={status.value}
            onClick={() => setSelectedStatus(status.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
              selectedStatus === status.value
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {status.label}
          </button>
        ))}
      </div>
    </div>
  );
};