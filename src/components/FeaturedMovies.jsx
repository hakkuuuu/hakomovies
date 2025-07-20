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
    <div className="relative w-full min-h-[50vw] h-[400px] md:h-[620px] overflow-hidden flex items-center justify-center">
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
              className="w-screen min-h-[50vw] h-[400px] md:h-[620px] relative flex-shrink-0 flex items-center justify-center"
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
              {/* Movie details centered */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-2xl bg-black/60 rounded-lg p-4 md:p-8 text-white flex flex-col items-start">
                <div className="flex items-center mb-2">
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
        aria-label="Previous slide"
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
        aria-label="Next slide"
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
      {/* Slide indicators */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {topMovies.map((_, idx) => (
          <span
            key={idx}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'bg-light-200 scale-125' : 'bg-gray-500 opacity-60'
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default FeaturedMovies;
