import { NextResponse } from "next/server";
import { createGuestSession } from "@/lib/tmdb";

export async function GET() {
  try {
    const data = await createGuestSession();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create guest session" },
      { status: 500 }
    );
  }
}