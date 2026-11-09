import { useQuery } from "@tanstack/react-query";
import React from "react";

export const useGetVideosMovie = (id: number) => {
  return useQuery({
    queryKey: ["GetVideos", id],
    queryFn: async () => {
      const res = await fetch(`/api/movie/${id}/videos`);

      if (!res.ok) {
        throw new Error("OMG Something Went When Wrong");
      }

      const data = await res.json();

      return data.data;
    },
    enabled: !!id, // jangan fetch kalau id belum ada
  });
};
