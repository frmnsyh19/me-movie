import { MovieVideoResponse } from "@/types/MovieType";
import { useQuery } from "@tanstack/react-query";

export const useGetMovieDetail = (id?: number | string, kategori?: string) => {
  return useQuery({
    queryKey: ["GetMovieDetail", id, kategori],
    queryFn: async () => {
      const res = await fetch(`/api/detail/${kategori}/${id}`);

      if (!res.ok) {
        throw new Error("Gagal ambil detail film");
      }

      const json = await res.json();
      return json.data;
    },
    enabled: !!id, // jangan fetch kalau id belum ada
  });
};
