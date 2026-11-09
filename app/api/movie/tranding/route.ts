import { getTrandingMovies } from "@/service/tmdbmovieservice";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getTrandingMovies();

    return NextResponse.json(
      {
        status: 200,
        data,
        message: "success get data movies tranding",
      },
      {
        status: 200,
      },
    );
  } catch (e) {
    throw Error("ldklekwl");
    console.log(e);
  }
}
