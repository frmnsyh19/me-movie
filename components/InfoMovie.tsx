import {
  CastMember,
  CrewMember,
  MovieDetail,
  production_countries,
} from "@/types/MovieType";
import React from "react";
import { RatingStars } from "./RatingStart";
import {
  formatCurrency,
  formatDate,
  getCastUrlImage,
  getPosterUrl,
} from "@/lib/tmdbservice";
import { SimilarMovie } from "./SimilarMovie";

interface genre {
  id: number;
  name: string;
}

export const InfoMovie = ({
  movie,
  id,
  crew,
  cast,
}: {
  id: number;
  movie: MovieDetail;
  crew: CrewMember;
  cast: CastMember[];
}) => {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-3 justify-center items-center p-1 lg:p-6">
      <div className="lg:w-[80%] w-full  flex flex-col gap-2 lg:p-3 shadow">
        {/* section untuk info title movie gtu2 bisa kali ya */}
        <div className="flex flex-col w-full gap-2 p-4 bg-card">
          {/* title movie */}
          <p className="text-2xl font-bold">
            {movie.title} ({movie.release_date?.slice(0, 4)})
          </p>
          {/* section genre & informasi negara */}
          <div className="flex w-full flex-wrap flex-row gap-2">
            {movie.production_countries?.map(
              (item: production_countries, i: number) => (
                <div
                  key={i}
                  className=" bg-pink-600 text-white p-1 text-center">
                  {item.name}
                </div>
              ),
            )}
            {movie.genres?.map((item: genre) => (
              <div
                key={item.id}
                className=" bg-pink-600 text-white p-1 text-center">
                {item.name}
              </div>
            ))}
          </div>
        </div>
        {/* cast */}
        <div className="w-full flex flex-col gap-2 bg-card p-2">
          <p className="text-2xl font-bold">Top Cast</p>
          <div className="grid w-full grid-cols-5 gap-2 p-1">
            {cast.map((item) => (
              <div
                key={item.id}
                className="flex min-w-0 flex-col items-center gap-1 text-center">
                <div className="aspect-[2/3] w-full overflow-hidden rounded-md bg-muted">
                  <img
                    src={getCastUrlImage(item.profile_path)}
                    className="h-full w-full object-cover"
                    alt={item.name}
                  />
                </div>
                <span className="line-clamp-2 text-xs font-medium md:text-sm">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* section untuk overview film trus pemainnya siapa aja */}
        <div className="flex flex-col w-full gap-2 p-4 bg-card">
          <div className="flex flex-row gap-1">
            <div className="flex flex-col justify-center items-center">
              <RatingStars
                rating={movie.vote_average}
                voteCount={movie.vote_count}
              />
            </div>
          </div>
          <div className="w-full flex flex-col">
            {/* cerita film */}
            <span className="">{movie.overview}</span>
            <div className="w-full flex flex-col mt-2">
              <span className="">Budget : {formatCurrency(movie.budget)}</span>
              <span className="">
                Director : <span className="text-pink-600">{crew?.name}</span>
              </span>
              <span className="">
                Negara :{" "}
                {movie.production_countries.map((item, i) => (
                  <span key={i} className="text-pink-600">
                    {item.name}
                  </span>
                ))}
              </span>
              <span className="">Votes : {movie.vote_average}</span>
              <span className="">
                Release : {formatDate(movie.release_date)}
              </span>
              <div className="w-20 h-24 mt-2">
                <img
                  src={getPosterUrl(movie.poster_path)}
                  className="object-cover w-full h-full rounded"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <SimilarMovie id={id} />
    </div>
  );
};
