import { Inter } from "next/font/google";
import "./globals.css";

// Initialize the Inter font
const inter = Inter({ subsets: ["latin"] });

// Metadata for the application
export const metadata = {
  title: "HIMSI Web",
  description: "Website Resmi Himpunan Mahasiswa Sistem Informasi",
};

// Root layout component that wraps all pages
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
