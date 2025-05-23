import { Inter } from "next/font/google";
import "./globals.css";

// Initialize the Inter font
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HOME | SAINTEK UIN Raden Fatah Palembang",
  description: "Website Resmi Himpunan Mahasiswa Sistem Informasi (HIMSI) SAINTEK UIN Raden Fatah Palembang. Wadah aspirasi, kreativitas, dan inovasi mahasiswa Sistem Informasi untuk mengembangkan ekosistem teknologi yang berdampak.",

  icons: {
    icon: "/logo-himsi.png",
    shortcut: "/logo-himsi.png",
    apple: "/logo-himsi.png",
  },
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
