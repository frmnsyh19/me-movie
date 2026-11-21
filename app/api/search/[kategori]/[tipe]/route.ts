import { getPopularMovie, getSearchMovie } from "@/service/tmdbmovieservice";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ kategori: string; tipe: string }> },
) {
  try {
    const { kategori, tipe } = await params;

    if (!["movie", "tv"].includes(kategori)) {
      return NextResponse.json(
        { message: "Kategori tidak valid" },
        { status: 400 },
      );
    }

    const page = Number(new URL(req.url).searchParams.get("page") ?? "1");
    if (!Number.isInteger(page) || page < 1 || page > 500) {
      return NextResponse.json(
        { message: "Page tidak valid" },
        { status: 400 },
      );
    }

    const data = await getSearchMovie(page, kategori, tipe);
    return NextResponse.json({ data, message: "Berhasil" }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Gagal mengambil data" },
      { status: 500 },
    );
  }
}
