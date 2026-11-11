export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  original_title: string;
}

export interface genre {
  id: number;
  name: string;
}

export interface production_countries {
  iso_3166_1: string;
  name: string;
}

export interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  budget: number;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  production_countries: production_countries[];
  genres: genre[];
  original_title: string;
}

export interface MovieVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
  published_at: string;
}

export interface MovieVideoResponse {
  id: number;
  results: MovieVideo[];
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Person {
  adult: boolean;
  gender: number; // 0 = tidak diketahui, 1 = perempuan, 2 = laki-laki, 3 = non-biner
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
}

export interface CastMember extends Person {
  cast_id: number;
  character: string; // nama peran yang dimainkan
  order: number; // urutan kepentingan, 0 = pemeran utama
}

export interface CrewMember extends Person {
  department: string; // "Directing", "Writing", "Production", dll.
  job: string; // "Director", "Screenplay", "Producer", dll.
}

export interface Credits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}
