import { getDetailMovie } from "@/service/tmdbmovieservice";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const movieId = Number(id);

    const data = await getDetailMovie(movieId);

    return NextResponse.json(
      {
        status: 200,
        message: "OMG you success",
        data,
      },
      {
        status: 200,
      },
    );
  } catch (e) {
    console.error("Error fetching movie data:", e);
    return NextResponse.json(
      {
        message: "Failed to fetch movie data",
      },
      {
        status: 500,
      },
    );
  }
}
