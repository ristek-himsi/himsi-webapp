import { Suspense } from "react";
import { getAllEvents } from "@/app/(roles)/admin/events/libs/data";
import EventsWithFilter from "@/components/visitors/EventsWithFilter";
import Loading from "@/app/loading";

export const metadata = {
  title: "Events | HIMSI SAINTEK UIN Raden Fatah Palembang",
  description: "Temukan berbagai acara, kegiatan, dan event menarik dari HIMSI SAINTEK UIN Raden Fatah Palembang. Mulai dari seminar teknologi, workshop, kompetisi, hingga kegiatan pengembangan diri mahasiswa.",
};

const EventsPage = async () => {
  const events = await getAllEvents();
  return <EventsWithFilter initialEvents={events} />;
};

const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <EventsPage />
    </Suspense>
  );
};

export default Page;
