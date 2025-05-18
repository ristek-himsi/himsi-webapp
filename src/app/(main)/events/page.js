import { Suspense } from "react";
import { getAllEvents } from "@/app/(roles)/admin/events/libs/data";
import EventsWithFilter from "@/components/visitors/EventsWithFilter";
import Loading from "@/app/loading";

// Server Component
const EventsPage = async () => {
  const events = await getAllEvents();
  return <EventsWithFilter initialEvents={events} />;
};

// Page Component with Suspense
const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <EventsPage />
    </Suspense>
  );
};

export default Page;
