// src/components/StatsSection.js
import { BriefcaseIcon, NewspaperIcon, UsersIcon } from '@heroicons/react/24/outline';

// Komponen StatItem dengan penyesuaian responsif
const StatItem = ({ icon: Icon, value, label, colorClass, iconSize = "h-10 w-10 sm:h-12 sm:w-12" }) => (
  <div className={`bg-white p-4 sm:p-6 rounded-xl shadow-lg text-center transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out border-t-4 ${colorClass}`}>
    {/* Ukuran ikon disesuaikan: lebih kecil di mobile, lebih besar di sm+ */}
    <Icon className={`${iconSize} mx-auto mb-3 sm:mb-4 ${colorClass.replace('border-', 'text-')}`} />
    {/* Ukuran font angka disesuaikan */}
    <div className={`font-extrabold text-3xl sm:text-4xl mb-1 ${colorClass.replace('border-', 'text-')}`}>{value}</div>
    {/* Ukuran font label disesuaikan */}
    <div className="text-gray-600 font-medium text-sm sm:text-base md:text-lg">{label}</div>
  </div>
);


const StatsSection = ({ events, posts, divisions }) => {
  const eventCount = events?.length || 0;
  // Jika posts adalah objek dengan properti data (array) dan meta (untuk total)
  // Gunakan posts.meta.total jika ada, jika tidak, posts.length
  const postCount = posts?.meta?.total_items || posts?.length || 0;
  const divisionCount = divisions?.length || 0;

  return (
    // Padding vertikal dikurangi sedikit di mobile
    <div className="py-12 sm:py-16 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        {/* Margin bawah header disesuaikan */}
        <div className="text-center mb-10 sm:mb-12">
          {/* Ukuran font header disesuaikan */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">
            HIMSI dalam <span className="text-blue-600">Angka</span>
          </h2>
          {/* Ukuran font sub-header dan margin atas disesuaikan */}
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 max-w-xl sm:max-w-2xl mx-auto">
            Lihat sekilas pencapaian dan aktivitas kami melalui statistik berikut.
          </p>
        </div>
        {/* Gap antar item grid disesuaikan */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <StatItem icon={BriefcaseIcon} value={eventCount} label="Total Event" colorClass="border-blue-500" />
          <StatItem icon={NewspaperIcon} value={postCount} label="Artikel & Berita" colorClass="border-indigo-500" />
          <StatItem icon={UsersIcon} value={divisionCount} label="Divisi Aktif" colorClass="border-green-500" />
        </div>
      </div>
    </div>
  );
};

export default StatsSection;