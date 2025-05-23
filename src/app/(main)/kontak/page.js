// src/app/(main)/contact/page.js
import React from "react";
import ContactContent from "./components/ContactContent";

export const metadata = {
  title: "Kontak | HIMSI SAINTEK UIN Raden Fatah Palembang",
  description: "Hubungi HIMSI SAINTEK UIN Raden Fatah Palembang. Temukan informasi kontak, alamat sekretariat, email, dan media sosial kami. Kami siap membantu dan menjawab pertanyaan Anda.",
};

const ContactPage = () => {
  return <ContactContent />;
};

export default ContactPage;
