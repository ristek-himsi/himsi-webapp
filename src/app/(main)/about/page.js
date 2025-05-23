// src/app/(main)/about/page.js
import React from "react";
import AboutContent from "./components/AboutContent";

export const metadata = {
  title: "About | HIMSI SAINTEK UIN Raden Fatah Palembang",
  description:
    "Mengenal lebih dekat Himpunan Mahasiswa Sistem Informasi (HIMSI) SAINTEK UIN Raden Fatah Palembang. Pelajari visi, misi, sejarah, dan struktur organisasi kami dalam mengembangkan ekosistem teknologi informasi yang inovatif.",
};

const AboutPage = () => {
  return <AboutContent />;
};

export default AboutPage;
