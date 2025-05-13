"use client";

import React from "react";
import { Calendar, Clock, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { getImageUrl } from "@/lib/supabase";
import DeleteProgramLeaderForm from "./DeleteProgramLeaderForm";


const ProgramCardLeader = ({ program }) => {
  // Format dates for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Get status color based on status value
  const getStatusColor = (status) => {
    switch (status) {
      case "UPCOMING":
        return "bg-blue-100 text-blue-600";
      case "ONGOING":
        return "bg-green-100 text-green-600";
      case "COMPLETED":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const imagePreview = getImageUrl(program?.imageUrl, "programs")

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 relative">
          <img
            className="h-48 w-full object-cover md:h-full"
            src={imagePreview}
            alt={program?.name}
          />
          <div className="absolute top-2 right-2">
            <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(program.status)} shadow`}>
              {program.status}
            </span>
          </div>
        </div>
        
        <div className="p-6 md:w-2/3 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <div className="uppercase tracking-wide text-xs text-indigo-500 font-semibold">
                Program {program.id}
              </div>
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 mb-2">{program?.name}</h2>
            
            <p className="text-gray-600 text-sm mb-4">{program?.description}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-2 text-indigo-500" />
                <span>Mulai: {formatDate(program.startDate)}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-2 text-indigo-500" />
                <span>Selesai: {formatDate(program?.endDate)}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-2 text-indigo-500" />
                <span>Dibuat: {formatDate(program?.createdAt)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 mt-2 pt-2 border-t border-gray-100">
            <Link 
              href={`/leader/programs/edit/${program?.id}`}
              className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors duration-200"
            >
              <Pencil className="h-4 w-4 mr-1" />
              Edit
            </Link>
           <DeleteProgramLeaderForm id={program?.id}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramCardLeader;