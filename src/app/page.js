// src/app/page.js
import Navbar from "@/components/Navbar";
import Footer from "@/components/visitors/Footer";

import HeroSection from "@/components/dashboard/HeroSection";
import StatsSection from "@/components/dashboard/StatsSection";
import EventGallery from "@/components/dashboard/EventGallery";
import LatestEventSection from "@/components/dashboard/LatestEventSection";
import LatestNewsSection from "@/components/dashboard/LatestNewsSection";
import DivisionsSection from "@/components/dashboard/DivisionsSection";
import CtaSection from "@/components/dashboard/CtaSection";

// Import data fetching functions
import { getAllEvents } from "./(roles)/admin/events/libs/data";
import { getAllPosts } from "./(roles)/admin/posts/libs/data";
import { getAllDivisions } from "./(roles)/admin/divisions/libs/data";
import { getAllSifest } from "./(roles)/admin/sifests/libs/data";

const Page = async () => {
  const eventsData = await getAllEvents();
  const postsData = await getAllPosts();
  const divisionsData = await getAllDivisions();

  const sifests = await getAllSifest();
  console.log(sifests);

  const events = Array.isArray(eventsData) ? eventsData : eventsData?.data || [];
  // Pastikan postsData yang dilempar adalah array, jika dari API biasanya ada di dalam properti data
  const posts = Array.isArray(postsData?.data) ? postsData.data : Array.isArray(postsData) ? postsData : [];
  const divisions = Array.isArray(divisionsData) ? divisionsData : divisionsData?.data || [];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 mt-14">
        <HeroSection />
        <StatsSection events={events} posts={posts} divisions={divisions} />
        <EventGallery events={events} /> {/* Galeri event dengan Swiper */}
        <LatestEventSection events={events} />
        <LatestNewsSection posts={posts} />
        <DivisionsSection divisions={divisions} />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Page;
