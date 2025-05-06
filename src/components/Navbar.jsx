"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, User, LogIn, Activity, Book, Calendar, Info, Home, Users, Image, FileCode, Phone } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navbarRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Ensure client-side mounting to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsDropdownOpen((prev) => !prev);
  };

  if (!isMounted) return null;

  const navItems = [
    { name: "Beranda", path: "/", icon: <Home className="w-4 h-4 mr-2" /> },
    { name: "Tentang Kami", path: "/pages/about", icon: <Info className="w-4 h-4 mr-2" /> },
    { name: "Divisi", path: "/pages/divisi", icon: <Activity className="w-4 h-4 mr-2" /> },
    { name: "Anggota", path: "/pages/anggota", icon: <Users className="w-4 h-4 mr-2" /> },
    { name: "Galeri", path: "/pages/galeri", icon: <Image className="w-4 h-4 mr-2" /> },
    { name: "Acara", path: "/pages/acara", icon: <Calendar className="w-4 h-4 mr-2" /> },
    { name: "Proyek", path: "/pages/proyek", icon: <FileCode className="w-4 h-4 mr-2" /> },
    { name: "Blog", path: "/pages/blog", icon: <Book className="w-4 h-4 mr-2" /> },
    { name: "Kontak", path: "/pages/kontak", icon: <Phone className="w-4 h-4 mr-2" /> },
  ];

  const loginOptions = [
    { label: "Admin Login", path: "/auth/admin/login", icon: <User className="w-4 h-4 mr-2" /> },
    { label: "Ketua Divisi Login", path: "/auth/leader/login", icon: <User className="w-4 h-4 mr-2" /> },
    { label: "Member Login", path: "/auth/member/login", icon: <User className="w-4 h-4 mr-2" /> },
  ];

  return (
    <nav 
      ref={navbarRef}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white text-blue-900 shadow-lg" 
          : "bg-gradient-to-r from-blue-900 to-blue-700 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center group">
              <div className="relative overflow-hidden rounded-full">
                <img
                  className="h-10 w-auto transition-all duration-300 group-hover:scale-110"
                  src="/logo-himsi.png"
                  alt="HIMSI Logo"
                  // onError={(e) => {
                  //   e.target.onerror = null;
                  //   e.target.src = "https://via.placeholder.com/40";
                  // }}
                />
              </div>
              <span className={`ml-3 text-2xl font-bold tracking-tight ${
                scrolled ? "text-blue-900" : "text-white"
              }`}>
                HIMSI
              </span>
            </Link>
            
            <div className="hidden lg:ml-10 lg:flex lg:items-center lg:space-x-1">
              {navItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.path}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 flex items-center
                    ${scrolled 
                      ? "hover:bg-blue-100 hover:text-blue-800" 
                      : "hover:bg-blue-600/70 hover:text-white"
                    }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 ${
                  scrolled
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20"
                }`}
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login 
                <ChevronDown 
                  className={`ml-2 h-4 w-4 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`} 
                />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-5 duration-200">
                  {loginOptions.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.path}
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors duration-150"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex lg:hidden items-center">
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-md focus:outline-none transition-colors duration-200 ${
                scrolled 
                  ? "text-blue-900 hover:bg-blue-100" 
                  : "text-white hover:bg-blue-600"
              }`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu with animation */}
      <div 
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? "max-h-screen opacity-100" 
            : "max-h-0 opacity-0"
        } ${scrolled ? "bg-white" : "bg-blue-800"}`}
      >
        <div className="px-4 pt-2 pb-6 space-y-1 max-h-[80vh] overflow-y-auto">
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.path}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors duration-200 ${
                scrolled 
                  ? "text-blue-900 hover:bg-blue-50" 
                  : "text-white hover:bg-blue-700"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
          
          <div className={`border-t pt-4 mt-4 ${scrolled ? "border-gray-200" : "border-blue-600"}`}>
            <p className={`px-4 text-xs uppercase font-semibold mb-2 ${scrolled ? "text-gray-500" : "text-blue-300"}`}>
              Login Options
            </p>
            {loginOptions.map((item, idx) => (
              <Link
                key={idx}
                href={item.path}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors duration-200 ${
                  scrolled 
                    ? "text-blue-900 hover:bg-blue-50" 
                    : "text-white hover:bg-blue-700"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}