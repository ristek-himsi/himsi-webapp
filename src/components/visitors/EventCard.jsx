'use client';
import Link from "next/link";
import Image from "next/image";
import { getImageUrl } from "@/lib/supabase";
import { motion } from "framer-motion";

const EventCard = ({ event, index }) => {
  const statusConfig = {
    UPCOMING: {
      color: "bg-gray-600",
      icon: (
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      label: "Akan Datang"
    },
    ONGOING: {
      color: "bg-green-600",
      icon: (
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path>
        </svg>
      ),
      label: "Berlangsung"
    },
    PAST: {
      color: "bg-gray-400",
      icon: (
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      ),
      label: "Selesai"
    }
  };

  const status = statusConfig[event.status] || statusConfig.UPCOMING;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
        <div className="relative h-56 overflow-hidden">
          <Image
            src={getImageUrl(event?.imageUrl, "events")}
            alt={event.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-800/20 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h2 className="text-xl font-semibold text-white mb-1 line-clamp-1">
              {event.name}
            </h2>
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${status.color} text-white`}>
              {status.icon}
              {status.label}
            </div>
          </div>
        </div>
        
        <div className="p-5">
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {event.description}
          </p>
          
          <div className="space-y-2 mb-5">
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              {new Date(event.startDate).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
            
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              {event.location}
            </div>
          </div>
          
          <Link
            href={`/events/${event.id}`}
            className="block w-full text-center px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors duration-300 font-medium text-sm"
          >
            Lihat Detail
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;