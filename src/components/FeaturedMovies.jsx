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
              className="w-screen h-[400px] md:h-[620px] relative flex-shrink-0"
            >
              {/* Backdrop image with bottom fade */}
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
              <div className="absolute bottom-4 md:bottom-50 left-4 md:left-40 text-white w-full max-w-2xl">
                <div className="flex items-center">
                  {/* Vertical line */}
                  <div className="w-2 h-12 md:h-16 bg-indigo-400 mr-2 md:mr-4 z-10"></div>
                  <h3 className="text-2xl md:text-6xl font-bold truncate">
                    {movie.title || 'Untitled'}
                  </h3>
                </div>
                <div className="flex flex-row gap-2 items-center text-sm md:text-lg my-2">
                  <img src="star.svg" alt="star" className="w-4 md:w-6" />
                  <p className="font-bold text-white pt-1">
                    {movie.vote_average.toFixed(1)}
                  </p>
                </div>
                <p className="mt-2 text-xs md:text-lg max-w-fit">
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
        className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full hover:bg-gray-900 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 md:h-6 w-4 md:w-6 text-white"
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
        className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full hover:bg-gray-900 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 md:h-6 w-4 md:w-6 text-white"
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
