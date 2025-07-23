import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Movie, Genre } from '../types';
import { fetchMovies, GENRE_LIST } from '../utils/api';
import { Card } from '../components/Card';

export const Movies = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState<Genre | undefined>(undefined);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchMovies(currentPage, selectedGenre);
        setMovies(response.results);
        setTotalPages(response.total_pages);
      } catch (err) {
        setError('Failed to load movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [currentPage, selectedGenre]);

  const handleMovieClick = (movie: Movie) => {
    navigate(`/movie/${movie.id}`);
  };

  const handleGenreChange = (genre: Genre | undefined) => {
    setSelectedGenre(genre);
    setCurrentPage(1); // Reset to first page when changing genre
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-center">
          <p className="text-xl mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#ffbade] text-[#201f31] rounded-lg hover:bg-[#ffbade]/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Genre Filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => handleGenreChange(undefined)}
          className={`px-4 py-2 rounded-lg transition-all duration-300 ${
            !selectedGenre
              ? 'bg-[#ffbade] text-[#201f31]'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          All Movies
        </button>
        {GENRE_LIST.map((genre) => (
          <button
            key={genre.name}
            onClick={() => handleGenreChange(genre)}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              selectedGenre?.name === genre.name
                ? 'bg-[#ffbade] text-[#201f31]'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {/* Movies Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="aspect-[2/3] rounded-lg bg-white/5 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.map((movie) => (
              <Card key={movie.id} movie={movie} onClick={handleMovieClick} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                currentPage === 1
                  ? 'bg-white/5 text-white/50 cursor-not-allowed'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Previous
            </button>
            <span className="px-4 py-2 text-white">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                currentPage === totalPages
                  ? 'bg-white/5 text-white/50 cursor-not-allowed'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}; 