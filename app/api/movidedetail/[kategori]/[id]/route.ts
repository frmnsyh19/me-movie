import { getDetailMovie } from "@/service/tmdbmovieservice";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string; kategori: string }> },
) {
  try {
    const { id, kategori } = await params;

    const numberId = Number(id);

    const data = await getDetailMovie(numberId, kategori);

    return NextResponse.json(
      {
        status: 200,
        data,
        message: "okeoke",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        status: 500,
      },
      {
        status: 500,
      },
    );
  }
}
