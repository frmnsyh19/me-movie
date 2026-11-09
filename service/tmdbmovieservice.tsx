import { tmdbservice } from "@/lib/tmdbservice";
import { MovieResponse, MovieVideoResponse } from "@/types/MovieType";

export async function getPopularMovies() {
  return tmdbservice<MovieResponse>("/movie/popular?language=en-US&page=1");
}

export async function getSeriesPopular() {
  return tmdbservice<MovieResponse>("/tv/popular");
}

export async function getDetailMovie(id: number) {
  return tmdbservice<MovieResponse>(`/movie/${id}`);
}

export async function getTrandingMovies() {
  return tmdbservice<MovieResponse>("/trending/movie/week?language=id-ID");
}

export async function getMovieTrailerVidio(id: number) {
  return tmdbservice<MovieVideoResponse>(`/movie/${id}/videos?language=en-US`);
}
