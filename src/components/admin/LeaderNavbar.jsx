"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
// Import components
import { Button } from "@/components/ui/button";
// Import actions
import { logoutLeader } from "@/lib/admin/action/logout";
// Import icons from lucide-react
import { Menu, User, LogOut, ChevronDown, X } from "lucide-react";
import { getImageUrl } from "@/lib/supabase";

// Logout form component with useActionState
const initialState = {
  error: ""
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button 
      className="w-full flex items-center justify-center" 
      disabled={pending} 
      type="submit" 
      variant="secondary"
    >
      <LogOut size={16} className="mr-2" />
      {pending ? "Loading..." : "Sign out"}
    </Button>
  );
};

const FormLogout = () => {
  const [state, formAction] = useActionState(async (prevState, formData) => {
    console.log("Logout form submitted");
    return await logoutLeader(prevState, formData);
  }, initialState);
  
  return (
    <form action={formAction}>
      {state?.error && (
        <p className="text-xs text-red-600 mb-2">{state.error}</p>
      )}
      <SubmitButton />
    </form>
  );
};

// Top Leader Navbar Component
export default function LeaderNavbar({ user }) {
  // Check if user is DIVISION_LEADER
  if (!user || user.role !== "DIVISION_LEADER") {
    return (
      <div className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-8 py-4">
          <p className="text-red-600 text-center">
            Access Denied: This page is only for Division Leaders.
          </p>
        </div>
      </div>
    );
  }

  // State for mobile menu and dropdowns
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("/leader");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const responseData = async () => {
      const response = await fetch("/api/user");
      const res = await response.json();
      setUserData(res.data);
    }

    responseData();
  }, []);
  
  // Close dropdown menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  // Set active tab based on current path
  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      setActiveTab(path);
    }
  }, []);
  
  // Navigation items for Division Leaders - using userData.divisionId
  const getNavItems = () => {
    const divisionId = userData?.divisionId || user?.divisionId;
    
    return [
      { name: "Dashboard", href: "/leader" },
      { name: "Organization", href: "/leader/organisasi" },
      { name: "My Division", href: `/leader/division/${divisionId}` },
      { name: "Posts", href: "/leader/posts" },
      { name: "Members", href: "/leader/members" },
      { name: "Programs", href: "/leader/programs" },
      { name: "Achievement", href: "/leader/achievement" },
    ];
  };

  const navItems = getNavItems();
  
  // Close mobile menu on screen resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-30">
      <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and primary nav */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/leader" className="flex items-center">
                <Image
                  src="/logo-himsi.png"
                  alt="HIMSI Logo"
                  width={32}
                  height={32}
                  className="h-8 w-auto"
                />
                <span className="ml-2 font-semibold text-xl text-gray-900 hidden sm:block">HIMSI Leader</span>
              </Link>
            </div>
            
            {/* Desktop navigation */}
            <div className="hidden md:ml-6 md:flex md:space-x-2 lg:space-x-6 overflow-x-auto">
              {navItems.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href}
                  className={`${
                    activeTab === item.href || (item.href === "/leader" && activeTab === "/leader")
                      ? "border-b-2 border-blue-500 text-gray-900"
                      : "border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } inline-flex items-center px-1 pt-1 text-sm font-medium whitespace-nowrap transition-colors`}
                  onClick={() => setActiveTab(item.href)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Secondary Navigation - User controls */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-3">
            {/* User dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setUserMenuOpen(!userMenuOpen);
                }}
                className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-blue-600 focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="h-8 w-8 rounded-full overflow-hidden flex items-center justify-center bg-gray-200">
                  {userData?.photo_url ? (
                    <Image
                      src={getImageUrl(userData.photo_url, "users")}
                      alt="User Avatar"
                      width={32}
                      height={32}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User size={18} className="text-gray-600" />
                  )}
                </div>
                <span className="hidden lg:block">{userData?.name || user?.name || "Leader"}</span>
                <ChevronDown size={16} className={`transition-transform hidden lg:block ${userMenuOpen ? "rotate-180" : ""}`} />
              </button>
              
              {userMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-200"
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">{userData?.name || user?.name || "Leader"}</p>
                    <p className="text-xs text-gray-600 mt-1">{userData?.email || user?.email || "leader@himsi.org"}</p>
                    <p className="text-xs text-gray-500 mt-1">{userData?.position || "Division Leader"}</p>
                  </div>
                  <div className="border-t border-gray-100"></div>
                  <div className="px-4 py-2">
                    <FormLogout key="logout-form" />
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white shadow-lg">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href}
                className={`${
                  activeTab === item.href || (item.href === "/leader" && activeTab === "/leader")
                    ? "bg-blue-50 border-l-4 border-blue-500 text-blue-700"
                    : "border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                } block pl-3 pr-4 py-2 text-base font-medium`}
                onClick={() => {
                  setActiveTab(item.href);
                  setMobileMenuOpen(false);
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          {/* User section in mobile menu */}
          <div className="pt-4 pb-3 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                  {userData?.photo_url ? (
                    <Image
                      src={getImageUrl(userData.photo_url, "users")}
                      alt="User Avatar"
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User size={20} className="text-gray-600" />
                  )}
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{userData?.name || user?.name || "Leader"}</div>
                <div className="text-sm font-medium text-gray-500">{userData?.email || user?.email || "leader@himsi.org"}</div>
                <div className="text-xs text-gray-400">{userData?.position || "Division Leader"}</div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <div className="px-4 py-2">
                <FormLogout key="mobile-logout-form" />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}