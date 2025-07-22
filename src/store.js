import { create } from 'zustand';
import axios from 'axios';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

const useMovieStore = create((set) => ({
  movieList: [],
  topRatedList: [],
  isLoading: false,
  errorMessage: '',
  fetchMovies: async () => {
    set({ isLoading: true, errorMessage: '' });
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await axios.get(endpoint, API_OPTIONS);
      set({ movieList: response.data.results || [] });
    } catch (error) {
      set({ errorMessage: 'Error fetching movies' });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchTopRated: async () => {
    try {
      const endpoint = `${API_BASE_URL}/movie/top_rated`;
      const response = await axios.get(endpoint, API_OPTIONS);
      set({ topRatedList: response.data.results || [] });
    } catch (error) {
      set({ errorMessage: 'Error fetching top rated movies' });
    }
  },
}));

export default useMovieStore; 