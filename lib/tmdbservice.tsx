import React from "react";

export async function tmdbservice<T>(endpoint: string): Promise<T> {
  const BaseUrl = "https://api.themoviedb.org/3";

  const token = process.env.MOVIE_READ_ACCESS_TOKEN;

  if (!token) {
    throw new Error("TMDB Access Token tidak ditemukan");
  }

  const response = await fetch(`${BaseUrl}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
    },
    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
}

const IMAGE_BASE = "https://image.tmdb.org/t/p";

export const getPosterUrl = (
  path: string | null,
  size: "w185" | "w342" | "w500" | "original" = "w500",
) => (path ? `${IMAGE_BASE}/${size}${path}` : "/no-poster.png");

export const formatDate = (date?: string | null, locale = "en-US") => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatCurrency = (value?: number | null) => {
  if (!value) return "-"; // budget 0 atau kosong = data tidak tersedia
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0, // tanpa desimal
  }).format(value);
};

export const getBackdropUrl = (
  path: string | null,
  size: "w780" | "w1280" | "original" = "w1280",
) => (path ? `${IMAGE_BASE}/${size}${path}` : "/no-backdrop.png");

export const getCastUrlImage = (
  path: string | null,
  size: "w780" | "w1280" | "original" = "w1280",
) => (path ? `${IMAGE_BASE}/${size}${path}` : "/no-backdrop.png");
