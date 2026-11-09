import { MovieResponse } from "@/types/MovieType";
import { useQuery } from "@tanstack/react-query";

export const useGetMoviePopular = () => {
  return useQuery({
    queryKey: ["GetMovie"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/movie");

        if (!res.ok) {
          throw new Error("OMG gagal");
        }

        const data: MovieResponse = await res.json();

        return data.results;
      } catch (error) {
        console.log(error);
      }
    },
  });
};
