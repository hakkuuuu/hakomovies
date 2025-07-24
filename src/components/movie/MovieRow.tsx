import { Movie } from '../../types';
import { Card } from './MovieCard';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

export const MovieRow = ({ title, movies, onMovieClick }: MovieRowProps) => {
  return (
    <div>
      {/* Section Title */}
      <h2 className="text-2xl font-semibold text-white mb-6">{title}</h2>

      {/* Movie Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 mb-8">
        {movies.map((movie) => (
          <Card key={movie.id} movie={movie} onClick={onMovieClick} />
        ))}
      </div>
    </div>
  );
}; 