"use client"

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Home, Calendar, FileCode, Users, Phone, Newspaper, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Memoized toggle function
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  // Reset menu state and handle scroll effect
  useEffect(() => {
    // Reset menu on route change
    setIsMenuOpen(false);
    
    // Update scroll state
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      setIsScrolled(scrolled);
      scrolled ? document.body.classList.add("scrolled") : document.body.classList.remove("scrolled");
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

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 50, damping: 20 }}
      className={`fixed top-0 w-full z-50 backdrop-blur-sm transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 text-blue-900 shadow-lg" 
          : "bg-gradient-to-r from-blue-800/95 via-blue-700/95 to-blue-600/95 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" scroll={false} className="flex-shrink-0 flex items-center group">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="relative overflow-hidden rounded-full shadow-md"
              >
                <img
                  className="h-10 w-auto"
                  src="/logo-himsi.png"
                  alt="HIMSI Logo"
                />
              </motion.div>
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className={`ml-3 text-xl font-bold tracking-tight sm:text-2xl ${
                  isScrolled ? "text-blue-800" : "text-white"
                }`}
              >
                HIMSI
              </motion.span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:ml-8 lg:space-x-1">
            {navItems.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={item.path}
                  scroll={false}
                  className={`relative flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 overflow-hidden group
                    ${pathname === item.path 
                      ? isScrolled ? "text-blue-700 font-semibold" : "text-white font-semibold" 
                      : isScrolled ? "text-blue-600" : "text-blue-100"
                    }`}
                >
                  <span className={`absolute inset-0 ${
                    pathname === item.path 
                      ? isScrolled ? "bg-blue-100" : "bg-blue-600/40" 
                      : "bg-transparent group-hover:bg-blue-600/20"
                    } rounded-md transition-all duration-300 ${
                      isScrolled ? "group-hover:bg-blue-100" : "group-hover:bg-blue-600/40"
                    }`}
                  />
                  <span className="relative flex items-center">
                    {item.icon}
                    {item.name}
                  </span>
                  {pathname === item.path && (
                    <motion.span
                      layoutId="navbar-indicator"
                      className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                        isScrolled ? "bg-blue-600" : "bg-white"
                      }`}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              className={`p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 
                transition-colors duration-200 ${
                  isScrolled 
                    ? "text-blue-700 hover:bg-blue-100" 
                    : "text-white hover:bg-blue-600/70"
                }`}
              aria-label="Buka atau tutup menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            id="mobile-menu"
            className={`lg:hidden ${
              isScrolled 
                ? "bg-white border-t border-gray-100" 
                : "bg-gradient-to-b from-blue-700 to-blue-800"
            } overflow-hidden`}
          >
            <div className="px-4 pt-2 pb-6 space-y-0.5 max-h-[80vh] overflow-y-auto">
              {navItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ x: 5 }}
                >
                  <Link
                    href={item.path}
                    scroll={false}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors duration-200 
                      ${pathname === item.path 
                        ? isScrolled ? "bg-blue-50 text-blue-700 font-semibold" : "bg-blue-600/50 text-white font-semibold" 
                        : isScrolled ? "text-blue-700 hover:bg-blue-50" : "text-white hover:bg-blue-600/50"
                      }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}