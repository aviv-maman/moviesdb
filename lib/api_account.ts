'use server';
import type { GeneralPostRes, MovieListResponse, SeriesListResponse } from './api.types';

const reqOptionsGet: RequestInit = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TMDB_ACCESS_AUTH_TOKEN}` || '',
  },
};

const reqOptionsPost: RequestInit = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    Authorization: `Bearer ${process.env.TMDB_ACCESS_AUTH_TOKEN}` || '',
  },
};

type toggleFavOptions = {
  account_id: number;
  session_id: string;
  media_type: 'movie' | 'tv';
  media_id: number;
  favorite: boolean;
};

export const toggleFavorite = async (options: toggleFavOptions) => {
  'use server';
  const { account_id, session_id, media_type, media_id, favorite } = options;
  const reqOptions: RequestInit = { ...reqOptionsPost, body: JSON.stringify({ media_type, media_id, favorite }) };

  try {
    const res = await fetch(`https://api.themoviedb.org/3/account/${account_id}/favorite?session_id=${session_id}`, reqOptions);
    return (await res.json()) as GeneralPostRes;
  } catch (error) {
    if (error instanceof Error) {
      //(EvalError || RangeError || ReferenceError || SyntaxError || TypeError || URIError)
      console.error(`${error.name} - ${error.message}`);
      console.error(error.stack);
    }
    throw error;
  }
};

type getFavOptions = {
  account_id: number;
  session_id: string;
  media_type: 'movies' | 'tv';
  language?: string;
  page?: number;
  sort_by?: 'created_at.asc' | 'created_at.desc';
};

const getFavorites = async (options: getFavOptions) => {
  'use server';
  options.language = options.language || 'en-US';
  options.page = options.page || 1;
  options.sort_by = options.sort_by || 'created_at.asc';
  const { account_id, session_id, media_type, language, page, sort_by } = options;

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/account/${account_id}/favorite/${media_type}?language=${language}&page=${page}&session_id=${session_id}&sort_by=${sort_by}`,
      reqOptionsGet
    );
    const data = await res.json();
    return media_type === 'movies' ? (data as MovieListResponse) : (data as SeriesListResponse);
  } catch (error) {
    if (error instanceof Error) {
      //(EvalError || RangeError || ReferenceError || SyntaxError || TypeError || URIError)
      console.error(`${error.name} - ${error.message}`);
      console.error(error.stack);
    }
    throw error;
  }
};
