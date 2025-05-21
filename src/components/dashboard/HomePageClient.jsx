// src/components/dashboard/HomePageClient.js (atau path yang sesuai)
"use client";

import React, { useEffect } from "react";
// ... (import lainnya tetap sama)
import { CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { getImageUrl as getSupabaseImageUrl } from "@/lib/supabase";

import { CalendarDays, Newspaper, Megaphone, BookOpen, FileText, Info, Zap, Lightbulb, ArrowRight, Cpu, Users, Code2, Activity, Sparkles } from "lucide-react";

// Constants
const IMAGE_PLACEHOLDER = "/images/placeholder.png";
const DEFAULT_DIVISION_LOGO_URL = "/images/default-division-logo.png"; // Mungkin perlu logo versi gelap

// Helper functions
const formatDate = (dateString, options = { year: "numeric", month: "long", day: "numeric" }) => {
  if (!dateString) return "N/A";
  try {
    return new Date(dateString).toLocaleDateString("id-ID", options);
  } catch (error) {
    console.warn("Invalid date:", dateString);
    return "Invalid date";
  }
};

const getCategoryInfo = (category) => {
  // Warna disesuaikan untuk tema terang
  switch (category?.toUpperCase()) {
    case "NEWS":
      return { icon: <Newspaper className="h-4 w-4" />, color: "text-sky-700", bg: "bg-sky-100", border: "border-sky-300" };
    case "ANNOUNCEMENT":
      return { icon: <Megaphone className="h-4 w-4" />, color: "text-amber-700", bg: "bg-amber-100", border: "border-amber-300" };
    case "ARTICLE":
      return { icon: <BookOpen className="h-4 w-4" />, color: "text-emerald-700", bg: "bg-emerald-100", border: "border-emerald-300" };
    default:
      return { icon: <FileText className="h-4 w-4" />, color: "text-slate-600", bg: "bg-slate-100", border: "border-slate-300" };
  }
};

const BUCKET_NAMES = { posts: "posts", events: "events", divisions: "divisi", users: "users", sifests: "sifests", assets: "assets" };

const getSafeImageUrl = (imageName, bucketName, fallbackImage = IMAGE_PLACEHOLDER) => {
  if (!imageName) return fallbackImage;
  if (imageName.startsWith("http://") || imageName.startsWith("https://") || imageName.startsWith("/images/")) {
    return imageName;
  }
  try {
    return getSupabaseImageUrl(imageName, bucketName);
  } catch (error) {
    console.error(`Supabase URL error for ${imageName} in ${bucketName}:`, error);
    return fallbackImage;
  }
};

const HomePageClient = ({ initialData }) => {
  const { carouselItems = [], upcomingEvents = [], latestNews = [], divisions = [] } = initialData || {};

  useEffect(() => {
    // Efek animasi masuk bisa tetap ada atau disesuaikan
    const timeout = setTimeout(() => {
      document.querySelectorAll(".fade-in-up").forEach((el) => el.classList.add("faded-in"));
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  if (!initialData || (!carouselItems.length && !upcomingEvents.length && !latestNews.length && !divisions.length)) {
    return <div className="flex items-center justify-center min-h-[calc(100vh-200px)] text-slate-600 bg-white">Memuat data HIMSI...</div>;
  }

  const SectionTitle = ({ title, icon, className = "" }) => (
    <h2 className={`text-3xl sm:text-4xl font-bold mb-8 md:mb-10 flex items-center text-slate-800 ${className}`}>
      {icon && React.cloneElement(icon, { className: "w-8 h-8 sm:w-9 sm:h-9 mr-3" })}
      {title}
    </h2>
  );

  // Card untuk tema terang
  const LightStyledLinkCard = ({ href, children, className = "", hoverBorderColor = "hover:border-purple-400" }) => (
    <Link href={href} className={`group block bg-white p-4 sm:p-5 rounded-xl border border-slate-200 hover:border-opacity-80 ${hoverBorderColor} transition-all duration-300 shadow-lg hover:shadow-xl ${className}`}>
      {children}
    </Link>
  );

  return (
    <div className="bg-slate-50 text-slate-700 selection:bg-purple-500 selection:text-white">
      {" "}
      {/* Base background terang */}
      {/* Hero Section - Terang dengan aksen ungu lembut */}
      <section
        className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-20 sm:py-28 md:py-36 overflow-hidden"
        // Gradien sangat lembut, atau bisa solid white/off-white
        // style={{ background: 'linear-gradient(135deg, #f3e8ff 0%, #faf5ff 50%, #fff7ed 100%)' }}
      >
        {/* Pattern bisa disesuaikan atau dihilangkan jika terlalu ramai */}
        <div
          className="absolute inset-0 opacity-[0.3]"
          style={{
            backgroundImage: "url('/hero-background.jpg')",
            backgroundSize: "cover", // Mengisi area, mungkin ter-crop
            backgroundRepeat: "no-repeat", // Tidak diulang
            backgroundPosition: "center center", // Gambar diposisikan di tengah
            mixBlendMode: "multiply", // Tetap seperti sebelumnya atau sesuaikan
          }}
        ></div>

        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="mb-6 fade-in-up opacity-0">
            <Image
              src="/logo-himsi.png" // Logo versi gelap
              alt="Logo HIMSI"
              width={96}
              height={96}
              className="mx-auto rounded-full shadow-lg sm:w-28 sm:h-28 border-2 border-purple-200"
              priority
            />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight text-slate-900 fade-in-up opacity-0" style={{ animationDelay: "0.2s" }}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500">
              {" "}
              {/* Gradien teks tetap vibrant untuk kontras */}
              HIMSI UIN Raden Fatah
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 text-slate-600 max-w-lg sm:max-w-xl md:max-w-2xl mx-auto fade-in-up opacity-0" style={{ animationDelay: "0.4s" }}>
            <span className="font-mono text-purple-600/80">//</span> Merakit Inovasi, Menjalin Koneksi <span className="font-mono text-purple-600/80">_</span>
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 fade-in-up opacity-0" style={{ animationDelay: "0.6s" }}>
            <Button asChild size="lg" className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 rounded-lg font-semibold px-8 py-3.5">
              <Link href="/event" className="flex items-center justify-center">
                <Sparkles className="w-5 h-5 mr-2 text-yellow-300" /> Agenda & Event
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-purple-600 border-purple-500 hover:bg-purple-50 hover:text-purple-700 shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-300 rounded-lg font-semibold px-8 py-3.5"
            >
              <Link href="/info" className="flex items-center justify-center">
                <Lightbulb className="w-5 h-5 mr-2" /> Info & Artikel
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .fade-in-up {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.7s ease-out forwards;
        }
        .faded-in {
          opacity: 1;
          transform: translateY(0);
        } /* Class setelah animasi selesai */
      `}</style>
      {/* Carousel Section - Background putih atau abu-abu sangat muda */}
      {carouselItems && carouselItems.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          {" "}
          {/* atau bg-slate-100 */}
          <div className="container mx-auto px-4 sm:px-6">
            <SectionTitle title="Sorotan Terkini" icon={<Activity className="text-sky-500" />} className="justify-center text-center" />
            <Carousel plugins={[Autoplay({ delay: 4500, stopOnInteraction: true })]} opts={{ align: "start", loop: true }} className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto">
              <CarouselContent className="-ml-3 sm:-ml-4">
                {carouselItems.map((item, index) => (
                  <CarouselItem key={item.id || index} className="pl-3 sm:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                      <div className="relative overflow-hidden h-full flex flex-col bg-white shadow-lg hover:shadow-xl border border-slate-200 hover:border-sky-300 rounded-xl transition-all duration-300 group">
                        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9]">
                          <Image
                            src={getSafeImageUrl(item.imageUrl, item.type === "event" ? BUCKET_NAMES.events : BUCKET_NAMES.posts)}
                            alt={item.name || item.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          />
                          {/* Overlay bisa dihilangkan atau dibuat sangat subtle jika tidak perlu */}
                          {/* <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity"></div> */}
                          <div className="absolute top-3 right-3">
                            {item.type === "event" && <Badge className="bg-sky-500 text-white text-xs border-none shadow-sm">EVENT</Badge>}
                            {item.type === "info" && (
                              <Badge className={`${getCategoryInfo(item.category).bg} ${getCategoryInfo(item.category).color} text-xs border ${getCategoryInfo(item.category).border} shadow-sm`}>{item.category?.toUpperCase()}</Badge>
                            )}
                          </div>
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                          <CardTitle className="text-md sm:text-lg line-clamp-2 text-slate-800 mb-2 group-hover:text-sky-600 transition-colors">{item.name || item.title}</CardTitle>
                          <p className="text-sm text-slate-600 line-clamp-3 mb-3 flex-grow">{item.description || item.content?.substring(0, 100) + "..."}</p>
                          <Button asChild variant="link" className="mt-auto w-full text-sky-600 hover:text-sky-700 p-0 justify-start text-sm group-hover:translate-x-1 transition-transform">
                            <Link href={item.path || "#"} className="inline-flex items-center">
                              Selengkapnya <ArrowRight className="h-4 w-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-[-10px] sm:left-[-16px] md:left-[-20px] top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-slate-600 hidden md:flex h-10 w-10 items-center justify-center rounded-full shadow-md border border-slate-300 hover:border-slate-400 backdrop-blur-sm" />
              <CarouselNext className="absolute right-[-10px] sm:right-[-16px] md:right-[-20px] top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-slate-600 hidden md:flex h-10 w-10 items-center justify-center rounded-full shadow-md border border-slate-300 hover:border-slate-400 backdrop-blur-sm" />
            </Carousel>
          </div>
        </section>
      )}
      {/* Upcoming Events Section - Background terang */}
      {upcomingEvents && upcomingEvents.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 bg-slate-50">
          {" "}
          {/* Atau bg-gray-50 */}
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-10">
              <SectionTitle title="Agenda Mendatang" icon={<Zap className="text-emerald-500" />} />
              <Link href="/event" className="group text-emerald-600 hover:text-emerald-700 font-semibold flex items-center transition-colors text-sm sm:text-base">
                Lihat Semua Agenda <ArrowRight className="w-5 h-5 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
              {upcomingEvents.map((event) => (
                <LightStyledLinkCard key={event.id} href={`/event/${event.id}`} hoverBorderColor="hover:border-emerald-400">
                  <div className="relative w-full aspect-[16/10] mb-4 rounded-md overflow-hidden">
                    <Image
                      src={getSafeImageUrl(event.imageUrl, BUCKET_NAMES.events)}
                      alt={event.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                    />
                    <Badge className="absolute top-2 right-2 bg-emerald-500 text-white text-xs border-none shadow-sm">{event.type === "SIFEST" ? "SIFEST" : "EVENT"}</Badge>
                  </div>
                  <h3 className="text-lg font-semibold line-clamp-2 text-slate-800 mb-1 group-hover:text-emerald-600 transition-colors">{event.name}</h3>
                  <p className="text-sm text-emerald-600 font-medium flex items-center mb-2">
                    <CalendarDays className="w-4 h-4 mr-1.5" /> {formatDate(event.startDate)}
                  </p>
                  <p className="text-sm text-slate-600 line-clamp-3">{event.description}</p>
                </LightStyledLinkCard>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* Latest News Section - Background terang */}
      {latestNews && latestNews.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          {" "}
          {/* atau bg-slate-100 */}
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-10">
              <SectionTitle title="Info & Artikel" icon={<Lightbulb className="text-purple-500" />} />
              <Link href="/info" className="group text-purple-600 hover:text-purple-700 font-semibold flex items-center transition-colors text-sm sm:text-base">
                Telusuri Lebih Lanjut <ArrowRight className="w-5 h-5 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {latestNews.map((item) => {
                const categoryStyle = getCategoryInfo(item.category);
                return (
                  <LightStyledLinkCard key={item.id} href={`/info/${item.id}`} hoverBorderColor="hover:border-purple-400">
                    <div className="relative w-full aspect-[16/10] mb-4 rounded-md overflow-hidden">
                      <Image
                        src={getSafeImageUrl(item.imageUrl, BUCKET_NAMES.posts)}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                      />
                    </div>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryStyle.bg} ${categoryStyle.color} mb-2 border ${categoryStyle.border} shadow-xs`}>
                      {categoryStyle.icon}
                      <span className="ml-1.5">{item.category?.toUpperCase()}</span>
                    </div>
                    <h3 className="text-lg font-semibold line-clamp-2 text-slate-800 mb-1 group-hover:text-purple-600 transition-colors">{item.title}</h3>
                    <p className="text-xs text-slate-500 mb-2">
                      {formatDate(item.publishedAt)} oleh {item.author?.name || "Tim HIMSI"}
                    </p>
                    <p className="text-sm text-slate-600 line-clamp-3">{item.content?.substring(0, 120)}...</p>
                  </LightStyledLinkCard>
                );
              })}
            </div>
          </div>
        </section>
      )}
      {/* Divisions Section - Background terang */}
      {divisions && divisions.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 bg-slate-50">
          {" "}
          {/* Atau bg-gray-50 */}
          <div className="container mx-auto px-4 sm:px-6">
            <SectionTitle title="Struktur Organisasi" icon={<Cpu className="text-teal-500" />} className="text-center justify-center" />
            <p className="text-center text-slate-600 max-w-xl mx-auto mb-10 sm:mb-12 md:mb-16 text-base">
              Kenali unit kerja dan divisi yang menjadi <span className="text-teal-600 font-semibold">motor penggerak HIMSI</span> dalam berinovasi dan berkolaborasi.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5">
              {divisions.slice(0, 8).map((division) => (
                <Link
                  key={division.id}
                  href={`/divisi/${division.id}`}
                  className="group relative p-4 sm:p-6 rounded-xl bg-white border border-slate-200 hover:border-teal-300 transition-all duration-300 shadow-lg hover:shadow-xl aspect-square flex flex-col justify-center items-center text-center transform hover:scale-105 hover:bg-slate-50/50"
                >
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mb-3 sm:mb-4 rounded-full overflow-hidden border-2 border-teal-200 group-hover:border-teal-400 transition-colors shadow-md bg-slate-100">
                    <Image
                      src={getSafeImageUrl(division.logoUrl, BUCKET_NAMES.divisions, DEFAULT_DIVISION_LOGO_URL)} // Perlu logo yang kontras dengan background terang
                      alt={division.name}
                      fill
                      className="object-contain p-2" // object-contain agar logo tidak terpotong, padding agar ada space
                    />
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold text-slate-800 line-clamp-2 group-hover:text-teal-600 transition-colors">{division.name}</h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">{division.programCount > 0 ? `${division.programCount} Program` : "Divisi Esensial"}</p>
                </Link>
              ))}
            </div>
            {divisions.length > 0 && (
              <div className="text-center mt-12 sm:mt-16">
                <Button asChild size="lg" className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-10 py-3.5 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all">
                  <Link href="/divisi" className="flex items-center justify-center">
                    <Users className="w-5 h-5 mr-2.5" /> Lihat Semua Divisi
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePageClient;
