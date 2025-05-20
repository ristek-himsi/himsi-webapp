// app/api/organization/route.js
import { getCurrentOrganization } from "@/app/(main)/about/libs/data";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const organization = await getCurrentOrganization();
    return NextResponse.json(organization);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Failed to fetch organization data" }, { status: 500 });
  }
}
