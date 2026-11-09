import { MovieVideoResponse } from "@/types/MovieType";
import { useQuery } from "@tanstack/react-query";

export const useGetMovieDetail = (id?: number | string) => {
  return useQuery({
    queryKey: ["GetMovieDetail"],
    queryFn: async () => {
      const res = await fetch(`/api/movie/${id}`);

      if (!res.ok) {
        throw new Error("Gagal ambil detail film");
      }

      const json = await res.json();
      return json.data;
    },
    enabled: !!id, // jangan fetch kalau id belum ada
  });
};
