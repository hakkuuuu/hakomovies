import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SearchBar } from './features/search/SearchBar';
import { MovieRow } from './components/MovieRow';
import { MovieModal } from './components/MovieModal';
import { TopTen } from './components/TopTen';
import { Nav } from './components/Nav';
import { useMovieStore } from './features/movies/movieStore';
import { Movie } from './types';

// Home page component
const Home = () => {
  const {
    trendingMovies,
    searchResults,
    selectedMovie,
    isLoading,
    error,
    fetchTrendingMovies,
    searchMovies,
    fetchMovieDetails,
  } = useMovieStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTrendingMovies();
  }, [fetchTrendingMovies]);

  const handleSearch = async (query: string) => {
    await searchMovies(query);
  };

  const handleMovieClick = async (movie: Movie) => {
    await fetchMovieDetails(movie.id);
    setIsModalOpen(true);
  };

  return (
    <div className="pt-24">
      <header className="mb-8 px-4 sm:px-6 lg:px-8">
        <SearchBar onSearch={handleSearch} />
      </header>

      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Main Content */}
          <main className="flex-1">
            {error && (
              <div className="text-red-500 text-center mb-8">{error}</div>
            )}

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ffbade]"></div>
              </div>
            ) : (
              <>
                {searchResults.length > 0 ? (
                  <MovieRow
                    title="Search Results"
                    movies={searchResults}
                    onMovieClick={handleMovieClick}
                  />
                ) : (
                  <MovieRow
                    title="Trending Movies"
                    movies={trendingMovies}
                    onMovieClick={handleMovieClick}
                  />
                )}
              </>
            )}
          </main>

          {/* Top 10 Sidebar */}
          <aside className="hidden xl:block w-[400px]">
            <TopTen movies={trendingMovies} onMovieClick={handleMovieClick} />
          </aside>
        </div>
      </div>

      {selectedMovie && isModalOpen && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setIsModalOpen(false)}
        />
      )}
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
