export interface Genre {
  name: string;
  id?: number;
  endpoint?: string;
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
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