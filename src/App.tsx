import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { SearchBar } from './features/SearchBar';
import { MovieRow } from './components/movie/MovieRow';
import { TopTen } from './components/movie/TopTen';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { TrendingMovies } from './features/TrendingMovies';
import { MovieDetails } from './pages/MovieDetails';
import { Movies } from './pages/Movies';
import { Popular } from './pages/Popular';
import { TvSeries } from './pages/TvSeries';
import { useMovieStore } from './store/movieStore';
import { Movie } from './types';

// Home page component
const Home = () => {
  const navigate = useNavigate();
  const [hasSearched, setHasSearched] = useState(false);
  const {
    trendingMovies,
    searchResults,
    searchMovies,
  } = useMovieStore();

  const handleSearch = async (query: string) => {
    setHasSearched(true);
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
            {hasSearched && searchResults.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <span className="text-6xl mb-4">😢</span>
                <h3 className="text-2xl font-semibold text-white mb-2">No Results Found</h3>
                <p className="text-gray-400 mb-8">Try adjusting your search terms or explore our trending movies below</p>
                <TrendingMovies onMovieClick={handleMovieClick} />
              </div>
            ) : searchResults.length > 0 ? (
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

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#201f31] text-white flex flex-col">
        <Nav />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/tv" element={<TvSeries />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
