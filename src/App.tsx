import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { SearchBar } from './features/search/SearchBar';
import { MovieRow } from './components/MovieRow';
import { TopTen } from './components/TopTen';
import { Nav } from './components/Nav';
import { TrendingMovies } from './features/movies/TrendingMovies';
import { MovieDetails } from './pages/MovieDetails';
import { useMovieStore } from './store/movieStore';
import { Movie } from './types';

// Home page component
const Home = () => {
  const navigate = useNavigate();
  const {
    trendingMovies,
    searchResults,
    searchMovies,
  } = useMovieStore();

  const handleSearch = async (query: string) => {
    await searchMovies(query);
  };

  const handleMovieClick = (movie: Movie) => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="pt-24">
      <header className="mb-8 px-4 sm:px-6 lg:px-8">
        <SearchBar onSearch={handleSearch} />
      </header>

      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {searchResults.length > 0 ? (
              <MovieRow
                title="Search Results"
                movies={searchResults}
                onMovieClick={handleMovieClick}
              />
            ) : (
              <TrendingMovies onMovieClick={handleMovieClick} />
            )}
          </div>

          {/* Top 10 Sidebar */}
          <aside className="hidden xl:block w-[400px]">
            <TopTen movies={trendingMovies} onMovieClick={handleMovieClick} />
          </aside>
        </div>
      </div>
    </div>
  );
};

// Placeholder components for other routes
const Movies = () => <div className="pt-24 px-4 sm:px-6 lg:px-8">Movies Page</div>;
const Popular = () => <div className="pt-24 px-4 sm:px-6 lg:px-8">Most Popular Page</div>;
const TvSeries = () => <div className="pt-24 px-4 sm:px-6 lg:px-8">TV Series Page</div>;

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#201f31] text-white">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/tv" element={<TvSeries />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
