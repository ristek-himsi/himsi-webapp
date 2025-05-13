// /app/api/program-image/route.js
import { NextResponse } from "next/server";
import { getImageUrl } from "@/lib/supabase";

export async function GET(request) {
  try {
    // Get the file name from the query params
    const { searchParams } = new URL(request.url);
    const fileName = searchParams.get("fileName");

    if (!fileName) {
      return NextResponse.json({ error: "File name is required" }, { status: 400 });
    }

    // Get the image URL from Supabase
    const url = getImageUrl(fileName, "programs");

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Error fetching image URL:", error);
    return NextResponse.json({ error: "Failed to get image URL" }, { status: 500 });
  }
}
