"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const CategoryFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "ALL";
  
  // Add loading state
  const [isLoading, setIsLoading] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState(null);

  // Define categories based on POST_CATEGORY enum from Prisma schema
  const categories = ["ALL", "NEWS", "ANNOUNCEMENT", "ARTICLE"];

  // Function to handle category change
  const handleCategoryChange = (category) => {
    if (category === currentCategory) return;
    
    setIsLoading(true);
    setLoadingCategory(category);
    
    const params = new URLSearchParams(searchParams);
    
    if (category === "ALL") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    
    router.push(`?${params.toString()}`);
    
    // Simulate loading time (can be removed in production with real data loading)
    setTimeout(() => {
      setIsLoading(false);
      setLoadingCategory(null);
    }, 800);
  };

  // Get color class based on category
  const getCategoryColorClass = (category) => {
    switch (category) {
      case "NEWS":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "ANNOUNCEMENT":
        return "bg-green-100 text-green-800 border-green-300";
      case "ARTICLE":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "ALL":
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2 justify-start">
        {categories.map((category) => {
          const isCurrentLoading = isLoading && loadingCategory === category;
          return (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              disabled={isLoading}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full cursor-pointer text-xs sm:text-sm font-medium border transition-all flex items-center justify-center min-w-16 ${
                getCategoryColorClass(category)
              } ${
                currentCategory === category
                  ? "ring-2 ring-offset-2 ring-gray-300"
                  : "hover:opacity-80"
              } ${isLoading && currentCategory !== category ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isCurrentLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  {category === "ALL" ? "Semua" : category}
                </span>
              ) : (
                <span>{category === "ALL" ? "Semua" : category}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;