'use client';
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import EventCard from "./EventCard";

const EventsWithFilter = ({ initialEvents }) => {
  const [filter, setFilter] = useState("ALL");
  const filteredEvents =
    filter === "ALL"
      ? initialEvents
      : initialEvents.filter((event) => event.status === filter);

  return (
    <div className="min-h-screen mt-6 py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 mb-4">
            Jelajahi Acara Kami
          </h1>
          <div className="w-16 h-1 bg-gray-300 mx-auto rounded-full"></div>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {[
            { id: "ALL", label: "Semua" },
            { id: "UPCOMING", label: "Akan Datang" },
            { id: "ONGOING", label: "Berlangsung" },
            { id: "PAST", label: "Selesai" }
          ].map((status) => (
            <motion.button
              key={status.id}
              onClick={() => setFilter(status.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                filter === status.id
                  ? "bg-gray-800 text-white shadow-sm"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
              }`}
            >
              {status.label}
            </motion.button>
          ))}
        </motion.div>

        {filteredEvents.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-100"
          >
            <div className="flex flex-col items-center text-center">
              <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak Ada Acara</h3>
              <p className="text-gray-600">
                Tidak ada acara dengan status {filter === "ALL" ? "tersedia" : filter.toLowerCase()} saat ini.
              </p>
            </div>
          </motion.div>
        ) : (
          <AnimatePresence>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {filteredEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default EventsWithFilter;