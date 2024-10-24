import type { TrendingResponse } from './api.types';

type TrendingApiOptions = {
  type: 'all' | 'movie' | 'tv' | 'person';
  time_window?: 'day' | 'week';
  language?: string;
};

export const getTrendingItems = async (options: TrendingApiOptions) => {
  options.time_window = options.time_window || 'week';
  options.language = options.language || 'en-US';
  const { type, time_window, language } = options;

  const reqOptions: RequestInit = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_ACCESS_AUTH_TOKEN}` || '',
    },
    next: { revalidate: 60 * 60 * 24 },
  };

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/${type}/${time_window}?language=${language}`,
      reqOptions,
    );
    return (await res.json()) as TrendingResponse | undefined;
  } catch (error) {
    if (error instanceof Error) {
      //(EvalError || RangeError || ReferenceError || SyntaxError || TypeError || URIError)
      console.error(`${error.name} - ${error.message}`);
      console.error(error.stack);
    }
  }
};
