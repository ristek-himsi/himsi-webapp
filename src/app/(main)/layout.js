import Navbar from "@/components/Navbar";
import Footer from "@/components/visitors/Footer";

export default async function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div>{children}</div>
      </main>
      <Footer />
    </div>
  );
}
