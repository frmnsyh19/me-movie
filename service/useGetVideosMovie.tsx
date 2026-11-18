import { useQuery } from "@tanstack/react-query";
import React from "react";

export const useGetVideosMovie = (id: number, kategori: string) => {
  return useQuery({
    queryKey: ["GetTrailer", id, kategori],
    queryFn: async () => {
      const res = await fetch(`/api/detail/${kategori}/${id}/videos`);
      if (!res.ok) throw new Error("Gagal ambil trailer");
      const json = await res.json();
      return json.data; // objek trailer atau null
    },
    enabled: !!id && !!kategori,
  });
};
