import { WrapperDetailMovie } from "@/components/WrapperDetailMovie";
import React from "react";

type props = {
  params: Promise<{ id: number }>;
};

export default async function page({ params }: props) {
  const { id } = await params;

  return (
    <div className="w-full flex flex-col">
      <WrapperDetailMovie id={id} />
    </div>
  );
}
