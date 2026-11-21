import { getMovieTrandingAll } from "@/service/tmdbmovieservice";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = searchParams.get("page") ?? 1;

    const numberPage = Number(page);

    const datas = await getMovieTrandingAll(numberPage);

    return NextResponse.json(
      {
        status: 200,
        data: datas,
        message: "OMG you success get data movie tranding",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);
  }
}
