// src/components/LatestNewsSection.js
import Link from 'next/link';
import NewsCard from './NewsCard'; // Pastikan path ini benar

const LatestNewsSection = ({ posts }) => {
  // Filter only published posts and sort by published date (newest first)
  const publishedPosts = (posts || [])
    .filter((post) => post.status === "PUBLISHED")
    .sort((a, b) => new Date(b.publishedAt || b.createdAt) - new Date(a.publishedAt || a.createdAt));

  // Get the latest 1 to 3 posts
  // Untuk mobile mungkin lebih baik 1 atau 2. Untuk desktop bisa 3.
  // Kita akan buat grid yang fleksibel.
  const latestPosts = publishedPosts.slice(0, 3); // Ambil hingga 3 berita terbaru

  return (
    // Padding vertikal dan horizontal disesuaikan
    <div className="py-12 sm:py-16 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 sm:mb-10 md:mb-12">
          <div className="mb-6 md:mb-0 text-left w-full md:w-auto">
            {/* Ukuran font h2 disesuaikan */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">
              Berita & Artikel <span className="text-indigo-600">Terkini</span>
            </h2>
            {/* Ukuran font paragraf dan margin disesuaikan */}
            <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg text-gray-600 max-w-xl">
              Ikuti perkembangan dan informasi terbaru dari HIMSI.
            </p>
          </div>
          {/* Tombol "Lihat Semua": full-width di mobile, auto-width di md+ */}
          {/* Pastikan href="/info" atau /posts atau /news sesuai dengan struktur rute Anda */}
          <Link
            href="/info"
            className="w-full md:w-auto inline-flex items-center justify-center text-sm sm:text-base text-indigo-600 hover:text-indigo-800 font-semibold py-2.5 px-5 sm:py-3 sm:px-6 rounded-lg transition-colors duration-300 group bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Semua Berita
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>

        {latestPosts.length > 0 ? (
          // Grid untuk menampilkan NewsCard
          // - 1 kolom di mobile
          // - Jika ada 2+ post, 2 kolom di sm+
          // - Jika ada 3 post, 3 kolom di lg+
          <div className={`grid grid-cols-1 ${latestPosts.length >= 2 ? 'sm:grid-cols-2' : ''} ${latestPosts.length >= 3 ? 'lg:grid-cols-3' : ''} gap-6 sm:gap-8`}>
            {latestPosts.map((post) => (
              // Jika hanya 1 post, buat dia lebih menonjol dengan max-w di tengah (opsional)
              // Untuk konsistensi, kita biarkan NewsCard mengisi kolom gridnya masing-masing
              <NewsCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          // State Kosong
          <div className="bg-indigo-50 rounded-xl p-6 sm:p-8 text-center shadow-sm border border-indigo-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 mx-auto mb-3 sm:mb-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <p className="text-base sm:text-lg md:text-xl font-medium text-gray-700">Belum ada berita terbaru.</p>
            <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
              Nantikan update dari kami atau <Link href="/info" className="text-indigo-600 hover:underline font-medium">lihat semua berita</Link>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestNewsSection;