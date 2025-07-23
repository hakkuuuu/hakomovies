import { Movie, Genre } from '../types';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const GENRE_LIST: Genre[] = [
  { name: 'Trending', endpoint: '/trending/movie/week' },
  { name: 'Action', id: 28 },
  { name: 'Comedy', id: 35 },
  { name: 'Drama', id: 18 },
  { name: 'Horror', id: 27 },
  { name: 'Romance', id: 10749 },
  { name: 'Animation', id: 16 },
  { name: 'Sci-Fi', id: 878 },
  { name: 'Documentary', id: 99 },
];

export interface MoviesResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
  page: number;
}

export const fetchMoviesByGenre = async (genre: Genre): Promise<Movie[]> => {
  let endpoint = '';
  if (genre.endpoint) {
    endpoint = `${API_BASE_URL}${genre.endpoint}`;
  } else {
    endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&with_genres=${genre.id}`;
  }
  const response = await fetch(endpoint, API_OPTIONS);
  if (!response.ok) return [];
  const data = await response.json();
  return data.results || [];
};

export const fetchMovies = async (page: number = 1, genre?: Genre): Promise<MoviesResponse> => {
  let endpoint = '';
  if (genre?.endpoint) {
    endpoint = `${API_BASE_URL}${genre.endpoint}?page=${page}`;
  } else if (genre?.id) {
    endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&with_genres=${genre.id}&page=${page}`;
  } else {
    endpoint = `${API_BASE_URL}/movie/popular?page=${page}`;
  }
  
  const response = await fetch(endpoint, API_OPTIONS);
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }
  const data = await response.json();
  return {
    results: data.results || [],
    total_pages: data.total_pages || 0,
    total_results: data.total_results || 0,
    page: data.page || 1
  };
};

declare global {
  interface ImportMeta {
    env: {
      VITE_TMDB_API_KEY: string;
      [key: string]: string;
    };
  }
} 