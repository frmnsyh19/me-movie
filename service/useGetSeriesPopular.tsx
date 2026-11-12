import { useQuery } from "@tanstack/react-query";
import React from "react";

export const useGetSeriesPopular = () => {
  return useQuery({
    queryKey: ["GetSeriesPopular"],
    queryFn: async () => {
      const res = await fetch("/api/series");

      if (!res.ok) {
        throw new Error("Gagal ambil data series populer");
      }
      const json = await res.json();
      return json;
    },
  });
};
