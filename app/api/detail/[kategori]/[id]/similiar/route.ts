import { getMovieSmiliar } from "@/service/tmdbmovieservice";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string; kategori: string }> },
) {
  try {
    const { id, kategori } = await params;

    const movieId = Number(id);

    const data = await getMovieSmiliar(movieId, kategori);

    return NextResponse.json(
      {
        status: 200,
        data,
        message: "Success",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);

    // return NextResponse.json(
    //   {
    //     status: 500,
    //     message: "error cek routenya",
    //   },
    //   {
    //     status: 500,
    //   },
    // );
  }
}
