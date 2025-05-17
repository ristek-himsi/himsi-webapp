import { getAllEvents } from "@/app/(roles)/admin/events/libs/data";
import EventsWithFilter from "@/components/visitors/EventsWithFilter";

// Server Component
const page = async () => {
  const events = await getAllEvents();
  return <EventsWithFilter initialEvents={events} />;
};

export default page;
