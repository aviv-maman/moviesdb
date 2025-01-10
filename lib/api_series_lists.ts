import type { DiscoverSeriesParams, SeriesListResponse } from './api.types';

type SeriesApiOptions = {
  type: 'airing_today' | 'on_the_air' | 'popular' | 'top_rated';
  language?: string;
  page?: number;
};

export const getSeries = async (options: SeriesApiOptions) => {
  options.language = options.language || 'en-US';
  options.page = options.page || 1;

  const reqOptions: RequestInit = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.TMDB_ACCESS_AUTH_TOKEN ? `Bearer ${process.env.TMDB_ACCESS_AUTH_TOKEN}` : '',
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
    const res = await fetch(`https://api.themoviedb.org/3/tv/${options.type}?${searchParams.toString()}`, reqOptions);
    return (await res.json()) as SeriesListResponse | undefined;
  } catch (error) {
    if (error instanceof Error) {
      //(EvalError || RangeError || ReferenceError || SyntaxError || TypeError || URIError)
      console.error(`${error.name} - ${error.message}`);
      console.error(error.stack);
    }
  }
};

export const discoverSeries = async (options?: DiscoverSeriesParams) => {
  options = options || {};
  options.include_adult = options.include_adult || false;
  options.include_null_first_air_dates = options.include_null_first_air_dates || false;
  options.language = options.language || 'en-US';
  options.page = options.page || 1;
  options.sort_by = options.sort_by || 'popularity.desc';

  const reqOptions: RequestInit = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.TMDB_ACCESS_AUTH_TOKEN ? `Bearer ${process.env.TMDB_ACCESS_AUTH_TOKEN}` : '',
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
    const res = await fetch(`https://api.themoviedb.org/3/discover/tv?${searchParams.toString()}`, reqOptions);
    return (await res.json()) as SeriesListResponse | undefined;
  } catch (error) {
    if (error instanceof Error) {
      //(EvalError || RangeError || ReferenceError || SyntaxError || TypeError || URIError)
      console.error(`${error.name} - ${error.message}`);
      console.error(error.stack);
    }
  }
};
