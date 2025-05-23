import { Inter } from "next/font/google";
import "./globals.css";

// Initialize the Inter font
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HOME | SAINTEK UIN Raden Fatah Palembang",
  description: "Website Resmi Himpunan Mahasiswa Sistem Informasi (HIMSI) SAINTEK UIN Raden Fatah Palembang. Wadah aspirasi, kreativitas, dan inovasi mahasiswa Sistem Informasi untuk mengembangkan ekosistem teknologi yang berdampak.",
  keywords: "HIMSI, Himpunan Mahasiswa Sistem Informasi, UIN Raden Fatah Palembang, SAINTEK, mahasiswa sistem informasi, teknologi informasi, organisasi mahasiswa, website resmi",
  authors: [{ name: "HIMSI SAINTEK UIN Raden Fatah Palembang" }],
  creator: "HIMSI SAINTEK UIN Raden Fatah Palembang",
  publisher: "HIMSI SAINTEK UIN Raden Fatah Palembang",

  icons: {
    icon: "/logo-himsi.png",
    shortcut: "/logo-himsi.png",
    apple: "/logo-himsi.png",
  },

  openGraph: {
    title: "HIMSI SAINTEK UIN Raden Fatah Palembang",
    description: "Website Resmi Himpunan Mahasiswa Sistem Informasi. Wadah aspirasi, kreativitas, dan inovasi mahasiswa Sistem Informasi untuk mengembangkan ekosistem teknologi yang berdampak.",
    type: "website",
    locale: "id_ID",
    url: "https://himsi-saintek.ac.id", // Ganti dengan URL sebenarnya
    siteName: "HIMSI SAINTEK UIN Raden Fatah Palembang",
    images: [
      {
        url: "/logo-himsi.png",
        width: 1200,
        height: 630,
        alt: "Logo HIMSI SAINTEK UIN Raden Fatah Palembang",
      },
    ],
  },

  // Instagram-focused social media
  other: {
    "instagram:site": "@himsi_saintek", // Ganti dengan username Instagram HIMSI yang sebenarnya
    "instagram:creator": "@himsi_saintek",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#3B82F6" },
    { media: "(prefers-color-scheme: dark)", color: "#1E40AF" },
  ],

  category: "education",
  classification: "Educational Organization Website",

  // alternates: {
  //   canonical: "https://himsi-saintek.ac.id", // Ganti dengan URL sebenarnya
  // },
};

// Root layout component that wraps all pages
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
          <main className="">{children}</main>
        </div>
      </body>
    </html>
  );
}
