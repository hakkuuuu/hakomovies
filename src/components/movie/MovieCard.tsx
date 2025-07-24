import { MovieCardProps } from '../../types';
import { ClockIcon, StarIcon } from '@heroicons/react/24/solid';
import { IMAGE_BASE_URL, POSTER_SIZES } from '../../config';

export const Card = ({ movie, onClick }: MovieCardProps) => {
  const imageUrl = `${IMAGE_BASE_URL}/${POSTER_SIZES.medium}${movie.poster_path}`;
  const duration = Math.floor((movie.runtime ?? 85) / 60);
  const rating = movie.vote_average?.toFixed(1);
  
  return (
    <div
      onClick={() => onClick(movie)}
      className="group relative aspect-[3/4] cursor-pointer rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#ffbade]/20"
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
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-100 transition-all duration-300 group-hover:from-black/95 group-hover:via-black/75">
        <div className="p-4 space-y-3 transform transition-all duration-300">
          {/* Rating */}
          {rating && (
            <div className="flex items-center space-x-1 text-[#ffbade]">
              <StarIcon className="w-5 h-5" />
              <span className="font-semibold">{rating}</span>
            </div>
          )}
          
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

          {/* Release Date and Overview (Only visible on hover) */}
          <div className="overflow-hidden transition-all duration-300 max-h-0 group-hover:max-h-24">
            {movie.release_date && (
              <div className="text-sm text-white/70 mb-2">
                Released: {new Date(movie.release_date).getFullYear()}
              </div>
            )}
            {movie.overview && (
              <p className="text-sm text-white/90 line-clamp-2">
                {movie.overview}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
