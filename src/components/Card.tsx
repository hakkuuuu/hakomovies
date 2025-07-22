import { MovieCardProps } from '../types';
import { ClockIcon } from '@heroicons/react/24/solid';
import { IMAGE_BASE_URL, POSTER_SIZES } from '../config';

export const Card = ({ movie, onClick }: MovieCardProps) => {
  const imageUrl = `${IMAGE_BASE_URL}/${POSTER_SIZES.medium}${movie.poster_path}`;
  const duration = Math.floor(movie.runtime / 60) || 85; // Default duration if not provided
  
  return (
    <div
      onClick={() => onClick(movie)}
      className="group relative aspect-[3/4] cursor-pointer"
    >
      {/* Age Rating Badge (if adult content) */}
      {movie.adult && (
        <div className="absolute top-2 right-2 z-10 bg-[#ff4757] text-white text-sm font-bold px-2 py-0.5 rounded">
          18+
        </div>
      )}

      {/* Movie Poster */}
      <img
        src={imageUrl}
        alt={movie.title}
        className="w-full h-full object-cover rounded-lg"
        loading="lazy"
      />

      {/* Content Overlay */}
      <div className="absolute inset-0 p-4 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/50 to-transparent rounded-lg">
        <div className="space-y-2">
          {/* Title */}
          <h3 className="text-lg font-semibold line-clamp-2 text-white group-hover:text-[#ffbade] transition-colors">
            {movie.title}
          </h3>
          
          {/* Info Row */}
          <div className="flex items-center space-x-3 text-sm text-white/80">
            <span>Movie</span>
            <span>•</span>
            <div className="flex items-center">
              <ClockIcon className="w-4 h-4 mr-1" />
              <span>{duration}m</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
