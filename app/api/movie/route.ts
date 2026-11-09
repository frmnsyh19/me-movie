import { getPopularMovies } from "@/service/tmdbmovieservice";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getPopularMovies();

    return NextResponse.json(data);
  } catch (error) {
    console.error("TMDB Error:", error);

    return NextResponse.json(
      { message: "Failed to fetch movies" },
      { status: 500 },
    );
  }
}
