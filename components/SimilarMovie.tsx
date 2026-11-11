import { formatDate, getPosterUrl } from "@/lib/tmdbservice";
import { useGetSimiliarMovie } from "@/service/useGetSimiliarMovie";
import { Movie, MovieResponse } from "@/types/MovieType";
import React from "react";
import Link from "next/link";

export const SimilarMovie = ({ id }: { id: number }) => {
  const { data: similar, isPending } = useGetSimiliarMovie(id);

  if (isPending) {
    return <></>;
  }

  const similary = similar?.results?.slice(0, 7) ?? [];

  console.log(similary, "similary");

  return (
    <div className="w-full lg:w-4/12 lg:p-2 h-full ">
      <div className="w-full lg:p-2">
        <div className="flex w-full flex-col gap-2  bg-card p-3">
          <p className="text-xl font-bold md:text-2xl">Movie Similar</p>

          <div className="flex w-full snap-x snap-mandatory flex-row gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:snap-none md:flex-col md:gap-4 md:overflow-visible md:pb-0">
            {similary.map((item: Movie) => (
              <Link
                key={item.id}
                href={`/movie/${item.id}`}
                className="flex w-24 shrink-0 snap-start flex-col gap-1.5 md:w-full md:flex-row md:items-center md:gap-3">
                <div className="aspect-[2/3] w-full overflow-hidden rounded bg-muted md:aspect-auto md:h-24 md:w-16 md:shrink-0">
                  <img
                    src={getPosterUrl(item.poster_path)}
                    className="h-full w-full object-cover"
                    alt={item.title}
                  />
                </div>

                <div className="flex min-w-0 flex-col gap-0.5 md:gap-1">
                  <span className="line-clamp-2 text-xs font-medium leading-tight md:text-base">
                    {item.title}
                  </span>
                  <span className="text-[10px] text-muted-foreground md:text-sm">
                    {formatDate(item.release_date)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
