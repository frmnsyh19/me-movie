"use client";

import { Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type TrailerButtonProps = {
  trailer: { key: string; name: string } | null;
};

export const TrailerButton = ({ trailer }: TrailerButtonProps) => {
  if (!trailer) {
    return (
      <Button variant="secondary" disabled>
        Trailer belum tersedia
      </Button>
    );
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="secondary" className="gap-2">
          <Play className="size-4 fill-current" />
          Lihat Trailer
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-4xl border-none bg-black p-0 sm:max-w-4xl">
        <DialogTitle className="sr-only">{trailer.name}</DialogTitle>
        <iframe
          className="aspect-video w-full rounded-lg"
          src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0`}
          title={trailer.name}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </DialogContent>
    </Dialog>
  );
};
