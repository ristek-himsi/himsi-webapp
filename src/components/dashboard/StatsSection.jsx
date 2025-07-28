// src/components/dashboard/StatsSection.js
import { BriefcaseIcon, NewspaperIcon, UsersIcon } from '@heroicons/react/24/outline';

// Komponen StatItem dengan penyesuaian responsif yang lebih baik
const StatItem = ({ icon: Icon, value, label, colorClass }) => (
  <div className={`bg-white p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl shadow-lg text-center transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out border-t-4 ${colorClass}`}>
    {/* Ukuran ikon lebih kecil di mobile */}
    <Icon className={`h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 mx-auto mb-2 sm:mb-3 ${colorClass.replace('border-', 'text-')}`} />
    {/* Ukuran font angka diperkecil untuk mobile */}
    <div className={`font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-1 ${colorClass.replace('border-', 'text-')}`}>{value}</div>
    {/* Label dengan ukuran font yang lebih proporsional */}
    <div className="text-gray-600 font-medium text-xs sm:text-sm md:text-base">{label}</div>
  </div>
);

const StatsSection = ({ events, posts, divisions }) => {
  const eventCount = events?.length || 0;
  // Jika posts adalah objek dengan properti data (array) dan meta (untuk total)
  // Gunakan posts.meta.total jika ada, jika tidak, posts.length
  const postCount = posts?.meta?.total_items || posts?.length || 0;
  const divisionCount = divisions?.length || 0;

  return (
    // Padding vertikal dikurangi untuk mobile, horizontal padding juga disesuaikan
    <div className="py-8 sm:py-12 md:py-16 px-3 sm:px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        {/* Margin bawah header dikurangi untuk mobile */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          {/* Ukuran font header lebih kecil di mobile */}
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900">
            HIMSI dalam <span className="text-blue-600">Angka</span>
          </h2>
          {/* Ukuran font sub-header dan margin atas disesuaikan */}
          <p className="mt-2 sm:mt-3 md:mt-4 text-sm sm:text-base md:text-lg text-gray-600 max-w-xs sm:max-w-xl md:max-w-2xl mx-auto px-2 sm:px-0">
            Lihat sekilas pencapaian dan aktivitas kami melalui statistik berikut.
          </p>
        </div>
        {/* Gap antar item grid diperkecil untuk mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <StatItem icon={BriefcaseIcon} value={eventCount} label="Total Event" colorClass="border-blue-500" />
          <StatItem icon={NewspaperIcon} value={postCount} label="Artikel & Berita" colorClass="border-indigo-500" />
          <StatItem icon={UsersIcon} value={divisionCount} label="Divisi Aktif" colorClass="border-green-500" />
        </div>
      </div>
    </div>
  );
};

export default StatsSection;