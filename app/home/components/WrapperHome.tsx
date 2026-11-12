"use client";

import { HeroSlider } from "@/components/HeroSlider";
import { PopularMovies } from "@/components/PopularMovie";
import { Series } from "@/components/SeriesPopular";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/Navbar";
import { useGetMoviePopular } from "@/service/useGetMoviePopular";
import { useGetSeriesPopular } from "@/service/useGetSeriesPopular";
import { Movie, MovieResponse } from "@/types/MovieType";
import React, { useEffect, useState } from "react";

export const WrapperHome = () => {
  const { data: movies, isPending: movieLoading } = useGetMoviePopular();
  const { data: series, isPending: seriesLoading } = useGetSeriesPopular();

  if (movieLoading && seriesLoading) {
    return <></>;
  }

  console.log(series, "seriesss");

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Navbar />
      <HeroSlider />
      <div className="w-full p-1 flex flex-col gap-2 mt-2">
        <PopularMovies movies={movies ?? []} />
        <Series series={series?.results ?? []} />
      </div>
    </div>
  );
};
