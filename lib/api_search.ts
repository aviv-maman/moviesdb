'use server';

import type {
  TrendingAllListResponse,
  TrendingMovieListResponse,
  TrendingPersonListResponse,
  TrendingSeriesListResponse,
} from './api.types';

const reqOptionsGet: RequestInit = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: process.env.TMDB_ACCESS_AUTH_TOKEN ? `Bearer ${process.env.TMDB_ACCESS_AUTH_TOKEN}` : '',
  },
  next: { revalidate: 60 * 10 },
};

type MultiOptions = {
  media_type: 'multi';
  query?: string;
  include_adult?: boolean;
  language?: string;
  page?: number;
};

type MovieOptions = {
  media_type: 'movie';
  query?: string;
  include_adult?: boolean;
  language?: string;
  primary_release_year?: number;
  page?: number;
  region?: string;
  year?: number;
};

type TvOptions = {
  media_type: 'tv';
  query?: string;
  first_air_date_year?: number;
  include_adult?: boolean;
  language?: string;
  page?: number;
  year?: number;
};

type PersonOptions = {
  media_type: 'person';
  query?: string;
  include_adult?: boolean;
  language?: string;
  page?: number;
};

export type FilterOptions = MultiOptions | MovieOptions | TvOptions | PersonOptions;

export const filterSearch = async (options: FilterOptions) => {
  'use server';
  options.language = options.language || 'en-US';
  options.page = options.page || 1;
  const url = { baseUrl: `https://api.themoviedb.org/3/search/${options.media_type}?`, searchParams: '', fullPath: '' };
  for (const [key, value] of Object.entries(options)) {
    if (key === 'media_type') continue;
    url.searchParams += `${key}=${value}&`;
  }
  url.fullPath = url.baseUrl + url.searchParams;
  url.fullPath = url.fullPath.slice(0, -1);
  try {
    const res = await fetch(url.fullPath, reqOptionsGet);
    const data = await res.json();
    return options.media_type === 'multi'
      ? (data as TrendingAllListResponse)
      : options.media_type === 'movie'
        ? (data as TrendingMovieListResponse)
        : options.media_type === 'tv'
          ? (data as TrendingSeriesListResponse)
          : options.media_type === 'person'
            ? (data as TrendingPersonListResponse)
            : null;
  } catch (error) {
    if (error instanceof Error) {
      //(EvalError || RangeError || ReferenceError || SyntaxError || TypeError || URIError)
      console.error(`${error.name} - ${error.message}`);
      console.error(error.stack);
    }
    // throw error;
  }
};
