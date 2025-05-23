"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

const Pagination = ({ currentPage, totalPages, totalItems, itemsPerPage }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handlePageChange = (page) => {
    if (page === currentPage || page < 1 || page > totalPages) return;

    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      
      if (page === 1) {
        params.delete("page");
      } else {
        params.set("page", page.toString());
      }
      
      const queryString = params.toString();
      const url = queryString ? `?${queryString}` : window.location.pathname;
      
      router.push(url);
    });
  };

  // Don't render pagination if there's only one page or no items
  if (totalPages <= 1) return null;

  // Calculate displayed items range
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    // Always include first page
    range.push(1);

    // Calculate start and end of middle range
    let start = Math.max(2, currentPage - delta);
    let end = Math.min(totalPages - 1, currentPage + delta);

    // Add dots after first page if needed
    if (start > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    // Add middle range
    for (let i = start; i <= end; i++) {
      if (i !== 1 && i !== totalPages) {
        rangeWithDots.push(i);
      }
    }

    // Add dots before last page if needed
    if (end < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    // Remove duplicates and ensure proper order
    return [...new Set(rangeWithDots)];
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6 rounded-lg shadow-sm">
      {/* Mobile view */}
      <div className="flex items-center justify-between sm:hidden">
        <div className="text-sm text-gray-700">
          <span className="font-medium">{startItem}</span> - <span className="font-medium">{endItem}</span> dari{' '}
          <span className="font-medium">{totalItems}</span> artikel
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || isPending}
            className={`
              px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200
              ${currentPage === 1 || isPending
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }
            `}
          >
            Sebelumnya
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || isPending}
            className={`
              px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200
              ${currentPage === totalPages || isPending
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }
            `}
          >
            Selanjutnya
          </button>
        </div>
      </div>

      {/* Desktop view */}
      <div className="hidden sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Menampilkan <span className="font-medium">{startItem}</span> sampai{' '}
            <span className="font-medium">{endItem}</span> dari{' '}
            <span className="font-medium">{totalItems}</span> artikel
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Previous button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || isPending}
            className={`
              relative inline-flex items-center px-2 py-2 text-sm font-medium rounded-l-md transition-colors duration-200
              ${currentPage === 1 || isPending
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-500 border border-gray-300 hover:bg-gray-50"
              }
            `}
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Page numbers */}
          <div className="flex">
            {pageNumbers.map((pageNum, index) => (
              <div key={index}>
                {pageNum === '...' ? (
                  <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300">
                    ...
                  </span>
                ) : (
                  <button
                    onClick={() => handlePageChange(pageNum)}
                    disabled={isPending}
                    className={`
                      relative inline-flex items-center px-4 py-2 text-sm font-medium border transition-colors duration-200
                      ${pageNum === currentPage
                        ? "bg-indigo-50 border-indigo-500 text-indigo-600 z-10"
                        : isPending
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300"
                        : "bg-white text-gray-500 border-gray-300 hover:bg-gray-50"
                      }
                    `}
                  >
                    {pageNum}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Next button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || isPending}
            className={`
              relative inline-flex items-center px-2 py-2 text-sm font-medium rounded-r-md transition-colors duration-200
              ${currentPage === totalPages || isPending
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-500 border border-gray-300 hover:bg-gray-50"
              }
            `}
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Loading indicator */}
      {isPending && (
        <div className="mt-2 flex items-center justify-center text-sm text-gray-500">
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
          Memuat halaman...
        </div>
      )}
    </div>
  );
};

export default Pagination;