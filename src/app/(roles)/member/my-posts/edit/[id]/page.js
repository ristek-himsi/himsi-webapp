import React from "react";
import { getMemberPostById } from "../../libs/data";
import EditPostForm from "../../components/EditPostForm";

const page = async ({ params }) => {
  const id = params.id;
  const post = await getMemberPostById(id);
  console.log(post);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Artikel #{id}</h1>
      <EditPostForm post={post} />
    </div>
  );
};

export default page;
