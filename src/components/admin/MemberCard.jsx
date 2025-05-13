"use client";

import { UserCircle, Mail, Pencil, Trash, Briefcase, Users, Shield, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { getImageUrl } from "@/lib/supabase";
import { useState } from "react";
import Link from "next/link";
import MemberDeleteForm from "./MemberDeleteForm";

const getMemberImageUrl = (photoUrl) => {
  if (!photoUrl) return null;

  if (photoUrl.startsWith("http")) {
    return photoUrl; // Already a complete URL
  }

  // Extract filename from path
  const fileName = photoUrl.includes("/") ? photoUrl.split("/").pop() : photoUrl;

  // If using supabase like in your example
  return getImageUrl(fileName, "users");
};

const getRoleBadgeColor = (role) => {
  switch (role) {
    case "ADMIN":
      return "bg-red-100 text-red-800";
    case "DIVISION_LEADER":
      return "bg-blue-100 text-blue-800";
    case "MEMBER":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const MemberCard = ({ member, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-3 md:p-4 hover:shadow-lg transition-shadow w-full max-w-2xl mx-auto overflow-hidden">
      {/* Main card content */}
      <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
        {/* Avatar section - fixed width on all screen sizes */}
        <div className="relative flex-shrink-0">
          <div className="w-16 h-16 md:w-20 md:h-20 relative">
            {member.photo_url ? (
              <Image
                src={getMemberImageUrl(member.photo_url)}
                alt={member.name}
                width={80}
                height={80}
                className="w-full h-full rounded-full object-cover border-2 border-gray-200"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-full">
                <UserCircle className="w-12 h-12 md:w-16 md:h-16 text-gray-400" />
              </div>
            )}
            
            {/* Role badge */}
            <div className={`absolute -bottom-1 -right-1 rounded-full px-1.5 py-0.5 md:px-2 md:py-1 text-xs font-medium ${getRoleBadgeColor(member.role)}`}>
              {member.role === "DIVISION_LEADER" ? "LEADER" : member.role}
            </div>
          </div>
        </div>
        
        {/* Info section - grows to fill available space */}
        <div className="flex-1 w-full text-center md:text-left min-w-0">
          <h3 className="font-bold text-base md:text-lg truncate">{member.name}</h3>
          
          <div className="flex items-center justify-center md:justify-start text-gray-600 mb-1 text-xs md:text-sm">
            <Mail className="w-3 h-3 md:w-4 md:h-4 mr-1 flex-shrink-0" />
            <span className="truncate">{member.email}</span>
          </div>
          
          {/* Show division and position if available */}
          {member.division && (
            <div className="flex items-center justify-center md:justify-start text-gray-600 mb-1 text-xs md:text-sm">
              <Users className="w-3 h-3 md:w-4 md:h-4 mr-1 flex-shrink-0" />
              <span className="truncate">{member.division.name}</span>
            </div>
          )}
          
          {member.position && (
            <div className="flex items-center justify-center md:justify-start text-gray-600 text-xs md:text-sm">
              <Briefcase className="w-3 h-3 md:w-4 md:h-4 mr-1 flex-shrink-0" />
              <span className="truncate">{member.position}</span>
            </div>
          )}
        </div>
        
        {/* Actions section - fixed width and properly contained */}
        <div className="flex md:flex-col items-center justify-center gap-2 mt-2 md:mt-0 flex-shrink-0">
          <div className="flex items-center gap-1 md:gap-2">
            <Link href={`/leader/members/edit/${member.id}`}>
              <button 
                className="p-1.5 md:p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                aria-label="Edit member"
              >
                <Pencil className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </Link>
            {/* Delete button container - properly contained */}
            <div className="flex-shrink-0">
              <MemberDeleteForm userId={member?.id} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Expand/collapse button - centered and full width */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-center text-xs text-gray-500 hover:text-gray-700 mt-2 pt-2 border-t border-gray-100"
        aria-expanded={isExpanded}
        aria-controls="member-details"
      >
        <span className="mr-1">{isExpanded ? "Show less" : "Show more"}</span>
        {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>
      
      {/* Expandable section */}
      {isExpanded && (
        <div 
          id="member-details" 
          className="mt-2 pt-2 border-t border-gray-200 text-xs md:text-sm text-gray-600"
        >
          {/* Organization roles if available */}
          {member.orgRoles && member.orgRoles.length > 0 && (
            <div className="mb-2">
              <span className="text-xs font-medium text-gray-500">Organization Roles:</span>
              <ul className="mt-1 grid grid-cols-1 md:grid-cols-2 gap-1">
                {member.orgRoles.map((role, index) => (
                  <li key={index} className="flex items-center">
                    <Shield className="w-3 h-3 mr-1 text-gray-500 flex-shrink-0" />
                    <span className="truncate">{role}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Grid for member details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <span className="font-medium">Member ID:</span> {member.id}
            </div>
            <div>
              <span className="font-medium">Joined:</span> {new Date(member.createdAt).toLocaleDateString()}
            </div>
            {member.updatedAt && (
              <div>
                <span className="font-medium">Last Updated:</span> {new Date(member.updatedAt).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};