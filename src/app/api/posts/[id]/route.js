import { NextResponse } from "next/server";
import { getPostDetail } from "@/app/(roles)/admin/posts/libs/data";
import { updatePostAction } from "@/app/(roles)/admin/posts/libs/action";
import { deletePostAction } from "@/app/(roles)/admin/posts/libs/action";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const result = await getPostDetail(id);

    return result.success ? NextResponse.json(result) : NextResponse.json(result, { status: 404 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const formData = await request.formData();
    const result = await updatePostAction({}, formData, id);

    return result.success ? NextResponse.json(result) : NextResponse.json(result, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const result = await deletePostAction(id);

    return result.success ? NextResponse.json(result) : NextResponse.json(result, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
