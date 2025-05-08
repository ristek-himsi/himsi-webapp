import { addPostAction } from "@/app/(roles)/admin/posts/libs/action";
import { getAllPosts } from "@/app/(roles)/admin/posts/libs/data";

export async function GET() {
  try {
    const result = await getAllPosts();
    return new Response(JSON.stringify(result), {
      status: result.success ? 200 : 400,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const result = await addPostAction({}, formData);
    return new Response(JSON.stringify(result), {
      status: result.success ? 201 : 400,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
