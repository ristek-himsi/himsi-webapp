import React from "react";
// VERIFIKASI PATH IMPORT DATA SESUAI STRUKTUR PROJECT ANDA
import { getDivisionByLeaderId } from "../../members/libs/data"; // Path relatif untuk getDivisionByLeaderId
import { getDivisionNameByLeaderId } from "../../members/add/libs/data"; // Path relatif untuk getDivisionNameByLeaderId
import AchievementForm from "../components/AchievementForm";

// Tandai rute ini sebagai dinamis karena mungkin menggunakan cookie/sesi untuk mendapatkan leader ID
export const dynamic = "force-dynamic"; // <-- Tambahkan baris ini

const Page = async () => {
  // Fungsi ini kemungkinan membaca cookie/sesi, memicu rendering dinamis
  // Ini OK karena kita sudah menambahkan 'force-dynamic'
  const divisionId = await getDivisionByLeaderId();
  const divisionName = await getDivisionNameByLeaderId();

  // Anda bisa menambahkan logika penanganan di sini jika divisionId/Name null,
  // misal menampilkan pesan error atau redirect.
  // Namun, AchievementForm Anda sudah cukup robust untuk menerima null/undefined,
  // dan Server Action akan memvalidasi divisionId.
  // Untuk saat ini, kita biarkan agar AchievementForm yang menangani tampilan loading/kosong.
  if (!divisionId) {
    console.warn("Failed to get divisionId for leader in /leader/achievement/add");
    // Opsi: Tampilkan pesan "Anda bukan leader atau belum login"
    // return <div className="text-center py-12">Tidak dapat memuat form. Pastikan Anda login sebagai Leader Divisi.</div>;
  }

  return <AchievementForm divisionId={divisionId} divisionName={divisionName} />;
};

// Export fungsi dengan nama yang benar (Page)
export default Page;
