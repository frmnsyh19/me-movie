import { getPopularMovies, getSeriesPopular } from "@/service/tmdbmovieservice";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getSeriesPopular();

    return NextResponse.json(data);
  } catch (error) {
    console.error("TMDB Error:", error);

    return NextResponse.json(
      { message: "Failed to fetch movies" },
      { status: 500 },
    );
  }
}
