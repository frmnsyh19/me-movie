import { useQuery } from "@tanstack/react-query";
import React from "react";

export const useGetSimiliarMovie = (id: number, kategori: string) => {
  return useQuery({
    queryKey: ["GetSimiliarMovie", id, kategori],
    queryFn: async () => {
      const res = await fetch(`/api/detail/${kategori}/${id}/similiar`);

      if (!res.ok) {
        throw new Error("something wrong");
      }

      const data = await res.json();

      return data.data;
    },
  });
};
