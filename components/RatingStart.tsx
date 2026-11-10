import { Star } from "lucide-react";

const TOTAL_STARS = 10;

type RatingStarsProps = {
  rating?: number | null; // vote_average dari TMDB
  voteCount?: number | null; // vote_count dari TMDB
};

export const RatingStars = ({ rating, voteCount }: RatingStarsProps) => {
  const value = Math.min(Math.max(rating ?? 0, 0), TOTAL_STARS);

  return (
    <div className="flex items-center gap-3">
      <span className="text-7xl font-extrabold leading-none text-pink-600">
        {value.toFixed(1)}
      </span>

      <div className="flex flex-col gap-1">
        <div
          className="flex"
          role="img"
          aria-label={`Rating ${value.toFixed(1)} dari ${TOTAL_STARS}`}>
          {Array.from({ length: TOTAL_STARS }).map((_, i) => {
            // 0 sampai 100: seberapa penuh bintang ke-i
            const fill = Math.min(Math.max(value - i, 0), 1) * 100;

            return (
              <div key={i} className="relative size-5 shrink-0">
                {/* bintang kosong (dasar) */}
                <Star className="absolute inset-0 size-5 text-muted-foreground/40" />
                {/* bintang terisi, dipotong sesuai persentase */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${fill}%` }}>
                  <Star className="size-5 shrink-0 fill-pink-600 text-pink-600" />
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-sm text-muted-foreground">
          {(voteCount ?? 0).toLocaleString("id-ID")} pengguna
        </p>
      </div>
    </div>
  );
};
