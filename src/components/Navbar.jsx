"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, User, LogIn, Calendar, Info, Home, FileCode, Users, Phone, Newspaper } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();

  // Memoized toggle functions
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
    setIsDropdownOpen(false);
  }, []);

  const toggleDropdown = useCallback((e) => {
    e.preventDefault();
    setIsDropdownOpen((prev) => !prev);
  }, []);

  // Handle keyboard navigation for dropdown
  const handleDropdownKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsDropdownOpen((prev) => !prev);
    }
    if (e.key === "Escape") {
      setIsDropdownOpen(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset menu state and handle scroll effect
  useEffect(() => {
    // Reset menu and dropdown on route change
    setIsMenuOpen(false);
    setIsDropdownOpen(false);

    // Update scroll state
    const handleScroll = () => {
      window.scrollY > 10 ? document.body.classList.add("scrolled") : document.body.classList.remove("scrolled");
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    
    // Debug history stack (remove in production)
    if (process.env.NODE_ENV === "development") {
      console.log("Current history state:", window.history.state, "URL:", pathname);
    }
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const navItems = [
    { name: "Beranda", path: "/", icon: <Home className="w-4 h-4 mr-2" /> },
    { name: "Acara", path: "/pages/acara", icon: <Calendar className="w-4 h-4 mr-2" /> },
    { name: "Program", path: "/pages/program", icon: <FileCode className="w-4 h-4 mr-2" /> },
    { name: "Divisi", path: "/pages/divisi", icon: <Users className="w-4 h-4 mr-2" /> },
    { name: "Berita", path: "/pages/news", icon: <Newspaper className="w-4 h-4 mr-2" /> },
    { name: "Kontak", path: "/pages/kontak", icon: <Phone className="w-4 h-4 mr-2" /> },
    { name: "Tentang Kami", path: "/pages/about", icon: <Info className="w-4 h-4 mr-2" /> },

  ];

  const loginOptions = [
    { label: "Admin Login", path: "/auth/admin/login", icon: <User className="w-4 h-4 mr-2" /> },
    { label: "Ketua Divisi Login", path: "/auth/leader/login", icon: <User className="w-4 h-4 mr-2" /> },
    { label: "Member Login", path: "/auth/member/login", icon: <User className="w-4 h-4 mr-2" /> },
  ];

  return (
    <nav 
      className="fixed top-0 w-full z-50 transition-all duration-300 bg-gradient-to-r from-blue-900 to-blue-700 text-white scrolled:bg-white scrolled:text-blue-900 scrolled:shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" scroll={false} className="flex-shrink-0 flex items-center group">
              <div className="relative overflow-hidden rounded-full">
                <img
                  className="h-10 w-auto transition-transform duration-300 group-hover:scale-110"
                  src="/logo-himsi.png"
                  alt="HIMSI Logo"
                />
              </div>
              <span className="ml-3 text-xl font-bold tracking-tight sm:text-2xl scrolled:text-blue-900">
                HIMSI
              </span>
            </Link>
          </div>

          <div className="hidden lg:flex lg:items-center lg:ml-8 lg:space-x-6">
            {navItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.path}
                scroll={false}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  pathname === item.path ? "underline underline-offset-4 font-bold" : ""
                } hover:bg-blue-600/70 hover:text-white scrolled:hover:bg-blue-100 scrolled:hover:text-blue-800`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative hidden lg:block" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                onKeyDown={handleDropdownKeyDown}
                aria-expanded={isDropdownOpen}
                aria-controls="dropdown-menu"
                className="flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 bg-white/10 hover:bg-white/20 scrolled:bg-blue-600 scrolled:text-white scrolled:hover:bg-blue-700"
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
                <div
                  id="dropdown-menu"
                  className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-5 duration-200"
                >
                  {loginOptions.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.path}
                      scroll={false}
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

            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200 text-white hover:bg-blue-600 scrolled:text-blue-900 scrolled:hover:bg-blue-100"
              aria-label="Buka atau tutup menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <div 
        id="mobile-menu"
        className={`lg:hidden transition-all duration-300 ease-in-out transform ${
          isMenuOpen 
            ? "max-h-screen opacity-100 translate-y-0" 
            : "max-h-0 opacity-0 -translate-y-4"
        } bg-blue-800 scrolled:bg-white`}
      >
        <div className="px-4 pt-2 pb-6 space-y-1 max-h-[80vh] overflow-y-auto">
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.path}
              scroll={false}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors duration-200 ${
                pathname === item.path ? "underline underline-offset-4 font-bold" : ""
              } text-white hover:bg-blue-700 scrolled:text-blue-900 scrolled:hover:bg-blue-50`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
          {loginOptions.map((item, idx) => (
            <Link
              key={idx}
              href={item.path}
              scroll={false}
              className="flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors duration-200 text-white hover:bg-blue-700 scrolled:text-blue-900 scrolled:hover:bg-blue-50"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}