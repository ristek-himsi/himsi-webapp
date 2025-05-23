"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

const TimeFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  
  const currentTimeFilter = searchParams.get("timeFilter") || "ALL";
  const currentCategory = searchParams.get("category") || "ALL";

  // Simplified time filter options - only essential ones
  const timeFilterOptions = [
    { value: "ALL", label: "Semua Waktu", icon: "🕒" },
    { value: "TODAY", label: "Hari Ini", icon: "📅" },
    { value: "THIS_WEEK", label: "Minggu Ini", icon: "📆" },
    { value: "THIS_MONTH", label: "Bulan Ini", icon: "🗓️" },
    { value: "THIS_YEAR", label: "Tahun Ini", icon: "📊" },
  ];

  const handleTimeFilterChange = (timeFilter) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      
      if (timeFilter === "ALL") {
        params.delete("timeFilter");
      } else {
        params.set("timeFilter", timeFilter);
      }
      
      // Reset to first page when filter changes
      params.delete("page");
      
      // Preserve category filter
      if (currentCategory !== "ALL") {
        params.set("category", currentCategory);
      }
      
      const queryString = params.toString();
      const url = queryString ? `?${queryString}` : window.location.pathname;
      
      router.push(url);
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
        <svg 
          className="w-4 h-4 mr-2 text-gray-500" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
        Filter Berdasarkan Waktu
      </h3>
      
      {/* Desktop View */}
      <div className="hidden sm:flex flex-wrap gap-2">
        {timeFilterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleTimeFilterChange(option.value)}
            disabled={isPending}
            className={`
              px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
              ${currentTimeFilter === option.value
                ? "bg-indigo-100 text-indigo-700 border-2 border-indigo-200"
                : "bg-gray-50 text-gray-700 border-2 border-transparent hover:bg-gray-100 hover:border-gray-200"
              }
              ${isPending ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
              flex items-center space-x-1
            `}
          >
            <span>{option.icon}</span>
            <span>{option.label}</span>
            {currentTimeFilter === option.value && (
              <svg 
                className="w-4 h-4 ml-1" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path 
                  fillRule="evenodd" 
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                  clipRule="evenodd" 
                />
              </svg>
            )}
          </button>
        ))}
      </div>

      {/* Mobile View */}
      <div className="sm:hidden">
        <select
          value={currentTimeFilter}
          onChange={(e) => handleTimeFilterChange(e.target.value)}
          disabled={isPending}
          className={`
            w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
            bg-white text-gray-700
            ${isPending ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          `}
        >
          {timeFilterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.icon} {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Loading indicator */}
      {isPending && (
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <svg 
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-indigo-500" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Memuat...
        </div>
      )}

      {/* Current filter info */}
      {currentTimeFilter !== "ALL" && (
        <div className="mt-3 p-2 bg-blue-50 rounded-md">
          <p className="text-xs text-blue-700 flex items-center">
            <svg 
              className="w-3 h-3 mr-1" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
                clipRule="evenodd" 
              />
            </svg>
            Menampilkan artikel untuk: {timeFilterOptions.find(opt => opt.value === currentTimeFilter)?.label}
          </p>
        </div>
      )}
    </div>
  );
};

export default TimeFilter;