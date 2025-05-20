import React from "react";
import { getAllSifest } from "./libs/data";
import Link from "next/link";
import Image from "next/image";
import { getImageUrl } from "@/lib/supabase";

const Page = async () => {
  const sifests = await getAllSifest();

  // Format date to be more readable
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Si Fest Events</h1>
        <Link href="admin/sifests/create" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
          + Add New Si Fest
        </Link>
      </div>

      {sifests.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No Si Fest events found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sifests.map((sifest) => (
            <div key={sifest.id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative h-48 w-full">
                {sifest.logoUrl ? (
                  <Image src={getImageUrl(sifest.logoUrl, "sifests")} alt={`${sifest.theme} logo`} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold">{sifest.theme}</h2>
                  <span className="text-sm font-medium bg-blue-100 text-blue-800 py-1 px-2 rounded">{sifest.year}</span>
                </div>

                <p className="text-gray-700 mb-3 line-clamp-2">{sifest.description}</p>

                <div className="text-sm text-gray-600 mb-4">
                  <p>From: {formatDate(sifest.startDate)}</p>
                  <p>To: {formatDate(sifest.endDate)}</p>
                </div>

                <div className="flex justify-between pt-2 border-t">
                  <Link href={`/admin/sifests/${sifest.id}`} className="text-blue-600 hover:text-blue-800">
                    View Details
                  </Link>
                  <div className="space-x-2">
                    <Link href={`/admin/sifests/edit/${sifest.id}`} className="text-green-600 hover:text-green-800">
                      Edit
                    </Link>
                    <button className="text-red-600 hover:text-red-800">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
