import { NextResponse } from "next/server";
import { fetchRatedMovies } from "@/lib/tmdb";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const guestSessionId = searchParams.get("guestSessionId");
    const page = Number(searchParams.get("page") || "1");

    if (!guestSessionId) {
      return NextResponse.json(
        { message: "Missing guest session id" },
        { status: 400 }
      );
    }

    const data = await fetchRatedMovies(guestSessionId, page);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch rated movies" },
      { status: 500 }
    );
  }
}