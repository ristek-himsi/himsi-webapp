import { Activity, Users, Code, ChartBar, Globe } from "lucide-react";

const DivisiPage = () => {
  const divisions = [
    {
      name: "Divisi Akademik",
      icon: <ChartBar className="w-12 h-12 text-blue-600 mb-4" />,
      description: "Bertanggung jawab untuk mengembangkan program peningkatan kemampuan akademik mahasiswa sistem informasi.",
    },
    {
      name: "Divisi Pengembangan SDM",
      icon: <Users className="w-12 h-12 text-blue-600 mb-4" />,
      description: "Fokus pada pengembangan softskill dan hardskill anggota HIMSI melalui berbagai pelatihan.",
    },
    {
      name: "Divisi Teknologi",
      icon: <Code className="w-12 h-12 text-blue-600 mb-4" />,
      description: "Mengelola infrastruktur teknologi dan pengembangan aplikasi untuk kebutuhan HIMSI.",
    },
    {
      name: "Divisi Hubungan Masyarakat",
      icon: <Globe className="w-12 h-12 text-blue-600 mb-4" />,
      description: "Bertanggung jawab untuk membangun jaringan dengan pihak eksternal dan mengelola komunikasi publik.",
    },
    {
      name: "Divisi Kegiatan",
      icon: <Activity className="w-12 h-12 text-blue-600 mb-4" />,
      description: "Merencanakan dan mengkoordinasikan berbagai kegiatan dan acara HIMSI.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">Divisi HIMSI</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">HIMSI memiliki beberapa divisi yang berperan penting dalam menjalankan program kerja dan mencapai tujuan organisasi.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {divisions.map((division, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col items-center text-center">
                  {division.icon}
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">{division.name}</h3>
                  <p className="text-gray-600">{division.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-blue-50 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Tertarik Bergabung?</h2>
            <p className="text-gray-700 mb-6">
              Setiap divisi selalu terbuka untuk mahasiswa yang ingin berkontribusi dan mengembangkan diri. Kamu dapat mendaftar menjadi anggota aktif di salah satu divisi yang sesuai dengan minat dan bakatmu.
            </p>
            <a href="#" className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200">
              Daftar Sekarang
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DivisiPage;
