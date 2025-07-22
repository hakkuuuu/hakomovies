import { Movie } from '../types';
import { Card } from './Card';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

export const MovieRow = ({ title, movies, onMovieClick }: MovieRowProps) => {
  return (
    <div className="mb-12">
      {/* Title with gradient line */}
      <div className="mb-6 flex items-center">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="ml-4 flex-grow h-[1px] bg-gradient-to-r from-[#ffbade]/50 to-transparent" />
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <Card key={movie.id} movie={movie} onClick={onMovieClick} />
        ))}
      </div>
    </div>
  );
}; 