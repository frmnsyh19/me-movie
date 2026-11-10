"use client";

import { useGetMovieDetail } from "@/service/useGetMovieDetail";
import React from "react";
import { Navbar } from "./ui/Navbar";
import { useGetVideosMovie } from "@/service/useGetVideosMovie";
import { MovieVideo } from "@/types/MovieType";
import { HeroDetail } from "./HeroDetail";
import { InfoMovie } from "./InfoMovie";

export const WrapperDetailMovie = ({ id }: { id: number }) => {
  // const tailer = videos?.results?.find((item: MovieVideo) => (
  //  item.site === "Youtube" && item.type === "Tailer" && item.official
  // )) ?? null;

  const { data: movie, isPending } = useGetMovieDetail(id);

  // console.log(trailer, "tailer");

  if (isPending) return <p>Loading....</p>;

  console.log(movie, "movie");

  return (
    <div className="w-full flex flex-col gap-2">
      <Navbar />
      <HeroDetail id={id} movie={movie} />
      <InfoMovie movie={movie} />
    </div>
  );
};
