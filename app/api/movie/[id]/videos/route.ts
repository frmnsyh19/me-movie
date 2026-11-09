import { getMovieTrailerVidio } from "@/service/tmdbmovieservice";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const movieId = Number(id);

    const data = await getMovieTrailerVidio(movieId);

    return NextResponse.json(
      {
        status: 200,
        data: data,
        message: "OMG",
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
