import React from "react";
import { Suspense } from "react";
import Loading from "@/app/loading";
import { getEventById } from "@/app/(roles)/admin/events/libs/data";
import { EventDetailClient } from "../components/EventDetailClient";

// Komponen server (file utama)
const EventDetailPage = async ({ params }) => {
  const id = parseInt(params?.id);
  const event = await getEventById(id);

  return <EventDetailClient event={event} />;
};

// Komponent Page dengan Suspense
const Page = ({ params }) => {
  return (
    <Suspense fallback={<Loading />}>
      <EventDetailPage params={params} />
    </Suspense>
  );
};

export default Page;
