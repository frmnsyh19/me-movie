import { tmdbservice } from "@/lib/tmdbservice";
import { Credits, MovieResponse, MovieVideoResponse } from "@/types/MovieType";

export async function getPopularMovies() {
  return tmdbservice<MovieResponse>("/movie/popular?language=en-US&page=1");
}

export async function getSeriesPopular(years = 3) {
  const now = new Date();
  const today = now.toISOString().slice(0, 10);

  const from = new Date(now);
  from.setFullYear(now.getFullYear() - years);
  const fromDate = from.toISOString().slice(0, 10);

  const params = new URLSearchParams({
    sort_by: "popularity.desc",
    "first_air_date.gte": fromDate,
    "first_air_date.lte": today,
    "vote_count.gte": "50",
  });

  return tmdbservice<MovieResponse>(`/discover/tv?${params}`);
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

export async function getMovieCredits(id: number) {
  return tmdbservice<Credits>(`/movie/${id}/credits`);
}

export async function getMovieSmiliar(id: number) {
  return tmdbservice<MovieResponse>(`/movie/${id}/similar`);
}
