import { useQuery } from "@tanstack/react-query";
import React from "react";

export const useGetSimiliarMovie = (id: number) => {
  return useQuery({
    queryKey: ["GetSimiliarMovie", id],
    queryFn: async () => {
      const res = await fetch(`/api/movie/${id}/similiar`);

      if (!res.ok) {
        throw new Error("something wrong");
      }

      const data = await res.json();

      return data.data;
    },
  });
};
