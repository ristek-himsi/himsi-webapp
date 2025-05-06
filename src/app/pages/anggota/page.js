import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AnggotaPage = () => {
  // Dummy data for members
  const boardMembers = [
    {
      name: "Arya Pratama",
      position: "Ketua HIMSI",
      image: "/api/placeholder/150/150",
      major: "Sistem Informasi 2022",
    },
    {
      name: "Dian Kusuma",
      position: "Wakil Ketua",
      image: "/api/placeholder/150/150",
      major: "Sistem Informasi 2022",
    },
    {
      name: "Farhan Rizki",
      position: "Sekretaris",
      image: "/api/placeholder/150/150",
      major: "Sistem Informasi 2022",
    },
    {
      name: "Maya Indah",
      position: "Bendahara",
      image: "/api/placeholder/150/150",
      major: "Sistem Informasi 2022",
    },
  ];

  const divisionLeaders = [
    {
      name: "Budi Santoso",
      position: "Ketua Divisi Akademik",
      image: "/api/placeholder/150/150",
      major: "Sistem Informasi 2022",
    },
    {
      name: "Sinta Dewi",
      position: "Ketua Divisi Pengembangan SDM",
      image: "/api/placeholder/150/150",
      major: "Sistem Informasi 2022",
    },
    {
      name: "Galih Pratama",
      position: "Ketua Divisi Teknologi",
      image: "/api/placeholder/150/150",
      major: "Sistem Informasi 2022",
    },
    {
      name: "Lina Putri",
      position: "Ketua Divisi Hubungan Masyarakat",
      image: "/api/placeholder/150/150",
      major: "Sistem Informasi 2023",
    },
    {
      name: "Reno Wijaya",
      position: "Ketua Divisi Kegiatan",
      image: "/api/placeholder/150/150",
      major: "Sistem Informasi 2023",
    },
  ];

  const memberStats = [
    { label: "Total Anggota", value: "120+" },
    { label: "Angkatan Aktif", value: "2022-2024" },
    { label: "Divisi", value: "5" },
    { label: "Proyek Aktif", value: "8" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">Anggota HIMSI</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Kenali para pengurus dan anggota yang menjalankan roda organisasi HIMSI dengan semangat kolaborasi.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {memberStats.map((stat, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl shadow-sm text-center">
                <p className="text-3xl font-bold text-blue-700">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Board Members */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">Pengurus Inti</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {boardMembers.map((member, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="p-5 text-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-lg font-semibold text-blue-800">{member.name}</h3>
                    <p className="text-blue-600 font-medium">{member.position}</p>
                    <p className="text-gray-500 text-sm mt-1">{member.major}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Division Leaders */}
          <section>
            <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">Ketua Divisi</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {divisionLeaders.map((member, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="p-4 text-center">
                    <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-base font-semibold text-blue-800">{member.name}</h3>
                    <p className="text-blue-600 text-sm font-medium">{member.position}</p>
                    <p className="text-gray-500 text-xs mt-1">{member.major}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <div className="mt-16 bg-blue-600 text-white p-8 rounded-2xl text-center">
            <h2 className="text-2xl font-bold mb-4">Bergabung Bersama Kami</h2>
            <p className="mb-6 max-w-2xl mx-auto">Kembangkan potensimu dan dapatkan pengalaman berharga dengan menjadi bagian dari keluarga besar HIMSI.</p>
            <a href="#" className="inline-block px-6 py-3 bg-white text-blue-700 font-medium rounded-md hover:bg-blue-50 transition-colors duration-200">
              Daftar Keanggotaan
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AnggotaPage;
