import { useQuery } from "@tanstack/react-query";
import React from "react";

export const useGetAllMovieTranding = (page: number) => {
  return useQuery({
    queryKey: ["MovieAllTranding"],
    queryFn: async () => {
      const res = await fetch(`/api/movie/tranding/all?page=${page}`);

      if (!res.ok) {
        throw new Error("Error nich");
      }

      const data = await res.json();

      return data.data;
    },
  });
};
