/* eslint-disable react/prop-types */

import { formatDate } from '../utils/formatDate';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { useState } from 'react';

const Card = ({ movie }) => {
  const { title, poster_path, release_date, vote_average } = movie;
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';
  const [fav, setFav] = useState(false);

  return (
    <div className="relative group w-full rounded-xl overflow-hidden shadow-lg bg-gray-800 transition-transform duration-300 hover:scale-105 hover:shadow-2xl flex flex-col">
      {/* Favorite Button */}
      <button
        className="absolute top-2 right-2 z-10 p-1 rounded-full bg-black/60 hover:bg-red-500/80 transition-colors"
        aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
        onClick={() => setFav(f => !f)}
        type="button"
      >
        {fav ? (
          <MdFavorite className="w-6 h-6 text-red-400 drop-shadow" />
        ) : (
          <MdFavoriteBorder className="w-6 h-6 text-white drop-shadow" />
        )}
      </button>
      {/* Movie Poster */}
      <img
        src={posterUrl}
        alt={title}
        className="w-full aspect-[2/3] object-cover"
      />
      {/* Overlay that appears on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-lg font-bold text-white truncate" title={title}>{title}</h3>
        <p className="text-sm text-gray-200 truncate">
          Released: {formatDate(release_date)}
        </p>
        <div className="flex flex-row gap-2 items-center text-lg">
          <img src="star.svg" alt="star" className="w-4" />
          <p className="font-bold text-white pt-1 text-sm">
            {vote_average.toFixed(1)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
