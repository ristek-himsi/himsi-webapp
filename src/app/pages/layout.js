"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/visitors/Footer";
import { motion } from "framer-motion";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <motion.div initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>
        <Navbar />
      </motion.div>
      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="pt-20 pb-10">
        {children}
      </motion.main>
      <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}>
        <Footer />
      </motion.div>
    </div>
  );
}
