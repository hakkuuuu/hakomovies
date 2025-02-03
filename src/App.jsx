import { useEffect, useState } from 'react';
import Search from './components/Search';
import Spinner from './components/Spinner';
import Card from './components/Card';
import FeaturedMovies from './components/FeaturedMovies';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isScroll, setIsScroll] = useState(null);

  const fetchMovies = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      if (data.Response === false) {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <main className="min-h-screen bg-gray-900">
      <div className="wrapper -mt-10" id="home">
        <nav
          className={`w-full h-14 fixed px-5 lg:px-8 xl:px-[8%] py-3 flex items-center justify-between z-50 text-white bg-opacity-50 backdrop-blur-lg ${
            isScroll ? 'bg-opacity-30 backdrop-blur-lg shadow-sm' : ''
          }`}
        >
          <a
            href="#home"
            className="flex flex-row items-center justify-center gap-3"
          >
            <img src="logo.svg" alt="logo" />
            <span>Hakomovies</span>
          </a>
          <ul className="hidden md:flex text-2sm items-center gap-6 lg:gap-8 rounded-full px-12 py-3">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#movies">All Movies</a>
            </li>
            <li>
              <a href="#top">Top IMDB</a>
            </li>
          </ul>
        </nav>

        {/* Featured Movies Container */}
        <FeaturedMovies movies={movieList} />

        {/* Search Bar */}
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <section className="all-movies mt-8" id="movies">
          <h2 className="text-2xl text-white mb-4">All Movies</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {movieList.map((movie) => (
                <Card key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
