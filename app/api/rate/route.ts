import { NextResponse } from "next/server";
import { rateMovie } from "@/lib/tmdb";

export async function POST(req: Request) {
  try {
    const { movieId, rating, guestSessionId } = await req.json();

    const data = await rateMovie(movieId, rating, guestSessionId);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to rate movie" },
      { status: 500 }
    );
  }
}