import type { PersonListResponse } from './api.types';

type PeopleApiOptions = {
  type: 'popular';
  language?: string;
  page?: number;
};

export const getPeople = async (options: PeopleApiOptions) => {
  options.language = options.language || 'en-US';
  options.page = options.page || 1;

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
    const res = await fetch(
      `https://api.themoviedb.org/3/person/${options.type}?${searchParams.toString()}`,
      reqOptions,
    );
    return (await res.json()) as PersonListResponse;
  } catch (error) {
    if (error instanceof Error) {
      //(EvalError || RangeError || ReferenceError || SyntaxError || TypeError || URIError)
      console.error(`${error.name} - ${error.message}`);
      console.error(error.stack);
    }
  }
};
