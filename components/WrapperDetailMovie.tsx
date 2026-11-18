"use client";

import { useGetMovieDetail } from "@/service/useGetMovieDetail";
import React from "react";
import { Navbar } from "./ui/Navbar";
import { useGetVideosMovie } from "@/service/useGetVideosMovie";
import { CrewMember, MovieVideo } from "@/types/MovieType";
import { HeroDetail } from "./HeroDetail";
import { InfoMovie } from "./InfoMovie";
import { useGetMovieCredits } from "@/service/useGetMovieCredits";
import { useGetSimiliarMovie } from "@/service/useGetSimiliarMovie";

export const WrapperDetailMovie = ({
  id,
  kategori,
}: {
  id: number;
  kategori: string;
}) => {
  // const tailer = videos?.results?.find((item: MovieVideo) => (
  //  item.site === "Youtube" && item.type === "Tailer" && item.official
  // )) ?? null;

  const { data: movie, isPending, isError } = useGetMovieDetail(id, kategori);

  // console.log(trailer, "tailer");

  const { data: credits, isPending: creditsLoading } = useGetMovieCredits(
    id,
    kategori,
  );

  if (isPending || creditsLoading) return <p>Loading....</p>;
  if (isError || !movie) return <p>Data tidak ditemukan.</p>;

  console.log(credits, "movie");

  const sutradara = credits?.crew?.find((item: CrewMember) => {
    return item.job === "Director";
  });

  const topCast = [...(credits?.cast ?? [])]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 5);

  console.log(topCast, "topCast");

  console.log(credits, "jobs");

  console.log(movie, "movie");

  return (
    <div className="w-full flex flex-col gap-2">
      <Navbar />
      <HeroDetail id={id} movie={movie} kategori={kategori} />
      <InfoMovie
        movie={movie}
        crew={sutradara}
        id={id}
        cast={topCast}
        kategori={kategori}
      />
    </div>
  );
};
