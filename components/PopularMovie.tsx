"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Movie } from "@/types/MovieType";
import { getPosterUrl } from "@/lib/tmdbservice";

export const PopularMovies = ({ movies }: { movies: Movie[] }) => {
  return (
    <section className="w-full p-3 bg-card">
      <h2 className="mb-4 text-2xl font-semibold">Film Populer</h2>

      <Carousel
        opts={{ align: "start", slidesToScroll: "auto" }}
        className="w-full">
        <CarouselContent className="-ml-3">
          {movies.map((movie) => (
            <CarouselItem
              key={movie.id}
              className="basis-1/2 pl-3 sm:basis-1/3 md:basis-1/4 lg:basis-1/6">
              <Link href={`/movie/${movie.id}`} className="group block">
                <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={
                      getPosterUrl(movie.poster_path) ||
                      "/images/placeholder.png"
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
                <h3 className="mt-2 line-clamp-1 text-sm font-medium">
                  {movie.title}
                </h3>
                {/* <p className="text-xs text-muted-foreground">{movie.year}</p> */}
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="-left-3 hidden md:flex" />
        <CarouselNext className="-right-3 hidden md:flex" />
      </Carousel>
    </section>
  );
};
