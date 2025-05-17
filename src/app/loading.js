import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="flex flex-col items-center">
        {/* Pulse Animation Circle */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-indigo-100 dark:border-indigo-900"></div>
          <div className="absolute top-0 left-0 w-16 h-16 rounded-full border-t-4 border-indigo-600 dark:border-indigo-400 animate-spin"></div>
        </div>

        {/* Text with fade-in animation */}
        <div className="mt-6 animate-pulse">
          <div className="text-center">
            <h2 className="text-lg font-medium text-gray-700 dark:text-gray-200">Sedang memuat</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Mohon tunggu sebentar...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
