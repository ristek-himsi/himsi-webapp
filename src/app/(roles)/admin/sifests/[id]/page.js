import React from "react";
import { getSifestDetail } from "../libs/data";
import Image from "next/image";
import { getImageUrl } from "@/lib/supabase";

const Page = async ({ params }) => {
  const id = parseInt(params.id);
  const sifest = await getSifestDetail(id);
  console.log(sifest);

  // Format tanggal
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-7xl mx-auto py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
      {/* Header SIFEST */}
      <div className="bg-blue-50 rounded-xl shadow-md overflow-hidden mb-6 sm:mb-10">
        <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-8 p-4 sm:p-6">
          <div className="w-full md:w-1/3 flex justify-center">
            {sifest.logoUrl && (
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48">
                <Image src={getImageUrl(sifest.logoUrl, "sifests")} alt={sifest.theme} fill className="object-contain rounded-lg" sizes="(max-width: 768px) 128px, (max-width: 1024px) 160px, 192px" />
              </div>
            )}
          </div>
          <div className="w-full md:w-2/3 mt-4 md:mt-0 text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">SIFEST {sifest.year}</h1>
            <h2 className="text-lg sm:text-xl font-semibold text-blue-700 mb-2 sm:mb-4">{sifest.theme}</h2>
            <div className="flex justify-center md:justify-start mb-3 sm:mb-4">
              <div className="bg-blue-100 px-3 py-1 rounded-full text-blue-800 text-sm sm:text-base">
                {formatDate(sifest.startDate)} - {formatDate(sifest.endDate)}
              </div>
            </div>
            <p className="text-gray-700 text-sm sm:text-base">{sifest.description}</p>
          </div>
        </div>
      </div>

      {/* Events List */}
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 px-1">Daftar Event</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {sifest.events.map((event) => (
          <div key={event.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            {event.imageUrl && (
              <div className="relative w-full h-36 sm:h-48">
                <Image src={getImageUrl(event.imageUrl, "events")} alt={event.name} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              </div>
            )}
            <div className="p-3 sm:p-4">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">{event.name}</h3>
              <div className="flex flex-wrap gap-2 mb-2 sm:mb-3">
                <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-md text-xs sm:text-sm">{event.status}</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md text-xs sm:text-sm">{event.type}</span>
              </div>
              <p className="text-gray-600 mb-2 sm:mb-3 text-sm sm:text-base line-clamp-2">{event.description}</p>
              <div className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">
                <span className="font-medium">Lokasi:</span> {event.location}
              </div>
              <div className="text-xs sm:text-sm text-gray-500 mb-2">
                <span className="font-medium">Tanggal:</span> {formatDate(event.startDate)} - {formatDate(event.endDate)}
              </div>

              {/* Gallery */}
              {event.gallery && event.gallery.length > 0 && (
                <div className="mt-3 sm:mt-4">
                  <h4 className="text-sm sm:text-base font-medium mb-2">Galeri</h4>
                  <div className="grid grid-cols-3 gap-1 sm:gap-2">
                    {event.gallery.map((item) => (
                      <div key={item.id} className="relative w-full pt-[66%]">
                        <Image src={getImageUrl(item.imageUrl, "events")} alt={item.caption || "Gallery image"} fill className="object-cover rounded absolute top-0 left-0" sizes="(max-width: 640px) 33vw, (max-width: 1024px) 16vw, 11vw" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
