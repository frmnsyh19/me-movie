"use client";

import { HeroSlider } from "@/components/HeroSlider";
import { PopularMovies } from "@/components/PopularMovie";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/Navbar";
import { useGetMoviePopular } from "@/service/useGetMoviePopular";
import { Movie, MovieResponse } from "@/types/MovieType";
import React, { useEffect, useState } from "react";

export const WrapperHome = () => {
  const { data: movies } = useGetMoviePopular();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Navbar />
      <HeroSlider />
      <div className="w-full p-2">
        <PopularMovies movies={movies ?? []} />
      </div>
    </div>
  );
};
