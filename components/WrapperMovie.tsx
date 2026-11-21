"use client";

import { getPosterUrl } from "@/lib/tmdbservice";
import { useGetAllMovieTranding } from "@/service/useGetAllMovieTranding";
import { useGetAllMoviePopular } from "@/service/useGetMoviePopularAll";
import { Movie, MovieResponse } from "@/types/MovieType";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export const WrapperMovie = ({
  kategori,
  tipe,
}: {
  kategori: string;
  tipe: string;
}) => {
  const [page, setPage] = useState(1);

  console.log(tipe, "tipe");

  const { data, isPending, isError, isPlaceholderData } = useGetAllMoviePopular(
    page,
    kategori,
    tipe,
  );

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Terjadi kesalahan.</p>;

  const totalPages = Math.min(data.total_pages, 500); // batas TMDB

  return (
    <div className="flex flex-col gap-6 w-full mt-2">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data.results.map((movie: Movie) => (
          <Link
            key={movie.id}
            href={`/detail/${kategori}/${movie.id}`}
            className="group block">
            <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-muted">
              <Image
                src={
                  getPosterUrl(movie.poster_path) || "/images/placeholder.png"
                }
                alt={movie.title}
                fill
                sizes="(min-width: 1024px) 16vw, (min-width: 768px) 25vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute right-2 top-2 flex items-center gap-1 rounded-md bg-black/70 px-2 py-1 text-xs text-white">
                <Star className="size-3 fill-yellow-400 text-yellow-400" />
                {movie.vote_average.toFixed(1)}
              </div>
            </div>
            <h3 className="mt-2 line-clamp-1 text-center text-sm font-medium">
              {movie.title ?? movie.name}
            </h3>
            {/* <p className="text-xs text-muted-foreground">{movie.year}</p> */}
          </Link>
        ))}
      </div>

      <div className="join justify-center">
        <button
          className="join-item btn"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}>
          «
        </button>
        <button className="join-item btn">
          Halaman {page} / {totalPages}
        </button>
        <button
          className="join-item btn"
          onClick={() => setPage((p) => p + 1)}
          disabled={page >= totalPages || isPlaceholderData}>
          »
        </button>
      </div>
    </div>
  );
};
