import { useEffect } from 'react';
import { MovieRow } from '../components/movie/MovieRow';
import { useMovieStore } from '../store/movieStore';
import { Movie } from '../types';

interface TrendingMoviesProps {
  onMovieClick: (movie: Movie) => void;
}

export const TrendingMovies = ({ onMovieClick }: TrendingMoviesProps) => {
  const { trendingMovies, isLoading, error, fetchTrendingMovies } = useMovieStore();

  useEffect(() => {
    fetchTrendingMovies();
  }, [fetchTrendingMovies]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ffbade]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mb-8">{error}</div>
    );
  }

  return (
    <MovieRow
      title="Trending Movies"
      movies={trendingMovies}
      onMovieClick={onMovieClick}
    />
  );
}; 