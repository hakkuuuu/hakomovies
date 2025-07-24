export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  runtime?: number;
  media_type?: 'movie' | 'tv';
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetails extends Movie {
  genres: Array<{ id: number; name: string }>;
  runtime: number;
  videos: Array<{
    id: string;
    key: string;
    site: string;
    type: string;
  }>;
}

export interface SearchBarProps {
  onSearch: (query: string) => void;
}

export interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

export type TimeWindow = 'day' | 'week' | 'month'; 