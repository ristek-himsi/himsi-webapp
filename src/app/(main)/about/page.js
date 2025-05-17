"use client";

import Navbar from "@/components/Navbar";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const AboutPage = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-blue-50 min-h-screen sm:mt-4">
      {/* Hero Section */}
      <motion.section initial="hidden" animate="visible" variants={fadeIn} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24  pb-1 sm:pb-16 text-center">
        <div className="relative inline-block mb-6">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight">
            Tentang <span className="text-blue-600">HIMSI</span>
          </h1>
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-600 rounded-full"></div>
        </div>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-light">
          Mengenal lebih dekat Himpunan Mahasiswa Sistem Informasi dan komitmen kami untuk mengembangkan ekosistem teknologi informasi yang inovatif dan berdampak.
        </p>
      </motion.section>

      {/* Vision & Mission Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 ">
        <div className="grid md:grid-cols-2 gap-12 items-center ">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="order-2 md:order-1 sm:mt-0 mt-[-22px]">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Visi Kami</h2>
              </div>
              <p className="text-gray-700 mb-8 leading-relaxed">Menjadi organisasi kemahasiswaan yang unggul dalam mengembangkan potensi mahasiswa Sistem Informasi dan berkontribusi aktif dalam kemajuan teknologi informasi di Indonesia.</p>

              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Misi Kami</h2>
              </div>
              <ul className="text-gray-700 space-y-4">
                {[
                  "Meningkatkan kualitas akademik dan soft skills mahasiswa Sistem Informasi",
                  "Memfasilitasi pengembangan minat dan bakat mahasiswa di bidang teknologi informasi",
                  "Membangun jaringan kerjasama dengan industri dan institusi terkait",
                  "Berkontribusi dalam pemecahan masalah sosial melalui penerapan teknologi informasi",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="order-1 md:order-2 sm:mt-0 mt-[-30px]">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-2xl p-8 shadow-xl">
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Sejarah HIMSI
              </h2>
              <p className="mb-6 leading-relaxed text-blue-100">
                Didirikan pada tahun 2005, HIMSI telah menjadi rumah bagi ratusan mahasiswa Sistem Informasi yang berdedikasi untuk belajar, berkembang, dan memberikan dampak positif melalui teknologi.
              </p>
              <p className="leading-relaxed text-blue-100">
                Selama perjalanannya, HIMSI telah menyelenggarakan berbagai kegiatan unggulan seperti seminar teknologi, kompetisi programming, workshop pengembangan karir, dan program pengabdian masyarakat yang memanfaatkan teknologi
                informasi.
              </p>
              <div className="mt-8 text-right">
                <span className="inline-block border-t-2 border-blue-400 w-16"></span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Organization Structure Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Struktur Organisasi</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Tim kami terdiri dari mahasiswa berbakat yang berdedikasi untuk memajukan komunitas Sistem Informasi</p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              initial: "KU",
              title: "Ketua Umum",
              description: "Memimpin dan mengkoordinasikan seluruh kegiatan HIMSI",
            },
            {
              initial: "AK",
              title: "Divisi Akademik",
              description: "Bertanggung jawab atas program-program peningkatan akademik",
            },
            {
              initial: "KM",
              title: "Divisi Kemahasiswaan",
              description: "Mengelola kegiatan pengembangan soft skills dan kepemimpinan",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full mx-auto mb-6 flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
                <span className="text-white text-2xl font-bold">{item.initial}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }} className="mt-16 text-center">
          <Link
            href="/pages/join"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Bergabung dengan Kami
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </motion.div>
      </section>

      {/* Footer Section */}
    </div>
  );
};

export default AboutPage;
