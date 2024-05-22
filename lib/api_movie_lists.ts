import type { DiscoverMoviesParams, MovieListResponse } from './api.types';

type MoviesApiOptions = {
  type: 'now_playing' | 'popular' | 'top_rated' | 'upcoming';
  language?: string;
  page?: number;
  region?: string;
};

export const getMovies = async (options: MoviesApiOptions) => {
  options.language = options.language || 'en-US';
  options.page = options.page || 1;
  options.region = options.region || 'US';

  const reqOptions: RequestInit = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_ACCESS_AUTH_TOKEN}` || '',
    },
    next: { revalidate: 60 * 60 * 24 },
  };

  try {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(options)) {
      if (value !== undefined) {
        searchParams.set(key, value.toString());
      }
    }
    const res = await fetch(`https://api.themoviedb.org/3/movie/${options.type}?${searchParams.toString()}`, reqOptions);
    return (await res.json()) as MovieListResponse | undefined;
  } catch (error) {
    if (error instanceof Error) {
      //(EvalError || RangeError || ReferenceError || SyntaxError || TypeError || URIError)
      console.error(`${error.name} - ${error.message}`);
      console.error(error.stack);
    }
  }
};

export const discoverMovies = async (options?: DiscoverMoviesParams) => {
  options = options || {};
  options.include_adult = options.include_adult || false;
  options.include_video = options.include_video || false;
  options.language = options.language || 'en-US';
  options.page = options.page || 1;
  options.region = options.region || 'US';
  options.sort_by = options.sort_by || 'popularity.desc';

  const reqOptions: RequestInit = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_ACCESS_AUTH_TOKEN}` || '',
    },
    next: { revalidate: 60 * 60 * 24 },
  };

  try {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(options)) {
      if (value !== undefined) {
        searchParams.set(key, value.toString());
      }
    }
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?${searchParams.toString()}`, reqOptions);
    return (await res.json()) as MovieListResponse | undefined;
  } catch (error) {
    if (error instanceof Error) {
      //(EvalError || RangeError || ReferenceError || SyntaxError || TypeError || URIError)
      console.error(`${error.name} - ${error.message}`);
      console.error(error.stack);
    }
  }
};
