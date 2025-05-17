
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
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-100 via-purple-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-extrabold text-indigo-900 mb-8 text-center tracking-tight"
        >
          Jelajahi Acara Kami
        </motion.h1>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          {["ALL", "UPCOMING", "ONGOING", "PAST"].map((status) => (
            <motion.button
              key={status}
              onClick={() => setFilter(status)}
              whileHover={{ scale: 1.1, boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.9 }}
              className={`px-6 py-3 rounded-full text-sm font-semibold shadow-md transition-all duration-300 ${
                filter === status
                  ? "bg-indigo-700 text-white"
                  : "bg-white text-indigo-700 hover:bg-indigo-100"
              }`}
            >
              {status === "ALL" ? "Semua" : status}
            </motion.button>
          ))}
        </motion.div>

        {filteredEvents.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/80 backdrop-blur-sm border-l-4 border-indigo-500 text-indigo-900 p-6 rounded-xl text-center shadow-lg"
          >
            <p className="text-lg font-medium">
              Tidak ada acara dengan status {filter.toLowerCase()} saat ini.
            </p>
          </motion.div>
        ) : (
          <AnimatePresence>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default EventsWithFilter;