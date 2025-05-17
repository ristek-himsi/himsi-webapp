import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/visitors/Footer";
import { Code, Database, Globe, Server, Smartphone, Github, ExternalLink } from "lucide-react";

const ProyekPage = () => {
  // Dummy projects data
  const projects = [
    {
      id: 1,
      title: "HIMSI Portal",
      category: "Web Application",
      icon: <Globe className="w-12 h-12 text-blue-600" />,
      image: "/api/placeholder/600/400",
      description: "Portal informasi dan manajemen untuk anggota HIMSI yang terintegrasi dengan sistem akademik kampus.",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      status: "Completed",
      year: "2024",
      team: ["Tim Divisi Teknologi"],
      links: {
        github: "https://github.com/himsi/portal",
        demo: "https://portal.himsi.org",
      },
    },
    {
      id: 2,
      title: "HIMSI Mobile App",
      category: "Mobile Application",
      icon: <Smartphone className="w-12 h-12 text-blue-600" />,
      image: "/api/placeholder/600/400",
      description: "Aplikasi mobile untuk memudahkan anggota HIMSI mendapatkan informasi dan berkomunikasi.",
      technologies: ["Flutter", "Firebase", "Dart"],
      status: "In Progress",
      year: "2024",
      team: ["Tim Divisi Teknologi"],
      links: {
        github: "https://github.com/himsi/mobile-app",
        demo: null,
      },
    },
    {
      id: 3,
      title: "Sistem Manajemen Event",
      category: "Web Application",
      icon: <Code className="w-12 h-12 text-blue-600" />,
      image: "/api/placeholder/600/400",
      description: "Sistem untuk mengelola pendaftaran dan kehadiran peserta dalam acara yang diselenggarakan oleh HIMSI.",
      technologies: ["Laravel", "MySQL", "Bootstrap", "jQuery"],
      status: "Completed",
      year: "2023",
      team: ["Tim Divisi Teknologi", "Tim Divisi Kegiatan"],
      links: {
        github: "https://github.com/himsi/event-system",
        demo: "https://event.himsi.org",
      },
    },
    {
      id: 4,
      title: "Database Alumni",
      category: "Database",
      icon: <Database className="w-12 h-12 text-blue-600" />,
      image: "/api/placeholder/600/400",
      description: "Database untuk mengelola dan melacak informasi alumni HIMSI untuk memfasilitasi networking dan mentorship.",
      technologies: ["PostgreSQL", "Django", "Python"],
      status: "Completed",
      year: "2023",
      team: ["Tim Divisi Teknologi", "Tim Divisi Hubungan Masyarakat"],
      links: {
        github: "https://github.com/himsi/alumni-db",
        demo: "https://alumni.himsi.org",
      },
    },
    {
      id: 5,
      title: "API Sistem Informasi Akademik",
      category: "API",
      icon: <Server className="w-12 h-12 text-blue-600" />,
      image: "/api/placeholder/600/400",
      description: "API untuk mengintegrasikan sistem HIMSI dengan sistem informasi akademik kampus.",
      technologies: ["Node.js", "Express", "MongoDB", "JWT"],
      status: "In Progress",
      year: "2024",
      team: ["Tim Divisi Teknologi"],
      links: {
        github: "https://github.com/himsi/academic-api",
        demo: null,
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">Proyek HIMSI</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Berbagai proyek pengembangan teknologi yang diinisiasi dan dikembangkan oleh tim HIMSI.</p>
          </div>

          {/* Project List */}
          <div className="space-y-12">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="md:flex">
                  <div className="md:w-2/5 relative">
                    <img src={project.image} alt={project.title} className="w-full h-64 md:h-full object-cover" />
                    <div className="absolute top-0 left-0 m-4 p-3 bg-white/80 backdrop-blur-sm rounded-xl">{project.icon}</div>
                    <div className="absolute top-0 right-0 m-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${project.status === "Completed" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}>{project.status}</span>
                    </div>
                  </div>

                  <div className="p-6 md:w-3/5">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-sm text-gray-500">
                          {project.category} • {project.year}
                        </span>
                        <h2 className="text-2xl font-bold text-blue-900 mt-1">{project.title}</h2>
                      </div>
                    </div>

                    <p className="text-gray-600 my-4">{project.description}</p>

                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, idx) => (
                          <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-800 text-xs rounded-md">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Team</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.team.map((member, idx) => (
                          <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                            {member}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4 mt-6">
                      {project.links.github && (
                        <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center px-4 py-2 bg-gray-800 text-white text-sm rounded-md hover:bg-gray-900 transition-colors">
                          <Github className="w-4 h-4 mr-2" />
                          GitHub
                        </a>
                      )}

                      {project.links.demo && (
                        <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Open Source Contribution */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-2xl">
            <div className="md:flex items-center justify-between">
              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold mb-4">Ingin Berkontribusi?</h2>
                <p className="mb-6">Semua proyek kami bersifat open source. Kami mengundang mahasiswa dan komunitas untuk berkontribusi dan berkolaborasi dalam pengembangan proyek-proyek HIMSI.</p>
                <div className="flex gap-4">
                  <a href="https://github.com/himsi" target="_blank" rel="noopener noreferrer" className="flex items-center px-4 py-2 bg-white text-blue-800 text-sm font-medium rounded-md hover:bg-blue-50 transition-colors">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub HIMSI
                  </a>
                  <a href="/pages/kontak" className="flex items-center px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-400 transition-colors">
                    Hubungi Tim Developer
                  </a>
                </div>
              </div>
              <div className="hidden md:block md:w-1/3 text-right">
                <Code className="inline-block w-32 h-32 text-blue-300 opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProyekPage;
