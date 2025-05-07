import React from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { getImageUrl } from "@/lib/supabase";

const EventStatusBadge = ({ status }) => {
  let bgColor;

  switch (status) {
    case "UPCOMING":
      bgColor = "bg-yellow-100 text-yellow-800";
      break;
    case "ONGOING":
      bgColor = "bg-green-100 text-green-800";
      break;
    case "COMPLETED":
      bgColor = "bg-gray-100 text-gray-800";
      break;
    default:
      bgColor = "bg-blue-100 text-blue-800";
  }

  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor}`}
    >
      {status.toLowerCase()}
    </span>
  );
};

const EventCard = ({ event, onDelete }) => {
  // Format dates
  const formattedStartDate = format(new Date(event.startDate), "MMM d, yyyy");
  const formattedEndDate = format(new Date(event.endDate), "MMM d, yyyy");

  // Get image URL from Supabase or use placeholder
  const getEventImageUrl = (imageUrl) => {
    if (!imageUrl) return "/placeholder-image.jpg";
    if (imageUrl.startsWith("http")) return imageUrl;
    const fileName = imageUrl.includes("/") ? imageUrl.split("/").pop() : imageUrl;
    return getImageUrl(fileName, "events");
  };

  const displayImage =
    event.gallery && event.gallery.length > 0 && event.gallery[0].imageUrl
      ? getEventImageUrl(event.gallery[0].imageUrl)
      : event.imageUrl
      ? getEventImageUrl(event.imageUrl)
      : "/placeholder-image.jpg";

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border">
      <div className="relative h-48 w-full">
        <Image
          src={displayImage}
          alt={event.name || "Event"}
          width={400}
          height={200}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
          className="transition-transform hover:scale-105"
          onError={(e) => {
            e.target.src = "/placeholder-image.jpg";
          }}
        />
        <div className="absolute top-2 left-2">
          <EventStatusBadge status={event.status} />
        </div>
        {event.type === "SIFEST" && (
          <div className="absolute top-2 right-2">
            <span className="bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full text-xs font-medium">
              SIFEST
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 line-clamp-1">{event.name}</h3>

        <div className="flex items-center text-sm text-gray-600 mb-2">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            ></path>
          </svg>
          <span>
            {formattedStartDate} - {formattedEndDate}
          </span>
        </div>

        <div className="flex items-center text-sm text-gray-600 mb-3">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
          <span className="line-clamp-1">{event.location}</span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">
            Tahun Akademik: {event.academicYear}
          </span>

          <div className="flex space-x-2">
            <Link
              href={`/admin/events/${event.id}`}
              className="text-blue-500 hover:text-blue-700"
              title="Lihat detail"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                ></path>
              </svg>
            </Link>

            <Link
              href={`/admin/events/${event.id}/edit`}
              className="text-yellow-500 hover:text-yellow-700"
              title="Edit event"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                ></path>
              </svg>
            </Link>

            <button
              onClick={onDelete}
              className="text-red-500 hover:text-red-700"
              title="Hapus event"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;