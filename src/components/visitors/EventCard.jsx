'use client';

import Link from "next/link";
import Image from "next/image";
import { getImageUrl } from "@/lib/supabase";
import { motion } from "framer-motion";

const EventCard = ({ event }) => {
  const statusColors = {
    UPCOMING: "bg-indigo-600",
    ONGOING: "bg-green-600",
    PAST: "bg-gray-600",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -10, boxShadow: "0 10px 20px rgba(0,0,0,0.15)" }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300"
    >
      <div className="relative h-56">
        <Image
          src={getImageUrl(event?.imageUrl, "events")}
          alt={event.name}
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div
          className={`absolute top-4 right-4 ${
            statusColors[event.status] || "bg-indigo-600"
          } text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md`}
        >
          {event.status}
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-indigo-900 mb-3 line-clamp-1">
          {event.name}
        </h2>
        <p className="text-indigo-700 text-sm mb-4 line-clamp-2 leading-relaxed">
          {event.description}
        </p>
        <div className="space-y-3 text-sm text-indigo-600">
          <p>
            <span className="font-semibold">Tanggal:</span>{" "}
            {new Date(event.startDate).toLocaleDateString("id-ID", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <p>
            <span className="font-semibold">Lokasi:</span> {event.location}
          </p>
        </div>
        <Link
          href={`/events/${event.id}`}
          className="mt-5 inline-block w-full text-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 font-semibold"
        >
          Lihat Detail
        </Link>
      </div>
    </motion.div>
  );
};

export default EventCard;