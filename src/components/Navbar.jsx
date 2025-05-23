"use client"

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Home, Calendar, FileCode, Users, Phone, Newspaper, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();

  // Memoized toggle function
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  // Reset menu state and handle scroll effect with smooth transition
  useEffect(() => {
    // Reset menu on route change
    setIsMenuOpen(false);

    const handleScroll = () => {
      // Calculate scroll progress as a value between 0 and 1
      const scrolled = Math.min(window.scrollY / 50, 1); // Adjust 50 to control sensitivity
      setScrollProgress(scrolled);

      // Optimasi: Hanya tambahkan/hapus kelas jika perlu
      if (scrolled > 0.1 && !document.body.classList.contains("scrolled")) {
        document.body.classList.add("scrolled");
      } else if (scrolled <= 0.1 && document.body.classList.contains("scrolled")) {
        document.body.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true }); // Use passive listener for performance
    handleScroll(); // Initial check

    // Debug history stack (remove in production)
    if (process.env.NODE_ENV === "development") {
      // console.log("Current history state:", window.history.state, "URL:", pathname);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const navItems = [
    { name: "Beranda", path: "/", icon: <Home className="w-4 h-4 mr-2" /> },
    { name: "Events", path: "/events", icon: <Calendar className="w-4 h-4 mr-2" /> },
    { name: "Program", path: "/programs", icon: <FileCode className="w-4 h-4 mr-2" /> },
    { name: "Divisi", path: "/divisi", icon: <Users className="w-4 h-4 mr-2" /> },
    { name: "Berita & Informasi", path: "/info", icon: <Newspaper className="w-4 h-4 mr-2" /> },
    { name: "Kontak", path: "/kontak", icon: <Phone className="w-4 h-4 mr-2" /> },
    { name: "Tentang Kami", path: "/about", icon: <Info className="w-4 h-4 mr-2" /> },
  ];

  // Dynamic styles based on scroll progress
  const navBgStyle = {
    backgroundColor: `rgba(255, 255, 255, ${scrollProgress * 0.95})`, // More subtle transparency
    boxShadow: scrollProgress > 0.8 ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" : "none",
  };

  const gradientOpacity = 1 - scrollProgress;
  const gradientStyle = {
    opacity: gradientOpacity,
    pointerEvents: "none", // Ensure it doesn't block clicks
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(to right, rgba(30, 64, 175, 0.95), rgba(37, 99, 235, 0.95), rgba(59, 130, 246, 0.95))",
    zIndex: -1, // Behind content
    transition: "opacity 0.3s ease-in-out",
  };

  const textColorStyle = {
    color: scrollProgress > 0.5 ? "rgb(30, 58, 138)" : "white",
    transition: "color 0.3s ease-in-out",
  };

  const isScrolled = scrollProgress > 0.5;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 50, damping: 20 }}
      className="fixed top-0 w-full z-50 backdrop-blur-sm transition-all duration-100" // backdrop-blur-sm for subtle blur
      style={navBgStyle}
    >
      <div style={gradientStyle}></div> {/* Gradient background layer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" scroll={false} className="flex-shrink-0 flex items-center group">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="relative overflow-hidden rounded-full shadow-md" // Added shadow
              >
                <img
                  className="h-10 w-auto" // Adjusted size for better proportion
                  src="/logo-himsi.png"
                  alt="HIMSI Logo"
                />
              </motion.div>
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                style={textColorStyle}
                className="ml-3 text-xl font-bold tracking-tight sm:text-2xl" // Adjusted text size
              >
                HIMSI
              </motion.span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:ml-8 lg:space-x-1">
            {navItems.map((item, idx) => {
              const isActive = pathname === item.path;
              const navItemTextStyle = {
                color: isActive
                  ? (isScrolled ? "rgb(29, 78, 216)" : "white") // Active color when scrolled/not
                  : (isScrolled ? "rgb(37, 99, 235)" : "rgb(219, 234, 254)"), // Inactive color
                transition: "color 0.3s ease-in-out",
              };

              const bgStyle = {
                backgroundColor: isActive
                  ? (isScrolled ? "rgba(219, 234, 254, 0.8)" : "rgba(37, 99, 235, 0.4)")
                  : "transparent",
                transition: "background-color 0.3s ease-in-out",
              };

              return (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={item.path}
                    scroll={false}
                    className="relative flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 overflow-hidden group"
                  >
                    <span
                      className="absolute inset-0 rounded-md transition-all duration-300 group-hover:bg-opacity-40"
                      style={{
                        ...bgStyle,
                        // Ensure hover effect doesn't override active style immediately
                        backgroundColor: isActive
                          ? bgStyle.backgroundColor // Keep active background
                          : isScrolled
                            ? "rgba(219, 234, 254, 0)" // Transparent hover when scrolled
                            : "rgba(37, 99, 235, 0)",   // Transparent hover when not scrolled
                      }}
                    />
                    <span className="relative flex items-center" style={navItemTextStyle}>
                      {item.icon}
                      {item.name}
                    </span>
                    {isActive && (
                      <motion.span
                        layoutId="navbar-indicator" // For smooth animation between active items
                        className="absolute bottom-0 left-0 right-0 h-0.5"
                        style={{
                          backgroundColor: isScrolled ? "rgb(37, 99, 235)" : "white",
                          transition: "background-color 0.3s ease-in-out",
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile Menu Toggle - ADD lg:hidden HERE */}
          <div className="lg:hidden flex items-center"> {/* <<<<<<<<<<<< PERBAIKAN DI SINI */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              style={{
                color: isScrolled ? "rgb(29, 78, 216)" : "white",
                transition: "color 0.3s ease-in-out",
              }}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-300"
              aria-label="Buka atau tutup menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu" // Ensure this ID matches the mobile menu's ID
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
            id="mobile-menu" // ID for aria-controls
            style={{
              backgroundColor: isScrolled ? "white" : "rgba(29, 78, 216, 0.95)", // Consistent with nav bar
              borderTop: isScrolled ? "1px solid rgba(243, 244, 246, 1)" : "1px solid rgba(37, 99, 235, 0.5)",
              transition: "background-color 0.3s ease-in-out, border 0.3s ease-in-out",
            }}
            className="lg:hidden overflow-hidden" // Ensure it's hidden on large screens
          >
            <div className="px-4 pt-2 pb-6 space-y-0.5 max-h-[80vh] overflow-y-auto"> {/* Scrollable if content exceeds viewport */}
              {navItems.map((item, idx) => {
                const isActive = pathname === item.path;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ x: 5 }} // Subtle hover effect
                  >
                    <Link
                      href={item.path}
                      scroll={false} // Prevent page jump on navigation
                      style={{
                        color: isActive
                          ? (isScrolled ? "rgb(29, 78, 216)" : "white")
                          : (isScrolled ? "rgb(37, 99, 235)" : "white"), // Keep text white when not scrolled
                        backgroundColor: isActive
                          ? (isScrolled ? "rgba(239, 246, 255, 0.8)" : "rgba(37, 99, 235, 0.5)")
                          : "transparent",
                        transition: "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
                      }}
                      className="flex items-center px-4 py-3 text-sm font-medium rounded-md transition-all duration-300" // Adjusted padding
                      onClick={() => setIsMenuOpen(false)} // Close menu on item click
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}