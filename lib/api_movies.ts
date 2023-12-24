import { produce } from 'immer';
import MovieExample from '@/lib/data/movie-details.json';
import { GetMovieResponse } from './api.types';

type GetMovieOptions = {
  movie_id: number;
  language?: string;
  append_to_response?: string;
};

export const getMovieById = async (options: GetMovieOptions) => {
  const reqOptions: RequestInit = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_ACCESS_AUTH_TOKEN}` || '',
    },
    next: { revalidate: 60 * 60 * 24 },
  };
  const id = options.movie_id;
  const queryParamsObj = produce({ ...options, movie_id: undefined }, (draft) => {
    delete draft['movie_id'];
  });

  try {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(queryParamsObj)) {
      if (value !== undefined) {
        searchParams.set(key, value.toString());
      }
    }
    // const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?${searchParams.toString()}`, reqOptions);
    // return await res.json();
    return { movie: MovieExample as GetMovieResponse, error: null };
  } catch (error) {
    if (error instanceof Error) {
      //(EvalError || RangeError || ReferenceError || SyntaxError || TypeError || URIError)
      console.error(`${error.name} - ${error.message}`);
      console.error(error.stack);
    }
    return { movie: null, error: error as Error };
  }
};
