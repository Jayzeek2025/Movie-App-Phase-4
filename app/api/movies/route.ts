import { NextResponse } from "next/server";
import { fetchMovies } from "@/lib/tmdb";

export async function GET() {
  try {
    const movies = await fetchMovies();
    return NextResponse.json(movies);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch movies" },
      { status: 500 }
    );
  }
}