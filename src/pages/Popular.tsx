import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Movie, Genre } from '../types';
import { fetchMovies, GENRE_LIST } from '../utils/api/tmdb';
import { MediaGrid } from '../components/layout/MediaGrid';

export const Popular = () => {
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
        setTotalPages(Math.min(response.total_pages, 500)); // TMDB API limit
      } catch (err) {
        setError('Failed to load popular movies. Please try again later.');
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

  return (
    <MediaGrid
      title="Popular Movies"
      items={movies}
      loading={loading}
      error={error}
      currentPage={currentPage}
      totalPages={totalPages}
      selectedGenre={selectedGenre}
      genres={GENRE_LIST}
      onItemClick={handleMovieClick}
      onGenreChange={handleGenreChange}
      onPageChange={handlePageChange}
    />
  );
}; 