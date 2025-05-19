import React, { Suspense } from "react";
import { getDivisionDetail } from "@/app/(roles)/admin/divisions/libs/data";
import DivisionDetailContent from "../components/DivisionDetailContent";
import Loading from "@/app/loading";

// Server Component untuk fetch data
const DivisionDetailData = async ({ id }) => {
  const division = await getDivisionDetail(id);
  return <DivisionDetailContent division={division} />;
};

// Main Page Component dengan Suspense
const DivisionDetailPage = ({ params }) => {
  const id = params.id;

  return (
    <Suspense fallback={<Loading />}>
      <DivisionDetailData id={id} />
    </Suspense>
  );
};

export default DivisionDetailPage;
