import { useQuery } from "@tanstack/react-query";
import React from "react";

export const useGetMovieCredits = (id: number) => {
  return useQuery({
    queryKey: ["GetCreditsMovie", id],
    queryFn: async () => {
      const res = await fetch(`/api/movie/${id}/credits`);

      if (!res.ok) {
        throw new Error("gagal");
      }

      const data = await res.json();

      return data.data;
    },
    enabled: !!id,
  });
};
