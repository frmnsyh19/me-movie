import { MovieDetail, production_countries } from "@/types/MovieType";
import React from "react";
import { RatingStars } from "./RatingStart";

interface genre {
  id: number;
  name: string;
}

export const InfoMovie = ({ movie }: { movie: MovieDetail }) => {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-3 justify-center items-center p-6">
      <div className="w-[65%]  flex flex-col gap-2 p-3 shadow">
        {/* section untuk info title movie gtu2 bisa kali ya */}
        <div className="flex flex-col w-full gap-2 p-4 bg-card">
          {/* title movie */}
          <p className="text-2xl font-bold">
            {movie.title} ({movie.release_date?.slice(0, 4)})
          </p>
          {/* infomasi untuk brp lama filmnya, resolusi, trus gatau liata aja */}
          {/* <div className="flex flex-row gap-1">
            <span></span>
            <span className=" font-extrabold text-gray-400">|</span>
            <span></span>
            <span className=" font-extrabold text-gray-400">|</span>
            <span></span>
          </div> */}
          {/* section genre & informasi negara */}
          <div className="flex w-full flex-row gap-2">
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
          </div>
        </div>
      </div>
      <div className="w-4/12 border border-red-500"></div>
    </div>
  );
};
