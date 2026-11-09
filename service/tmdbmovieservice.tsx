import { tmdbservice } from "@/lib/tmdbservice";
import { MovieResponse } from "@/types/MovieType";

export async function getPopularMovies() {
  return tmdbservice<MovieResponse>("/movie/popular?language=en-US&page=1");
}

export async function getSeriesPopular() {
  return tmdbservice<MovieResponse>("/tv/popular");
}

export async function getTrandingMovies() {
  return tmdbservice<MovieResponse>("/trending/movie/week?language=id-ID");
}
