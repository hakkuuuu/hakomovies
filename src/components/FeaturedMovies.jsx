/* eslint-disable react/prop-types */
import { useState } from 'react';

const FeaturedMovies = ({ movies }) => {
  // Select the top 5 movies from the provided movies array
  const topMovies = movies.slice(0, 5);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Navigation handlers
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % topMovies.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + topMovies.length) % topMovies.length
    );
  };

  // In case there are no movies yet
  if (topMovies.length === 0) {
    return null;
  }

  const currentMovie = topMovies[currentIndex];
  // Use the backdrop image if available, otherwise fall back to a placeholder
  const backdropUrl = currentMovie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`
    : 'https://via.placeholder.com/1280x720?text=No+Image';

  return (
    <div className="relative w-screen h-[560px]">
      {/* Backdrop image */}
      <img
        src={backdropUrl}
        alt={currentMovie.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/500 to-transparent"></div>

      {/* Movie details */}
      <div className="absolute bottom-20 left-40 text-white max-w-lg">
        <h3 className="text-4xl font-bold">{currentMovie.title}</h3>
        <p className="mt-2 text-lg">
          {currentMovie.overview.length > 150
            ? `${currentMovie.overview.substring(0, 150)}...`
            : currentMovie.overview}
        </p>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default FeaturedMovies;
