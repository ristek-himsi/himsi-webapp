"use client"

import Link from "next/link";
import { 
  Home, 
  Calendar, 
  FileCode, 
  Users, 
  Newspaper, 
  Phone, 
  Info,
  Mail,
  PhoneCall,
  Instagram,
  Twitter,
  Github,
  Lock,
  ChevronDown
} from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [expandedSection, setExpandedSection] = useState(null);

  // Toggle section expansion (mobile only)
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Daftar navigasi untuk footer yang sesuai dengan navbar
  const footerNavItems = [
    { name: "Beranda", path: "/", icon: <Home className="w-4 h-4" /> },
    { name: "Acara", path: "/pages/acara", icon: <Calendar className="w-4 h-4" /> },
    { name: "Program", path: "/pages/program", icon: <FileCode className="w-4 h-4" /> },
    { name: "Divisi", path: "/pages/divisi", icon: <Users className="w-4 h-4" /> },
    { name: "Berita", path: "/pages/news", icon: <Newspaper className="w-4 h-4" /> },
    { name: "Kontak", path: "/pages/kontak", icon: <Phone className="w-4 h-4" /> },
    { name: "Tentang Kami", path: "/pages/about", icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Footer */}
        <div className="md:hidden">
          {/* Logo dan Deskripsi - Selalu terlihat di mobile */}
          <div className="mb-4">
            <h3 className="text-xl font-bold tracking-tight mb-2">HIMSI</h3>
            <p className="text-gray-300 leading-relaxed text-xs">
              Himpunan Mahasiswa Sistem Informasi adalah organisasi kemahasiswaan yang mewadahi
              mahasiswa program studi Sistem Informasi.
            </p>
          </div>
          
          {/* Accordion untuk Navigasi Mobile */}
          <div className="border-t border-gray-700/50">
            <button 
              onClick={() => toggleSection('nav')}
              className="flex justify-between items-center w-full py-3 text-left"
            >
              <span className="text-sm font-semibold">Navigasi</span>
              <ChevronDown 
                className={`w-4 h-4 transition-transform ${expandedSection === 'nav' ? 'rotate-180' : ''}`} 
              />
            </button>
            {expandedSection === 'nav' && (
              <div className="grid grid-cols-2 gap-x-2 gap-y-2 pb-3">
                {footerNavItems.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.path}
                    className="text-gray-300 text-xs flex items-center py-1"
                  >
                    {item.icon}
                    <span className="ml-2">{item.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          {/* Accordion untuk Kontak Mobile */}
          <div className="border-t border-gray-700/50">
            <button 
              onClick={() => toggleSection('contact')}
              className="flex justify-between items-center w-full py-3 text-left"
            >
              <span className="text-sm font-semibold">Kontak</span>
              <ChevronDown 
                className={`w-4 h-4 transition-transform ${expandedSection === 'contact' ? 'rotate-180' : ''}`} 
              />
            </button>
            {expandedSection === 'contact' && (
              <div className="pb-3 space-y-2">
                <div className="flex items-center text-xs text-gray-300">
                  <Mail className="h-3 w-3 mr-2 text-gray-400" />
                  <span>himsi@example.ac.id</span>
                </div>
                <div className="flex items-center text-xs text-gray-300">
                  <PhoneCall className="h-3 w-3 mr-2 text-gray-400" />
                  <span>+62-123-4567-8901</span>
                </div>
                
                {/* Social Icons compact */}
                <div className="flex space-x-3 mt-2">
                  {[
                    { icon: <Instagram className="h-3 w-3" />, label: "Instagram" },
                    { icon: <Twitter className="h-3 w-3" />, label: "Twitter" },
                    { icon: <Github className="h-3 w-3" />, label: "Github" }
                  ].map((social, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="bg-gray-800 p-1.5 rounded-full text-gray-300"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Area portal samar di mobile */}
          <div className="mt-4 pt-2 border-t border-gray-700/50 flex justify-center">
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <Link href="/auth/admin/login" className="hover:text-gray-300 transition-colors opacity-60">
                <Lock className="w-3 h-3 inline mr-1" />
                Portal
              </Link>
              <span className="text-gray-700">•</span>
              <Link href="/auth/leader/login" className="hover:text-gray-300 transition-colors opacity-60">
                <Lock className="w-3 h-3 inline mr-1" />
                Divisi
              </Link>
              <span className="text-gray-700">•</span>
              <Link href="/auth/member/login" className="hover:text-gray-300 transition-colors opacity-60">
                <Lock className="w-3 h-3 inline mr-1" />
                Anggota
              </Link>
            </div>
          </div>
        </div>

        {/* Desktop Footer */}
        <div className="hidden md:block">
          <div className="grid grid-cols-4 gap-8">
            {/* Logo dan Deskripsi */}
            <div>
              <h3 className="text-xl font-bold tracking-tight mb-4">HIMSI</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                Himpunan Mahasiswa Sistem Informasi adalah organisasi kemahasiswaan yang mewadahi
                mahasiswa program studi Sistem Informasi.
              </p>
              
              {/* Area portal (samar-samar) */}
              <div className="mt-6 pt-4 border-t border-gray-700/50">
                <p className="text-gray-400 text-xs mb-2">Portal Akses:</p>
                <div className="flex items-center space-x-3 text-xs text-gray-500">
                  <Link href="/auth/admin/login" className="hover:text-gray-300 transition-colors flex items-center opacity-70">
                    <Lock className="w-3 h-3 mr-1" />
                    <span>Portal</span>
                  </Link>
                  <span className="text-gray-700">•</span>
                  <Link href="/auth/leader/login" className="hover:text-gray-300 transition-colors flex items-center opacity-70">
                    <Lock className="w-3 h-3 mr-1" />
                    <span>Divisi</span>
                  </Link>
                  <span className="text-gray-700">•</span>
                  <Link href="/auth/member/login" className="hover:text-gray-300 transition-colors flex items-center opacity-70">
                    <Lock className="w-3 h-3 mr-1" />
                    <span>Anggota</span>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Navigasi */}
            <div>
              <h3 className="text-lg font-bold tracking-tight mb-4">Navigasi</h3>
              <ul className="space-y-2">
                {footerNavItems.slice(0, 4).map((item, idx) => (
                  <li key={idx} className="transition duration-200 hover:translate-x-1">
                    <Link
                      href={item.path}
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center text-sm"
                    >
                      {item.icon}
                      <span className="ml-2">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Navigasi Lanjutan */}
            <div>
              <h3 className="text-lg font-bold tracking-tight mb-4">Informasi</h3>
              <ul className="space-y-2">
                {footerNavItems.slice(4).map((item, idx) => (
                  <li key={idx} className="transition duration-200 hover:translate-x-1">
                    <Link
                      href={item.path}
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center text-sm"
                    >
                      {item.icon}
                      <span className="ml-2">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Kontak */}
            <div>
              <h3 className="text-lg font-bold tracking-tight mb-4">Kontak</h3>
              <ul className="space-y-3 text-gray-300 text-sm">
                <li className="flex items-center">
                  <Mail className="h-4 w-4 mr-3 text-gray-400" />
                  <span>himsi@example.ac.id</span>
                </li>
                <li className="flex items-center">
                  <PhoneCall className="h-4 w-4 mr-3 text-gray-400" />
                  <span>+62-123-4567-8901</span>
                </li>
              </ul>
              
              {/* Social Media Icons */}
              <div className="flex space-x-4 mt-6">
                <a
                  href="#"
                  className="bg-gray-800 p-2 rounded-full text-gray-300 hover:text-white hover:bg-blue-600 transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="bg-gray-800 p-2 rounded-full text-gray-300 hover:text-white hover:bg-blue-500 transition-all duration-300"
                  aria-label="Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="bg-gray-800 p-2 rounded-full text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-300"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright - Visible on all devices */}
        <div className="mt-6 pt-4 border-t border-gray-700 text-center text-gray-400 text-xs">
          <p>© {new Date().getFullYear()} HIMSI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}