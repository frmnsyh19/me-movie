import { getPopularMovie } from "@/service/tmdbmovieservice";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = searchParams.get("page") ?? 1;

    const numberPage = Number(page);

    const kategori = "movie";

    const data = await getPopularMovie(numberPage, kategori);

    return NextResponse.json(
      {
        status: 200,
        data,
        message: "OMG you success get data popular",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);
  }
}
