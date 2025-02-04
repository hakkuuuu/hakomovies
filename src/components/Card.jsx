/* eslint-disable react/prop-types */

import { formatDate } from '../utils/formatDate';

const Card = ({ movie }) => {
  // Destructure only the necessary properties from the movie object
  const { title, poster_path, release_date, vote_average } = movie;
  // Construct the full poster image URL (or use a fallback image)
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div className="relative group w-full my-6 rounded-xs overflow-hidden shadow-lg bg-gray-800">
      {/* Movie Poster */}
      <img
        src={posterUrl}
        alt={title}
        className="w-5xl h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      {/* Overlay that appears on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-lg  font-bold text-white">{title}</h3>
        <p className="text-sm text-gray-200">
          Released: {formatDate(release_date)}
        </p>
        <div className="flex flex-row gap-2 items-center text-lg">
          <img src="star.svg" alt="star" className="w-4" />
          <p className=" font-bold text-white pt-1 text-sm">
            {vote_average.toFixed(1)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
