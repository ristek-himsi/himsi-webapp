"use client";

import React from "react";
import { Mail, Instagram, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function ContactPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen mt-10 sm:mt-6 bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <motion.div initial="hidden" animate="visible" variants={fadeIn} className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center">Hubungi Kami</h1>
          <p className="text-base md:text-lg text-blue-100 max-w-2xl mx-auto text-center leading-relaxed">Punya pertanyaan atau ingin berkolaborasi? Jangan ragu untuk menghubungi kami melalui kontak yang tersedia.</p>
        </div>
      </motion.div>

      {/* Contact Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 md:-mt-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Email Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
          >
            <div className="p-4 bg-blue-100 rounded-full mb-4">
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-gray-600 mb-4">Kami akan membalas dalam 1-2 hari kerja</p>
            <a href="mailto:kontak@himsi-university.ac.id" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
              kontak@himsi-university.ac.id
            </a>
          </motion.div>

          {/* WhatsApp Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
          >
            <div className="p-4 bg-green-100 rounded-full mb-4">
              <MessageCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">WhatsApp</h3>
            <p className="text-gray-600 mb-4">Respons cepat untuk pertanyaan mendesak</p>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="text-green-600 hover:text-green-800 font-medium transition-colors">
              +62 812-3456-7890
            </a>
          </motion.div>

          {/* Instagram Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
          >
            <div className="p-4 bg-pink-100 rounded-full mb-4">
              <Instagram className="h-8 w-8 text-pink-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Instagram</h3>
            <p className="text-gray-600 mb-4">Ikuti kami untuk info terbaru</p>
            <a href="https://instagram.com/himsi_university" target="_blank" rel="noreferrer" className="text-pink-600 hover:text-pink-800 font-medium transition-colors">
              @himsi_university
            </a>
          </motion.div>
        </div>
      </div>

      {/* FAQ Section with Accordion */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-blue-900 text-center">Pertanyaan yang Sering Diajukan</h2>

        <div className="max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-md">
          <Accordion type="single" collapsible className="w-full">
            {[
              {
                question: "Bagaimana cara menjadi anggota HIMSI?",
                answer: "Untuk menjadi anggota HIMSI, Anda harus merupakan mahasiswa aktif Fakultas Ilmu Komputer. Pendaftaran dibuka setiap awal semester dan diumumkan melalui website dan media sosial resmi HIMSI.",
              },
              {
                question: "Apa saja kegiatan yang diadakan oleh HIMSI?",
                answer: "HIMSI menyelenggarakan berbagai kegiatan seperti seminar, workshop, kompetisi, dan acara sosial yang bertujuan untuk mengembangkan kemampuan akademik dan soft skill mahasiswa di bidang teknologi informasi.",
              },
              {
                question: "Apakah HIMSI menerima kolaborasi dengan pihak luar?",
                answer: "Ya, HIMSI terbuka untuk kolaborasi dengan berbagai pihak, baik dari industri, institusi pendidikan, maupun organisasi lainnya. Silakan hubungi kami melalui email atau WhatsApp untuk diskusi lebih lanjut.",
              },
              {
                question: "Bagaimana cara mendapatkan sertifikat kegiatan dari HIMSI?",
                answer:
                  "Sertifikat kegiatan HIMSI akan diberikan kepada peserta yang telah mengikuti kegiatan sesuai dengan ketentuan yang berlaku. Biasanya sertifikat akan dikirim melalui email dalam waktu 1-2 minggu setelah kegiatan selesai.",
              },
            ].map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium text-blue-900 hover:text-blue-700">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-700 pt-2 pb-4">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </motion.div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Masih Punya Pertanyaan?</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">Jangan ragu untuk menghubungi kami. Tim HIMSI siap membantu menjawab semua pertanyaan Anda.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center shadow-md hover:shadow-lg"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Chat WhatsApp
              </a>
              <a href="mailto:kontak@himsi-university.ac.id" className="px-6 py-3 bg-white text-blue-900 font-medium rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center shadow-md hover:shadow-lg">
                <Mail className="h-5 w-5 mr-2" />
                Email Kami
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
