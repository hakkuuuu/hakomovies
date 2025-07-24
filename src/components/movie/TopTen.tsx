import { useState, useEffect } from 'react';
import { Movie, TimeWindow } from '../../types';
import { IMAGE_BASE_URL, POSTER_SIZES } from '../../config';
import { fetchTrendingMovies } from '../../utils/api/tmdb';

interface TopTenProps {
  onMovieClick: (movie: Movie) => void;
}

export const TopTen = ({ onMovieClick }: TopTenProps) => {
  const [activeTab, setActiveTab] = useState<TimeWindow>('day');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const tabs: { id: TimeWindow; label: string }[] = [
    { id: 'day', label: 'Today' },
    { id: 'week', label: 'Week' },
    { id: 'month', label: 'Month' }
  ];

  useEffect(() => {
    const loadTrendingMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchTrendingMovies(activeTab);
        setMovies(data);
      } catch (err) {
        setError('Failed to load trending movies');
      } finally {
        setLoading(false);
      }
    };

    loadTrendingMovies();
  }, [activeTab]);

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 sticky top-24 mt-14">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Top 10</h2>
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#ffbade] text-[#201f31]'
                  : 'text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          // Loading skeleton
          [...Array(10)].map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-2 animate-pulse"
            >
              <div className="text-3xl font-bold text-white/10 w-12">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div className="w-16 h-24 bg-white/5 rounded-lg" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-white/5 rounded w-3/4" />
                <div className="h-3 bg-white/5 rounded w-1/2" />
              </div>
            </div>
          ))
        ) : error ? (
          <div className="text-center py-4 text-white/60">{error}</div>
        ) : (
          movies.slice(0, 10).map((movie, index) => (
            <div
              key={movie.id}
              onClick={() => onMovieClick(movie)}
              className="flex items-center gap-4 p-2 rounded-lg hover:bg-white/5 cursor-pointer group transition-colors"
            >
              <span className="text-3xl font-bold text-white/30 w-12">
                {String(index + 1).padStart(2, '0')}
              </span>
              <img
                src={`${IMAGE_BASE_URL}/${POSTER_SIZES.small}${movie.poster_path}`}
                alt={movie.title}
                className="w-16 h-24 object-cover rounded-lg"
                loading="lazy"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium truncate group-hover:text-[#ffbade] transition-colors">
                  {movie.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-white/60">
                    {new Date(movie.release_date).getFullYear()}
                  </span>
                  <span className="text-sm text-white/60">•</span>
                  <span className="text-sm text-white/60">
                    {movie.vote_average.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}; 