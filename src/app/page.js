import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";
import { Calendar, FileCode, Users, Trophy, Image } from "lucide-react";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white mt-15">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 lg:py-20 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4 tracking-tight">HIMSI: Pioneering Innovation</h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6 md:mb-8">
          Himpunan Mahasiswa Sistem Informasi (HIMSI) drives technological advancement through innovative programs and dynamic divisions.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <a href="/pages/acara" className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200">
            Explore Events
          </a>
          <a href="/pages/kontak" className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 bg-transparent border border-blue-600 text-blue-600 font-medium rounded-md hover:bg-blue-50 transition-colors duration-200">
            Connect With Us
          </a>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="bg-white py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8 md:mb-12">Why HIMSI Stands Out</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <Link href="/pages/acara" className="group">
              <div className="text-center p-4 sm:p-6 bg-blue-50 rounded-lg transition-all duration-200 group-hover:shadow-md group-hover:bg-blue-100">
                <Calendar className="w-10 h-10 md:w-12 md:h-12 text-blue-600 mx-auto mb-3 md:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">Signature Events</h3>
                <p className="text-sm sm:text-base text-gray-600">From hackathons to our flagship SIFest, our events inspire innovation.</p>
              </div>
            </Link>
            <Link href="/pages/program" className="group">
              <div className="text-center p-4 sm:p-6 bg-blue-50 rounded-lg transition-all duration-200 group-hover:shadow-md group-hover:bg-blue-100">
                <FileCode className="w-10 h-10 md:w-12 md:h-12 text-blue-600 mx-auto mb-3 md:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">Impactful Programs</h3>
                <p className="text-sm sm:text-base text-gray-600">Our divisions lead cutting-edge projects in AI and smart campus initiatives.</p>
              </div>
            </Link>
            <Link href="/pages/divisi" className="group">
              <div className="text-center p-4 sm:p-6 bg-blue-50 rounded-lg transition-all duration-200 group-hover:shadow-md group-hover:bg-blue-100 sm:col-span-2 lg:col-span-1 mx-auto sm:mx-0 max-w-md sm:max-w-none">
                <Users className="w-10 h-10 md:w-12 md:h-12 text-blue-600 mx-auto mb-3 md:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">Dynamic Divisions</h3>
                <p className="text-sm sm:text-base text-gray-600">Our specialized divisions drive excellence in information systems.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="bg-gray-50 py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8 md:mb-12">Latest News</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                title: "SIFest 2025: Innovate Together",
                desc: "Our annual SIFest is back, bringing together tech enthusiasts for workshops and competitions.",
              },
              {
                title: "AI Division Launches Project",
                desc: "A new program to enhance campus efficiency using machine learning technologies.",
              },
              {
                title: "HIMSI Partners with Tech Industry",
                desc: "Collaborating with leading companies to bring real-world tech experience to students.",
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3 md:mb-4">{item.desc}</p>
                <a href="/pages/news" className="text-blue-600 hover:underline font-medium text-sm sm:text-base">
                  Read More
                </a>
              </div>
            ))}
          </div>
          <div className="text-center mt-6 md:mt-8">
            <a href="/pages/news" className="inline-block px-4 sm:px-6 py-2 text-blue-600 font-medium hover:underline text-sm sm:text-base">
              View All News
            </a>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="bg-white py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8 md:mb-12">Our Achievements</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                title: "1st Place National Hackathon",
                desc: "HIMSI's team developed a smart campus app, earning top honors.",
              },
              {
                title: "Best Organizer SIFest",
                desc: "Recognized for hosting an exceptional tech festival for students.",
              },
              {
                title: "Top 10 ASEAN Tech Challenge",
                desc: "Our AI division ranked among the best in regional competition.",
              },
            ].map((achievement, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center bg-blue-50 rounded-lg p-4 sm:p-6">
                <Trophy className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-blue-600 mb-3 sm:mb-0 sm:mr-4 mx-auto sm:mx-0" />
                <div className="text-center sm:text-left">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">{achievement.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{achievement.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6 md:mt-8">
            <a href="/pages/achievements" className="inline-block px-4 sm:px-6 py-2 text-blue-600 font-medium hover:underline text-sm sm:text-base">
              See All Achievements
            </a>
          </div>
        </div>
      </section>

      {/* Gallery Teaser Section */}
      <section className="bg-gray-50 py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8 md:mb-12">Event Highlights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { img: "/images/sifest-2024.jpg", title: "SIFest 2024 Highlights" },
              { img: "/images/hackathon-2024.jpg", title: "Hackathon 2024" },
              { img: "/images/seminar-tech.jpg", title: "Tech Seminar 2023" },
            ].map((item, idx) => (
              <div key={idx} className="relative rounded-lg overflow-hidden h-48 sm:h-40 md:h-56 lg:h-64">
                <img src={item.img} alt={item.title} className="object-cover w-full h-full" />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                  <p className="text-white font-semibold text-sm sm:text-base">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6 md:mt-8">
            <a href="/pages/acara" className="inline-block px-4 sm:px-6 py-2 text-blue-600 font-medium hover:underline text-sm sm:text-base">
              View Full Gallery
            </a>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 py-10 md:py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">Inspired by HIMSI?</h2>
          <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-6 md:mb-8">Connect with us to learn more about our initiatives or collaborate on future projects.</p>
          <a href="/pages/kontak" className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 bg-white text-blue-900 font-medium rounded-md hover:bg-blue-50 transition-colors duration-200 text-sm sm:text-base">
            Get in Touch
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
