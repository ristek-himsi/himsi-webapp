// src/components/dashboard/LatestEventSection.js
import Link from 'next/link';
import EventCard from './EventCard'; // Pastikan path ini benar

const LatestEventSection = ({ events }) => {
  // Filter hanya event yang upcoming dan tanggalnya >= hari ini
  const upcomingEvents = [...(events || [])]
    .filter(event => 
      event.status === "UPCOMING" && new Date(event.startDate) >= new Date()
    )
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate)); // sort ascending untuk upcoming terdekat

  // Ambil event upcoming yang paling dekat
  const latestEvent = upcomingEvents.length > 0 ? upcomingEvents[0] : null;

  return (
    // Padding vertikal dan horizontal disesuaikan
    <div className="py-12 sm:py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header Section: hanya judul dan deskripsi */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          {/* Ukuran font h2 disesuaikan */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">
            Event <span className="text-blue-600">Akan Datang</span>
          </h2>
          {/* Ukuran font paragraf dan margin disesuaikan */}
          <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg text-gray-600 max-w-xl mx-auto">
            Jangan lewatkan event menarik yang akan segera dimulai!
          </p>
        </div>

        {latestEvent ? (
          <>
            {/* Wrapper untuk EventCard */}
            <div className="max-w-full sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto mb-8 sm:mb-10">
              <EventCard event={latestEvent} />
            </div>
            
            {/* Tombol "Lihat Semua" di bagian bawah */}
            <div className="text-center">
              <Link
                href="/events"
                className="inline-flex items-center justify-center text-sm sm:text-base text-blue-600 hover:text-blue-800 font-semibold py-2.5 px-5 sm:py-3 sm:px-6 rounded-lg transition-colors duration-300 group bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Lihat Semua Event
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </>
        ) : (
          // State Kosong: padding dan ukuran teks disesuaikan
          <div className="bg-blue-50 rounded-xl p-6 sm:p-8 text-center shadow-sm border border-blue-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-base sm:text-lg md:text-xl font-medium text-gray-700">Belum ada event yang akan datang.</p>
            <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2 mb-4 sm:mb-6">
              Silakan cek kembali nanti atau lihat semua event kami.
            </p>
            
            {/* Tombol "Lihat Semua Event" di state kosong */}
            <Link
              href="/events"
              className="inline-flex items-center justify-center text-sm sm:text-base text-blue-600 hover:text-blue-800 font-semibold py-2.5 px-5 sm:py-3 sm:px-6 rounded-lg transition-colors duration-300 group bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border border-blue-200"
            >
              Lihat Semua Event
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestEventSection;