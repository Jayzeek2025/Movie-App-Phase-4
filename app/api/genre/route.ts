import { NextResponse } from "next/server";
import { fetchGenres } from "@/lib/tmdb";

export async function GET() {
  try {
    const data = await fetchGenres();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch genres" },
      { status: 500 }
    );
  }
}