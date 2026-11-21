import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React from "react";

export const useGetAllMoviePopular = (
  page: number,
  kategori: string,
  tipe: string,
) => {
  return useQuery({
    queryKey: ["MoviePopular", page, kategori, tipe],
    queryFn: async () => {
      const response = await fetch(
        `/api/search/${kategori}/${tipe}?page=${page}`,
      );

      if (!response.ok) {
        throw new Error("something went wrong");
      }

      const data = await response.json();

      return data.data;
    },
    placeholderData: keepPreviousData,
  });
};
