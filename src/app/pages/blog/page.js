import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Calendar, User, Tag, ChevronRight } from "lucide-react";

const BlogPage = () => {
  // Categories for blog filtering
  const categories = ["Semua", "Teknologi", "Akademik", "Event", "Tutorial", "Karir"];
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  // Dummy blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "Mengenal Lebih Dekat dengan Teknologi Blockchain",
      excerpt: "Blockchain merupakan teknologi yang mengubah cara kita melihat transaksi digital. Mari mengenal lebih dekat tentang teknologi ini dan potensinya di masa depan.",
      category: "Teknologi",
      image: "/api/placeholder/600/400",
      author: "Budi Santoso",
      date: "5 Mei 2025",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "Tips Sukses Menghadapi Ujian Akhir Semester",
      excerpt: "Ujian akhir semester sudah di depan mata. Simak tips dan trik jitu untuk mempersiapkan diri dan mendapatkan hasil maksimal.",
      category: "Akademik",
      image: "/api/placeholder/600/400",
      author: "Dian Kusuma",
      date: "28 April 2025",
      readTime: "4 min read",
    },
    {
      id: 3,
      title: "Laporan Kegiatan Workshop Machine Learning",
      excerpt: "Workshop Machine Learning yang diselenggarakan HIMSI bulan lalu telah berhasil menarik minat banyak mahasiswa. Simak rangkuman kegiatannya.",
      category: "Event",
      image: "/api/placeholder/600/400",
      author: "Maya Indah",
      date: "20 April 2025",
      readTime: "6 min read",
    },
    {
      id: 4,
      title: "Membuat aplikasi Mobile dengan Flutter",
      excerpt: "Tutorial langkah demi langkah untuk membuat aplikasi mobile menggunakan framework Flutter dari dasar hingga publikasi di App Store.",
      category: "Tutorial",
      image: "/api/placeholder/600/400",
      author: "Galih Pratama",
      date: "15 April 2025",
      readTime: "10 min read",
    },
    {
      id: 5,
      title: "Persiapan Karir di Bidang Data Science",
      excerpt: "Data Science menjadi salah satu bidang karir yang paling diminati saat ini. Simak persiapan dan skill yang perlu dikuasai untuk menjadi seorang Data Scientist.",
      category: "Karir",
      image: "/api/placeholder/600/400",
      author: "Farhan Rizki",
      date: "10 April 2025",
      readTime: "7 min read",
    },
    {
      id: 6,
      title: "Pentingnya Cybersecurity di Era Digital",
      excerpt: "Di era digital saat ini, keamanan siber menjadi hal yang krusial. Pelajari pentingnya cybersecurity dan langkah-langkah dasar untuk melindungi data digital Anda.",
      category: "Teknologi",
      image: "/api/placeholder/600/400",
      author: "Arya Pratama",
      date: "5 April 2025",
      readTime: "5 min read",
    },
  ];

  // Filter blog posts based on active category and search query
  const filteredPosts = blogPosts
    .filter((post) => activeCategory === "Semua" || post.category === activeCategory)
    .filter((post) => post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));

  // Popular tags
  const popularTags = ["ReactJS", "Flutter", "UI/UX", "Data Science", "Cloud", "AI", "Web Development"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">Blog HIMSI</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Kumpulan artikel informatif dan inspiratif seputar teknologi, akademik, dan kegiatan HIMSI.</p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
              {/* Search */}
              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  placeholder="Cari artikel..."
                  className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category, idx) => (
                  <button
                    key={idx}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${activeCategory === category ? "bg-blue-600 text-white" : "bg-white text-blue-800 hover:bg-blue-100"}`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col">
                <div className="relative overflow-hidden h-48">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                  <div className="absolute top-0 right-0 m-4">
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md">{post.category}</span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg text-blue-900 mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 flex-1">{post.excerpt}</p>

                  <div className="flex justify-between items-center text-xs text-gray-500 mt-4">
                    <div className="flex items-center">
                      <User className="w-3 h-3 mr-1" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>{post.date}</span>
                    </div>
                    <span>{post.readTime}</span>
                  </div>

                  <a href={`/pages/blog/${post.id}`} className="mt-4 inline-flex items-center text-blue-600 text-sm font-medium hover:text-blue-800">
                    Baca Selengkapnya
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">Tidak ada artikel yang sesuai dengan pencarian Anda.</p>
            </div>
          )}

          {/* Sidebar for Desktop */}
          <div className="mt-16 lg:grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">{/* Recent posts section can go here */}</div>

            <div className="mt-8 lg:mt-0">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-bold text-blue-900 mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag, idx) => (
                    <span key={idx} className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-blue-100 hover:text-blue-800 cursor-pointer transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-bold text-blue-900 mb-4">Subscribe to Newsletter</h3>
                  <p className="text-sm text-gray-600 mb-4">Dapatkan update artikel terbaru langsung ke email Anda.</p>
                  <form className="space-y-3">
                    <input type="email" placeholder="Email address" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
