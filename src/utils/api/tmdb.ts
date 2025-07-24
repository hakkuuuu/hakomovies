import { Movie, Genre, TimeWindow } from '../../types';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
} as const;

export const GENRE_LIST: Genre[] = [
  { name: 'Action', id: 28 },
  { name: 'Comedy', id: 35 },
  { name: 'Drama', id: 18 },
  { name: 'Horror', id: 27 },
  { name: 'Romance', id: 10749 },
  { name: 'Animation', id: 16 },
  { name: 'Sci-Fi', id: 878 },
  { name: 'Documentary', id: 99 },
];

export const TV_GENRE_LIST: Genre[] = [
  { name: 'Action & Adventure', id: 10759 },
  { name: 'Animation', id: 16 },
  { name: 'Comedy', id: 35 },
  { name: 'Crime', id: 80 },
  { name: 'Documentary', id: 99 },
  { name: 'Drama', id: 18 },
  { name: 'Family', id: 10751 },
  { name: 'Kids', id: 10762 },
  { name: 'Mystery', id: 9648 },
  { name: 'Reality', id: 10764 },
  { name: 'Sci-Fi & Fantasy', id: 10765 },
  { name: 'Soap', id: 10766 },
  { name: 'Talk', id: 10767 },
  { name: 'War & Politics', id: 10768 },
  { name: 'Western', id: 37 },
];

interface APIResponse {
  results: Movie[];
  total_pages: number;
}

export const fetchMovies = async (page: number = 1, genre?: Genre): Promise<APIResponse> => {
  const genreParam = genre?.id ? `&with_genres=${genre.id}` : '';
  const response = await fetch(
    `${API_BASE_URL}/movie/popular?page=${page}${genreParam}`,
    API_OPTIONS
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }
  
  return response.json();
};

export const fetchTvSeries = async (page: number = 1, genre?: Genre): Promise<APIResponse> => {
  const genreParam = genre?.id ? `&with_genres=${genre.id}` : '';
  const response = await fetch(
    `${API_BASE_URL}/tv/popular?page=${page}${genreParam}`,
    API_OPTIONS
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch TV series');
  }
  
  const data = await response.json();
  return {
    ...data,
    results: data.results.map((show: any) => ({
      ...show,
      title: show.name,
      release_date: show.first_air_date,
      media_type: 'tv'
    }))
  };
};

export const fetchTrendingMovies = async (timeWindow: TimeWindow = 'day'): Promise<Movie[]> => {
  if (timeWindow === 'month') {
    // For monthly trending, we'll use the discover endpoint with popularity sorting
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const fromDate = thirtyDaysAgo.toISOString().split('T')[0];
    const toDate = new Date().toISOString().split('T')[0];

    const response = await fetch(
      `${API_BASE_URL}/discover/movie?` +
      `primary_release_date.gte=${fromDate}&` +
      `primary_release_date.lte=${toDate}&` +
      'sort_by=popularity.desc&' +
      'vote_count.gte=50',
      API_OPTIONS
    );

    if (!response.ok) {
      throw new Error('Failed to fetch monthly trending movies');
    }

    const data = await response.json();
    return data.results;
  }

  // For day and week, use the trending endpoint
  const response = await fetch(
    `${API_BASE_URL}/trending/movie/${timeWindow}`,
    API_OPTIONS
  );

  if (!response.ok) {
    throw new Error('Failed to fetch trending movies');
  }

  const data = await response.json();
  return data.results;
};

declare global {
  interface ImportMeta {
    env: {
      VITE_TMDB_API_KEY: string;
      [key: string]: string;
    };
  }
} 