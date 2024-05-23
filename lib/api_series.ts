import { produce } from 'immer';
import type { GetSeriesResponse } from './api.types';

type GetMovieOptions = {
  series_id: number;
  language?: string;
  append_to_response?: string;
};

export const getSeriesById = async (options: GetMovieOptions) => {
  const reqOptions: RequestInit = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_ACCESS_AUTH_TOKEN}` || '',
    },
    next: { revalidate: 60 * 60 * 24 },
  };
  const id = options.series_id;
  const queryParamsObj = produce({ ...options, series_id: undefined }, (draft) => {
    delete draft['series_id'];
  });

  try {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(queryParamsObj)) {
      if (value !== undefined) {
        searchParams.set(key, value.toString());
      }
    }
    const res = await fetch(`https://api.themoviedb.org/3/tv/${id}?${searchParams.toString()}`, reqOptions);
    return { series: (await res.json()) as GetSeriesResponse, error: null };
  } catch (error) {
    if (error instanceof Error) {
      //(EvalError || RangeError || ReferenceError || SyntaxError || TypeError || URIError)
      console.error(`${error.name} - ${error.message}`);
      console.error(error.stack);
    }
    return { series: null, error: error as Error };
  }
};
