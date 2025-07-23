import { create } from 'zustand';
import axios from 'axios';
import { Movie, MovieDetails } from '../types';
import { TMDB_ACCESS_TOKEN, BASE_URL } from '../config';

// Create axios instance with default config
const tmdbApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
    'Content-Type': 'application/json'
  }
});

interface MovieStore {
  trendingMovies: Movie[];
  searchResults: Movie[];
  selectedMovie: MovieDetails | null;
  isLoading: boolean;
  error: string | null;
  fetchTrendingMovies: () => Promise<void>;
  searchMovies: (query: string) => Promise<void>;
  fetchMovieDetails: (movieId: number) => Promise<void>;
}

export const useMovieStore = create<MovieStore>((set) => ({
  trendingMovies: [],
  searchResults: [],
  selectedMovie: null,
  isLoading: false,
  error: null,

  fetchTrendingMovies: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await tmdbApi.get('/trending/movie/week');
      set({ trendingMovies: response.data.results, isLoading: false });
    } catch (error) {
      console.error('API Error:', error);
      set({ error: 'Failed to fetch trending movies', isLoading: false });
    }
  },

  searchMovies: async (query: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await tmdbApi.get('/search/movie', {
        params: { query: encodeURIComponent(query) }
      });
      set({ searchResults: response.data.results, isLoading: false });
    } catch (error) {
      console.error('API Error:', error);
      set({ error: 'Failed to search movies', isLoading: false });
    }
  },

  fetchMovieDetails: async (movieId: number) => {
    set({ isLoading: true, error: null });
    try {
      const [detailsResponse, videosResponse] = await Promise.all([
        tmdbApi.get(`/movie/${movieId}`),
        tmdbApi.get(`/movie/${movieId}/videos`)
      ]);
      
      const movieDetails = {
        ...detailsResponse.data,
        videos: videosResponse.data.results,
      };
      
      set({ selectedMovie: movieDetails, isLoading: false });
    } catch (error) {
      console.error('API Error:', error);
      set({ error: 'Failed to fetch movie details', isLoading: false });
    }
  },
})); 