import React from "react";
import { Button } from "./ui/button";
import { formatDate, getBackdropUrl } from "@/lib/tmdbservice";
import Image from "next/image";
import { Star } from "lucide-react";
import { useGetMovieDetail } from "@/service/useGetMovieDetail";
import Link from "next/link";
import { useGetVideosMovie } from "@/service/useGetVideosMovie";
import { MovieVideo } from "@/types/MovieType";
import { TrailerButton } from "./DialogTailer";

export const HeroDetail = ({ id }: { id: number }) => {
  const { data: movie, isPending } = useGetMovieDetail(id);

  const { data: videos, isPending: loadingVideos } = useGetVideosMovie(id);

  // console.log(data);

  if (isPending && loadingVideos) return <p>Loading...</p>;

  const trailer =
    videos?.results?.find(
      (item: MovieVideo) =>
        item.site === "YouTube" && item.type === "Trailer" && item.official,
    ) ??
    videos?.results?.find(
      (item: MovieVideo) => item.site === "YouTube" && item.type === "Trailer",
    ) ??
    null;

  console.log(videos, "videos");

  return (
    <>
      <div className="relative h-[60vh] w-full mt-7 md:h-[90vh]">
        <Image
          src={getBackdropUrl(movie.backdrop_path)}
          alt={movie.title}
          fill
          sizes="100vw"
          className="object-cover"
        />

        {/* gradient bawah: tipis, hanya di bagian bawah */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* gradient kiri: tipis, supaya teks tetap terbaca */}
        <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-black/60 to-transparent" />

        <div className="absolute bottom-12 left-0 w-full px-4 md:px-12">
          <div className="max-w-xl space-y-3">
            <h2 className="text-3xl font-bold md:text-5xl">{movie.title}</h2>

            <div className="flex items-center gap-3 text-sm">
              <span className="flex items-center gap-1 font-semibold">
                <Star className="size-4 fill-yellow-400 text-yellow-400" />
                {movie.vote_average.toFixed(1)}
              </span>
              <span className="text-muted-foreground">
                {formatDate(movie.release_date)}
              </span>
            </div>

            <p className="line-clamp-3 text-sm text-muted-foreground md:text-base">
              {movie.overview}
            </p>

            <TrailerButton trailer={trailer} />
          </div>
        </div>
      </div>
    </>
  );
};
