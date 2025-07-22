import { MovieCardProps } from '../types';
import { StarIcon, ClockIcon } from '@heroicons/react/24/solid';

export const Card = ({ movie, onClick }: MovieCardProps) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  
  return (
    <div
      onClick={() => onClick(movie)}
      className="group relative w-[220px] h-[330px] rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105"
    >
      {/* Backdrop Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Movie Poster */}
      <img
        src={imageUrl}
        alt={movie.title}
        className="w-full h-full object-cover"
        loading="lazy"
      />

      {/* Content Overlay */}
      <div className="absolute inset-0 p-4 flex flex-col justify-end transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
        {/* Title and Rating */}
        <div className="space-y-3 text-white">
          <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-[#ffbade] transition-colors">
            {movie.title}
          </h3>
          
          <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            {/* Rating */}
            <div className="flex items-center space-x-1">
              <StarIcon className="w-4 h-4 text-[#ffbade]" />
              <span className="text-sm font-medium">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
            
            {/* Year */}
            <div className="flex items-center space-x-1">
              <ClockIcon className="w-4 h-4 text-[#ffbade]" />
              <span className="text-sm">
                {new Date(movie.release_date).getFullYear()}
              </span>
            </div>
          </div>
        </div>

        {/* Play Button Overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#ffbade]/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg className="w-6 h-6 text-[#201f31]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* Shine Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </div>
  );
};
