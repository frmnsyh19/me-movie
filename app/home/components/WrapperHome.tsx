"use client";

import { HeroSlider } from "@/components/HeroSlider";
import { PopularMovies } from "@/components/PopularMovie";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/Navbar";
import { Movie, MovieResponse } from "@/types/MovieType";
import React, { useEffect, useState } from "react";

export const WrapperHome = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  // const getSeries = async () => {
  //   try {
  //     const response = await fetch("/api/series");

  //     if (!response.ok) {
  //       throw Error("gagal ambil data");
  //     }

  //     const series = await response.json();

  //     console.log(series, "series");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetch("/api/movie");

        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }

        const data: MovieResponse = await response.json();

        setMovies(data.results);
      } catch (err) {
        console.log(err);
      }
    };

    getMovies();

    // getSeries();
  }, []);

  console.log(movies);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Navbar />
      <HeroSlider />
      <div className="w-full p-2">
        <PopularMovies movies={movies} />
      </div>
    </div>
  );
};
