import { useState } from 'react';
import { Movie } from '../../types';
import { IMAGE_BASE_URL, POSTER_SIZES } from '../../config';

interface TopTenProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

export const TopTen = ({ movies, onMovieClick }: TopTenProps) => {
  const [activeTab, setActiveTab] = useState<'Today' | 'Week' | 'Month'>('Today');
  const tabs: ('Today' | 'Week' | 'Month')[] = ['Today', 'Week', 'Month'];

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 sticky top-24 mt-14">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Top 10</h2>
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-[#ffbade] text-[#201f31]'
                  : 'text-white hover:bg-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {movies.slice(0, 10).map((movie, index) => (
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
        ))}
      </div>
    </div>
  );
}; 