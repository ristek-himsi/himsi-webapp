"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
// Import components
import { Button } from "@/components/ui/button";
// Import actions
import { logout } from "@/lib/admin/action/logout";
// Import icons from lucide-react
import { Menu, User, LogOut, ChevronDown, X, Home, Users, Building2, Layers, CalendarRange, FileText, Trophy, CalendarHeart } from "lucide-react";
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
    return await logout(prevState, formData);
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

// Top Admin Navbar Component
export default function AdminNavbar({ user }) {
  // State for mobile menu and dropdowns
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("/admin");
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  
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
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      setActiveTab(path);
    }
  }, []);

  useEffect(() => {
    const responseData = async () => {
      try {
        const response = await fetch("/api/user");
        const res = await response.json();
        setUserData(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    responseData();
  }, []);
  
  // Toggle mobile menu with animation
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);
  
  // Navigation items with icons
  const navItems = [
    { name: "Dashboard", href: "/admin", icon: <Home size={16} /> },
    { name: "Users", href: "/admin/users", icon: <Users size={16} /> },
    { name: "Organization", href: "/admin/organisasi", icon: <Building2 size={16} /> },
    { name: "Divisions", href: "/admin/divisions", icon: <Layers size={16} /> },
    { name: "Programs", href: "/admin/programs", icon: <FileText size={16} /> },
    { name: "Events", href: "/admin/events", icon: <CalendarRange size={16} /> },
    { name: "SI Fest", href: "/admin/sifests" , icon : <CalendarHeart size={16} />},
    { name: "Posts", href: "/admin/posts", icon: <FileText size={16} /> },
    { name: "Achievement", href: "/admin/achievements", icon: <Trophy size={16} /> },
  ];
  
  // Close mobile menu on screen resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-30">
      <div className="max-w-full mx-auto px-2 sm:px-3 lg:px-4">
        <div className="flex justify-between h-16">
          {/* Logo and primary nav */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/admin" className="flex items-center hover:opacity-90 transition-opacity">
                <Image
                  src="/logo-himsi.png"
                  alt="HIMSI Logo"
                  width={36}
                  height={36}
                  className="h-8 w-auto"
                />
                <span className="ml-2 font-semibold text-base text-gray-900 block">
                  ADMIN
                </span>
              </Link>
            </div>
            
            {/* Desktop navigation - Simplified hover effects */}
            <div className="hidden md:ml-3 lg:ml-6 md:flex md:space-x-0.5 lg:space-x-2 xl:space-x-4 overflow-x-auto no-scrollbar">
              {navItems.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href}
                  className={`${
                    activeTab === item.href || (item.href === "/admin" && activeTab === "/admin")
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } inline-flex items-center px-1 md:px-1.5 lg:px-2 pt-1 text-xs md:text-sm font-medium whitespace-nowrap transition-colors duration-200 relative`}
                  onClick={() => setActiveTab(item.href)}
                >
                  <span className="mr-1 md:mr-1.5">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Secondary Navigation - User controls */}
          <div className="hidden sm:ml-3 lg:ml-6 sm:flex sm:items-center sm:space-x-2 lg:space-x-3">
            {/* User dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setUserMenuOpen(!userMenuOpen);
                }}
                className="flex items-center space-x-1 lg:space-x-2 text-sm font-medium text-gray-700 hover:text-blue-600 focus:outline-none p-1.5 rounded-lg hover:bg-gray-100 transition-all duration-200"
              >
                <div className="h-7 w-7 md:h-8 md:w-8 rounded-full overflow-hidden flex items-center justify-center bg-gray-200">
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
                <span className="hidden sm:block text-xs md:text-sm">{user?.name || "Admin"}</span>
                <div className={`hidden sm:block transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`}>
                  <ChevronDown size={14} />
                </div>
              </button>
              
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-200"
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">{user?.name || "Admin"}</p>
                      <p className="text-xs text-gray-600 mt-1">{user?.email || "admin@himsi.org"}</p>
                    </div>
                    <div className="border-t border-gray-100"></div>
                    <div className="px-4 py-2">
                      <FormLogout key="logout-form" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none transition-colors duration-200"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden border-t border-gray-200 bg-white shadow-lg overflow-hidden"
          >
            <div className="pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href}
                  className={`${
                    activeTab === item.href || (item.href === "/admin" && activeTab === "/admin")
                      ? "bg-blue-50 border-l-4 border-blue-500 text-blue-700"
                      : "border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                  } flex items-center pl-3 pr-4 py-3 text-base font-medium transition-all duration-200`}
                  onClick={() => {
                    setActiveTab(item.href);
                    setMobileMenuOpen(false);
                  }}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </div>
            
            {/* User section in mobile menu */}
            <div className="pt-4 pb-3 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center border-2 border-white shadow">
                    {userData?.photo_url ? (
                      <Image
                        src={getImageUrl(userData?.photo_url, "users")}
                        alt="User Avatar"
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User size={24} className="text-gray-600" />
                    )}
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user?.name || "Admin"}</div>
                  <div className="text-sm font-medium text-gray-500">{user?.email || "admin@himsi.org"}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <div className="px-4 py-2">
                  <FormLogout key="mobile-logout-form" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}