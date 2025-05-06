"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Instagram, Twitter, Youtube, Facebook, Linkedin, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call with timeout
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      {/* Header */}
      <div className="bg-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4 text-center">Hubungi Kami</h1>
          <p className="text-lg text-blue-200 max-w-3xl mx-auto text-center">Punya pertanyaan atau ingin berkolaborasi? Jangan ragu untuk menghubungi kami melalui form di bawah ini atau melalui informasi kontak yang tersedia.</p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Email Card */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
            <div className="p-4 bg-blue-100 rounded-full mb-4">
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-gray-600 mb-4">Kami akan membalas dalam 1-2 hari kerja</p>
            <a href="mailto:kontak@himsi-university.ac.id" className="text-blue-600 hover:underline font-medium">
              kontak@himsi-university.ac.id
            </a>
          </div>

          {/* Phone Card */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
            <div className="p-4 bg-blue-100 rounded-full mb-4">
              <Phone className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Telepon</h3>
            <p className="text-gray-600 mb-4">Senin - Jumat (9:00 - 17:00)</p>
            <a href="tel:+6281234567890" className="text-blue-600 hover:underline font-medium">
              +62 812-3456-7890
            </a>
          </div>

          {/* Location Card */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
            <div className="p-4 bg-blue-100 rounded-full mb-4">
              <MapPin className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Lokasi</h3>
            <p className="text-gray-600 mb-4">Kunjungi kami di kampus</p>
            <p className="text-blue-600 font-medium">
              Gedung Fakultas Ilmu Komputer, Lantai 3<br />
              Universitas Indonesia, Depok
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form and Social Media Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6 text-blue-900">Kirim Pesan</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Masukkan alamat email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subjek
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan subjek pesan"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Pesan
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tulis pesan anda disini..."
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center items-center px-4 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Kirim Pesan
                    </>
                  )}
                </button>
              </div>

              {submitStatus === "success" && <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">Pesan berhasil terkirim! Kami akan segera menghubungi Anda.</div>}

              {submitStatus === "error" && <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">Terjadi kesalahan. Silakan coba lagi nanti.</div>}
            </form>
          </div>

          {/* Social Media and Schedule */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-blue-900">Terhubung dengan Kami</h2>

            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-xl font-semibold mb-4 text-blue-900">Media Sosial</h3>
              <div className="space-y-4">
                <a href="https://instagram.com/himsi_university" target="_blank" rel="noreferrer" className="flex items-center hover:bg-blue-50 p-2 rounded-md transition-colors">
                  <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                    <Instagram className="h-5 w-5 text-pink-600" />
                  </div>
                  <span className="ml-3 text-gray-700">@himsi_university</span>
                </a>

                <a href="https://twitter.com/himsi_university" target="_blank" rel="noreferrer" className="flex items-center hover:bg-blue-50 p-2 rounded-md transition-colors">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Twitter className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="ml-3 text-gray-700">@himsi_university</span>
                </a>

                <a href="https://youtube.com/himsi_university" target="_blank" rel="noreferrer" className="flex items-center hover:bg-blue-50 p-2 rounded-md transition-colors">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <Youtube className="h-5 w-5 text-red-600" />
                  </div>
                  <span className="ml-3 text-gray-700">HIMSI University</span>
                </a>

                <a href="https://facebook.com/himsi.university" target="_blank" rel="noreferrer" className="flex items-center hover:bg-blue-50 p-2 rounded-md transition-colors">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Facebook className="h-5 w-5 text-blue-800" />
                  </div>
                  <span className="ml-3 text-gray-700">HIMSI University</span>
                </a>

                <a href="https://linkedin.com/company/himsi-university" target="_blank" rel="noreferrer" className="flex items-center hover:bg-blue-50 p-2 rounded-md transition-colors">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Linkedin className="h-5 w-5 text-blue-700" />
                  </div>
                  <span className="ml-3 text-gray-700">HIMSI University</span>
                </a>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-blue-900">Jam Operasional</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium">Senin - Jumat</p>
                    <p className="text-gray-600">09:00 - 17:00 WIB</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium">Sabtu</p>
                    <p className="text-gray-600">10:00 - 14:00 WIB</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium">Minggu & Hari Libur</p>
                    <p className="text-gray-600">Tutup</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-2xl font-bold mb-6 text-blue-900">Lokasi Kami</h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="aspect-w-16 aspect-h-9 rounded-md overflow-hidden">
            {/* Placeholder for map - in a real application, you'd integrate Google Maps or similar */}
            <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                <p className="text-lg font-medium text-gray-700">Peta Lokasi</p>
                <p className="text-gray-500">Gedung Fakultas Ilmu Komputer, Lantai 3</p>
                <p className="text-gray-500">Universitas Indonesia, Depok</p>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors" onClick={() => window.open("https://maps.google.com/?q=Fakultas+Ilmu+Komputer+Universitas+Indonesia", "_blank")}>
                  Buka di Google Maps
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold mb-8 text-blue-900 text-center">Pertanyaan yang Sering Diajukan</h2>

        <div className="max-w-3xl mx-auto space-y-6">
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
              answer: "Ya, HIMSI terbuka untuk kolaborasi dengan berbagai pihak, baik dari industri, institusi pendidikan, maupun organisasi lainnya. Silakan hubungi kami melalui email atau form kontak untuk diskusi lebih lanjut.",
            },
            {
              question: "Bagaimana cara mendapatkan sertifikat kegiatan dari HIMSI?",
              answer:
                "Sertifikat kegiatan HIMSI akan diberikan kepada peserta yang telah mengikuti kegiatan sesuai dengan ketentuan yang berlaku. Biasanya sertifikat akan dikirim melalui email dalam waktu 1-2 minggu setelah kegiatan selesai.",
            },
          ].map((faq, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2 text-blue-900">{faq.question}</h3>
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Masih Punya Pertanyaan?</h2>
          <p className="text-blue-200 mb-8 max-w-2xl mx-auto">Jangan ragu untuk menghubungi kami. Tim HIMSI siap membantu menjawab semua pertanyaan Anda.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:kontak@himsi-university.ac.id" className="px-6 py-3 bg-white text-blue-900 font-medium rounded-md hover:bg-blue-50 transition-colors">
              <Mail className="h-4 w-4 inline-block mr-2" />
              Email Kami
            </a>
            <a href="tel:+6281234567890" className="px-6 py-3 bg-blue-700 text-white font-medium rounded-md hover:bg-blue-800 transition-colors">
              <Phone className="h-4 w-4 inline-block mr-2" />
              Hubungi Kami
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
