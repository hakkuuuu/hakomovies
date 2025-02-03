/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

const FeaturedMovies = ({ movies }) => {
  const topMovies = movies.slice(0, 5);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % topMovies.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [topMovies.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % topMovies.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + topMovies.length) % topMovies.length
    );
  };

  if (topMovies.length === 0) {
    return null;
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Slider container */}
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}vw)` }}
      >
        {topMovies.map((movie) => {
          const backdropUrl = movie.backdrop_path
            ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
            : 'https://via.placeholder.com/1280x720?text=No+Image';

          return (
            <div
              key={movie.id}
              className="w-screen h-[620px] relative flex-shrink-0"
            >
              {/* Backdrop image */}
              <img
                src={backdropUrl}
                alt={movie.title}
                className="absolute inset-0 w-full h-full object-cover opacity-65"
                style={{
                  maskImage:
                    'linear-gradient(to bottom, black 70%, transparent 100%)',
                  WebkitMaskImage:
                    'linear-gradient(to bottom, black 70%, transparent 100%)',
                }}
              />
              {/* Movie details */}
              <div className="absolute bottom-50 left-40 text-white w-full max-w-2xl">
                <div className="flex items-center">
                  <div className="w-2 h-16 bg-indigo-400 mr-4 z-10"></div>
                  <h3 className="text-6xl font-bold truncate">
                    {movie.title || 'Untitled'}
                  </h3>
                </div>
                <span className="flex flex-row gap-3 items-center text-lg my-3 font-bold">
                  <img src="star.svg" alt="star" />
                  {movie.vote_average}
                </span>
                <p className="mt-2 text-lg max-w-fit">
                  {movie.overview.length > 150
                    ? `${movie.overview.substring(0, 150)}...`
                    : movie.overview}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full hover:bg-gray-900 transition"
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
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full hover:bg-gray-900 transition"
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
