// File: app/api/placeholder/[width]/[height]/route.js
import { NextResponse } from "next/server";
import { createCanvas } from "canvas";

export async function GET(request, { params }) {
  // Get width and height from params
  const width = parseInt(params.width) || 300;
  const height = parseInt(params.height) || 200;

  // Limit maximum size to prevent abuse
  const maxSize = 2000;
  const safeWidth = Math.min(width, maxSize);
  const safeHeight = Math.min(height, maxSize);

  try {
    // Create canvas with specified dimensions
    const canvas = createCanvas(safeWidth, safeHeight);
    const ctx = canvas.getContext("2d");

    // Fill background with light gray
    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, safeWidth, safeHeight);

    // Draw border
    ctx.strokeStyle = "#cccccc";
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, safeWidth - 2, safeHeight - 2);

    // Add text with dimensions
    const text = `${safeWidth} × ${safeHeight}`;
    ctx.font = `${Math.max(14, safeWidth / 15)}px Arial`;
    ctx.fillStyle = "#666666";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, safeWidth / 2, safeHeight / 2);

    // Convert canvas to buffer and prepare response
    const buffer = canvas.toBuffer("image/png");

    // Return response with appropriate headers
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400", // Cache for 24 hours
      },
    });
  } catch (error) {
    console.error("Error generating placeholder image:", error);
    return NextResponse.json({ error: "Failed to generate placeholder image" }, { status: 500 });
  }
}
