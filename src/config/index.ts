// API Configuration
export const TMDB_ACCESS_TOKEN = import.meta.env.VITE_TMDB_API_KEY;
export const BASE_URL = 'https://api.themoviedb.org/3';

// App Configuration
export const APP_NAME = 'HakoMovies';
export const DEFAULT_LANGUAGE = 'en-US';

// Image Configuration
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
export const POSTER_SIZES = {
  small: 'w200',
  medium: 'w500',
  large: 'original'
} as const;

// Route Configuration
export const ROUTES = {
  home: '/',
  movies: '/movies',
  popular: '/popular',
  tvSeries: '/tv'
} as const; 