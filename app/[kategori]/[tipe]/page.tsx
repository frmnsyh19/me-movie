import { Navbar } from "@/components/ui/Navbar";
import { WrapperMovie } from "@/components/WrapperMovie";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ kategori: string; tipe: string }>;
}) {
  const { kategori, tipe } = await params;

  return (
    <div className="w-full flex flex-col">
      <Navbar />
      <WrapperMovie kategori={kategori} tipe={tipe} />
    </div>
  );
}
