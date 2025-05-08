import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";
import { Calendar, FileCode, Users, Trophy, Image } from "lucide-react";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">HIMSI: Pioneering Innovation in Information Systems</h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
          Himpunan Mahasiswa Sistem Informasi (HIMSI) is a leading student organization driving technological advancement through innovative programs, flagship events like SIFest, and dynamic divisions. Discover our impact and explore our
          vision for the future of tech.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="/pages/acara" className="inline-block px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200">
            Explore Our Events
          </a>
          <a href="/pages/kontak" className="inline-block px-8 py-3 bg-transparent border border-blue-600 text-blue-600 font-medium rounded-md hover:bg-blue-50 transition-colors duration-200">
            Connect With Us
          </a>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">Why HIMSI Stands Out</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/pages/acara" className="group">
              <div className="text-center p-6 bg-blue-50 rounded-lg transition-all duration-200 group-hover:shadow-md group-hover:bg-blue-100">
                <Calendar className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Signature Events & SIFest</h3>
                <p className="text-gray-600">From hackathons to our flagship SIFest, our events inspire innovation and connect tech enthusiasts.</p>
              </div>
            </Link>
            <Link href="/pages/program" className="group">
              <div className="text-center p-6 bg-blue-50 rounded-lg transition-all duration-200 group-hover:shadow-md group-hover:bg-blue-100">
                <FileCode className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Impactful Programs</h3>
                <p className="text-gray-600">Our divisions lead cutting-edge projects, from AI solutions to smart campus initiatives.</p>
              </div>
            </Link>
            <Link href="/pages/divisi" className="group">
              <div className="text-center p-6 bg-blue-50 rounded-lg transition-all duration-200 group-hover:shadow-md group-hover:bg-blue-100">
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Dynamic Divisions</h3>
                <p className="text-gray-600">Our specialized divisions drive collaboration and excellence in information systems.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">Latest News & Updates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">SIFest 2025: Innovate Together</h3>
              <p className="text-gray-600 mb-4">Our annual SIFest is back, bringing together tech enthusiasts for workshops and competitions.</p>
              <a href="/pages/news" className="text-blue-600 hover:underline font-medium">
                Read More
              </a>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Division Launches Smart Campus Project</h3>
              <p className="text-gray-600 mb-4">A new program to enhance campus efficiency using machine learning technologies.</p>
              <a href="/pages/news" className="text-blue-600 hover:underline font-medium">
                Read More
              </a>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">HIMSI Partners with Tech Industry</h3>
              <p className="text-gray-600 mb-4">Collaborating with leading companies to bring real-world tech experience to students.</p>
              <a href="/pages/news" className="text-blue-600 hover:underline font-medium">
                Read More
              </a>
            </div>
          </div>
          <div className="text-center mt-8">
            <a href="/pages/news" className="inline-block px-6 py-2 text-blue-600 font-medium hover:underline">
              View All News
            </a>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">Our Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center bg-blue-50 rounded-lg p-6">
              <Trophy className="w-12 h-12 text-blue-600 mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">1st Place National Hackathon 2024</h3>
                <p className="text-gray-600">HIMSI’s team developed a smart campus app, earning top honors.</p>
              </div>
            </div>
            <div className="flex items-center bg-blue-50 rounded-lg p-6">
              <Trophy className="w-12 h-12 text-blue-600 mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Best Organizer SIFest 2023</h3>
                <p className="text-gray-600">Recognized for hosting an exceptional tech festival for students.</p>
              </div>
            </div>
            <div className="flex items-center bg-blue-50 rounded-lg p-6">
              <Trophy className="w-12 h-12 text-blue-600 mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Top 10 ASEAN Tech Challenge</h3>
                <p className="text-gray-600">Our AI division ranked among the best in regional competition.</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <a href="/pages/achievements" className="inline-block px-6 py-2 text-blue-600 font-medium hover:underline">
              See All Achievements
            </a>
          </div>
        </div>
      </section>

      {/* Gallery Teaser Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">Moments from Our Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="relative aspect-w-4 aspect-h-3 rounded-lg overflow-hidden">
              <img src="/images/sifest-2024.jpg" alt="SIFest 2024" className="object-cover w-full h-full" />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                <p className="text-white font-semibold">SIFest 2024 Highlights</p>
              </div>
            </div>
            <div className="relative aspect-w-4 aspect-h-3 rounded-lg overflow-hidden">
              <img src="/images/hackathon-2024.jpg" alt="Hackathon 2024" className="object-cover w-full h-full" />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                <p className="text-white font-semibold">Hackathon 2024</p>
              </div>
            </div>
            <div className="relative aspect-w-4 aspect-h-3 rounded-lg overflow-hidden">
              <img src="/images/seminar-tech.jpg" alt="Tech Seminar" className="object-cover w-full h-full" />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                <p className="text-white font-semibold">Tech Seminar 2023</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <a href="/pages/acara" className="inline-block px-6 py-2 text-blue-600 font-medium hover:underline">
              View Full Gallery
            </a>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Inspired by HIMSI?</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">Connect with us to learn more about our initiatives, collaborate on projects, or explore how HIMSI is shaping the future of technology.</p>
          <a href="/pages/kontak" className="inline-block px-8 py-3 bg-white text-blue-900 font-medium rounded-md hover:bg-blue-50 transition-colors duration-200">
            Get in Touch
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
