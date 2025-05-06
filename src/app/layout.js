import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "HIMSI Web",
  description: "Website Resmi Himpunan Mahasiswa Sistem Informasi",
};

export default function RootLayout({ children }) {
  return (
    <html className="scroll-smooth">
      <body className="font-inter text-gray-900 bg-gray-50">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
