import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Movie, Genre } from '../types';
import { fetchTvSeries, TV_GENRE_LIST } from '../utils/api/tmdb';
import { MediaGrid } from '../components/layout/MediaGrid';

export const TvSeries = () => {
  const navigate = useNavigate();
  const [series, setSeries] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState<Genre | undefined>(undefined);

  useEffect(() => {
    const loadSeries = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchTvSeries(currentPage, selectedGenre);
        setSeries(response.results);
        setTotalPages(Math.min(response.total_pages, 500)); // TMDB API limit
      } catch (err) {
        setError('Failed to load TV series. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadSeries();
  }, [currentPage, selectedGenre]);

  const handleSeriesClick = (tv: Movie) => {
    navigate(`/tv/${tv.id}`);
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
      title="TV Series"
      items={series}
      loading={loading}
      error={error}
      currentPage={currentPage}
      totalPages={totalPages}
      selectedGenre={selectedGenre}
      genres={TV_GENRE_LIST}
      onItemClick={handleSeriesClick}
      onGenreChange={handleGenreChange}
      onPageChange={handlePageChange}
    />
  );
}; 