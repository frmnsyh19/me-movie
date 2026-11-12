"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Movie } from "@/types/MovieType";
import { formatDate, getBackdropUrl } from "@/lib/tmdbservice";

// export type HeroMovie = {
//   id: number;
//   title: string;
//   overview: string;
//   backdrop: string; // URL lengkap
//   rating: number;
//   year: string;
// };

export const HeroSlider = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [movies, setMovies] = React.useState<Movie[]>([]);

  const getTrandingMovies = async () => {
    try {
      const response = await fetch("/api/movie/tranding");

      if (!response.ok) {
        throw Error("failed to get data");
      }

      const data = await response.json();

      setMovies(data.data.results);

      console.log(data.data.results);

      // console.log(dataresults);
    } catch (error) {
      throw Error("error ini mas");
      console.log(error);
    }
  };

  React.useEffect(() => {
    getTrandingMovies();
  }, []);

  const now = new Date();
  const today = now.toISOString().slice(0, 10); // "2026-11-08"
  const thisYear = String(now.getFullYear()); // "2026"

  const heroMovies = movies
    .filter(
      (m) =>
        m.backdrop_path &&
        m.release_date &&
        m.release_date.startsWith(thisYear) && // rilis di tahun ini
        m.release_date <= today && // tapi sudah tayang
        m.vote_count >= 50 &&
        m.vote_average > 0,
    )
    .sort((a, b) => {
      if (b.vote_average !== a.vote_average) {
        return b.vote_average - a.vote_average;
      }
      return (
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
      );
    })
    .slice(0, 5);

  const autoplay = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true }),
  );

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  // return <></>;

  return (
    <section className="relative w-full">
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        plugins={[autoplay.current]}
        className="w-full">
        <CarouselContent className="ml-0">
          {heroMovies.map((movie, index) => (
            <CarouselItem key={movie.id} className="pl-0">
              <div className="relative h-[60vh] w-full md:h-[90vh]">
                <Image
                  src={getBackdropUrl(movie.backdrop_path)}
                  alt={movie.title}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                />

                {/* gradient bawah: tipis, hanya di bagian bawah */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* gradient kiri: tipis, supaya teks tetap terbaca */}
                <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-black/60 to-transparent" />

                <div className="absolute bottom-12 left-0 w-full px-4 md:px-12">
                  <div className="max-w-xl space-y-3">
                    <h2 className="text-3xl font-bold md:text-5xl">
                      {movie.title}
                    </h2>

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

                    <Button>
                      <Link href={`/movie/${movie.id}`}>Lihat Detail</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* indikator titik */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {heroMovies.map((_, i) => (
          <button
            key={i}
            aria-label={`Slide ${i + 1}`}
            onClick={() => api?.scrollTo(i)}
            className={cn(
              "h-2 rounded-full transition-all",
              i === current ? "w-6 bg-primary" : "w-2 bg-muted-foreground/50",
            )}
          />
        ))}
      </div>
    </section>
  );
};
