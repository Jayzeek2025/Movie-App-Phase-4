import { NextResponse } from "next/server";
import { fetchMovies } from "@/lib/tmdb";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const query = searchParams.get("query") || "";
    const page = Number(searchParams.get("page") || "1");
    
    console.log("Query:", query, "Page:", page);

    const data = await fetchMovies(query, page);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch movies" },
      { status: 500 }
    );
  }
}