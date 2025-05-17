import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/visitors/Footer";

// Initialize the Inter font
const inter = Inter({ subsets: ["latin"] });

// Metadata for the application
export const metadata = {
  title: "HOME | SAINTEK UIN Raden Fatah Palembang",
  description: "Website Resmi Himpunan Mahasiswa Sistem Informasi",
  icons: {
    icon: "/logo-himsi.png",
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
