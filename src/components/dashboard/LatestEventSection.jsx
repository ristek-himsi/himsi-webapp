// src/components/LatestEventSection.js
import Link from 'next/link';
import EventCard from './EventCard'; // Pastikan path ini benar

const LatestEventSection = ({ events }) => {
  // Sort events by start date (newest first), lalu ambil yang paling baru/mendatang
  // Menggunakan new Date(b.startDate) - new Date(a.startDate) untuk descending (terbaru dulu)
  const sortedEvents = [...(events || [])].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  // Cari event "UPCOMING" yang paling dekat tanggalnya dari sekarang
  const upcomingEvents = sortedEvents.filter(event =>
    event.status === "UPCOMING" && new Date(event.startDate) >= new Date()
  ).sort((a, b) => new Date(a.startDate) - new Date(b.startDate)); // sort ascending untuk upcoming terdekat

  let latestEvent = null;
  if (upcomingEvents.length > 0) {
    latestEvent = upcomingEvents[0]; // Ambil upcoming terdekat
  } else if (sortedEvents.length > 0) {
    // Jika tidak ada upcoming, ambil event paling baru (yang sudah lewat atau sedang berlangsung)
    latestEvent = sortedEvents[0];
  }

  return (
    // Padding vertikal dan horizontal disesuaikan
    <div className="py-12 sm:py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header Section: flex-col di mobile, md:flex-row di layar lebih besar */}
        {/* items-start di mobile agar teks rata kiri, md:items-center untuk alignment di row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 sm:mb-10 md:mb-12">
          {/* Teks header: text-left di mobile, md:text-left tetap */}
          <div className="mb-6 md:mb-0 text-left w-full md:w-auto">
            {/* Ukuran font h2 disesuaikan */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">
              Event <span className="text-blue-600">Unggulan</span>
            </h2>
            {/* Ukuran font paragraf dan margin disesuaikan */}
            <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg text-gray-600 max-w-xl">
              Jangan lewatkan kegiatan menarik kami yang akan datang atau yang baru saja berlangsung!
            </p>
          </div>
          {/* Tombol "Lihat Semua": full-width di mobile, auto-width di md+ */}
          <Link
            href="/events"
            className="w-full md:w-auto inline-flex items-center justify-center text-sm sm:text-base text-blue-600 hover:text-blue-800 font-semibold py-2.5 px-5 sm:py-3 sm:px-6 rounded-lg transition-colors duration-300 group bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Lihat Semua Event
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>

        {latestEvent ? (
          // Wrapper untuk EventCard
          <div className="max-w-full sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto">
            <EventCard event={latestEvent} />
          </div>
        ) : (
          // State Kosong: padding dan ukuran teks disesuaikan
          <div className="bg-blue-50 rounded-xl p-6 sm:p-8 text-center shadow-sm border border-blue-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-base sm:text-lg md:text-xl font-medium text-gray-700">Belum ada event unggulan saat ini.</p>
            <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
              Silakan cek kembali nanti atau <Link href="/events" className="text-blue-600 hover:underline font-medium">lihat semua event</Link> kami.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestEventSection;