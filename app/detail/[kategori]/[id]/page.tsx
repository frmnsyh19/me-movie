import { WrapperDetailMovie } from "@/components/WrapperDetailMovie";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ kategori: string; id: number }>;
}) {
  const { kategori, id } = await params;

  return (
    <div className="w-full flex flex-col">
      <WrapperDetailMovie id={id} kategori={kategori} />
    </div>
  );
}
