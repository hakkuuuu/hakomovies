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

declare global {
  interface ImportMeta {
    env: {
      VITE_TMDB_API_KEY: string;
      [key: string]: string;
    };
  }
} 