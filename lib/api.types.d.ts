type ListItem = {
  backdrop_path?: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  poster_path: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
};

type MovieItem = ListItem & {
  adult: boolean;
  title: string;
  original_title: string;
  release_date: string;
  video: boolean;
  isFavorite?: boolean;
};

type SeriesItem = ListItem & {
  name: string;
  original_name: string;
  first_air_date: string;
  origin_country: string[];
  isFavorite?: boolean;
};

type PersonItem = {
  adult: boolean;
  gender: 1 | 2 | 0;
  id: number;
  known_for: ((MovieItem & { media_type: 'movie' }) | (SeriesItem & { media_type: 'tv' }))[];
  known_for_department: string;
  name: string;
  popularity: number;
  profile_path: string;
  isFavorite?: boolean;
};

type ListResponse = {
  page: number;
  total_pages: number;
  total_results: number;
};

export type TrendingMovieListResponse = ListResponse & {
  results: (MovieItem & { media_type: 'movie' })[];
};

export type TrendingSeriesListResponse = ListResponse & {
  results: (SeriesItem & { media_type: 'tv' })[];
};

export type TrendingPersonListResponse = ListResponse & {
  results: (PersonItem & { original_name: string; media_type: 'person' })[];
};

export type TrendingAllListResponse = ListResponse & {
  results: TrendingMovieListResponse['results'] & TrendingSeriesListResponse['results'] & TrendingPersonListResponse['results'];
};

export type TrendingResponse = TrendingMovieListResponse | TrendingSeriesListResponse | TrendingPersonListResponse | TrendingAllListResponse;

export type UpcomingMovieListResponse = TrendingMovieListResponse & {
  dates: {
    maximum: string;
    minimum: string;
  };
};

export type MovieListResponse = ListResponse & { results: MovieItem[] };
export type SeriesListResponse = ListResponse & { results: SeriesItem[] };
export type PersonListResponse = ListResponse & { results: PersonItem[] };
export type MovieSeriesPersonListResponse = (ListResponse & { results: MovieItem[] | SeriesItem[] | PersonItem[] }) | undefined;

export type TrendingListParams = {
  page?: number;
  language?: string;
  media_type: 'all' | 'movie' | 'tv' | 'person';
  time_window: 'day' | 'week';
};

export type DiscoverMoviesParams = {
  certification?: string;
  'certification.gte'?: string;
  'certification.lte'?: string;
  certification_country?: string;
  include_adult?: boolean;
  include_video?: boolean;
  language?: string;
  page?: number;
  primary_release_year?: number;
  'primary_release_date.gte'?: string;
  'primary_release_date.lte'?: string;
  region?: string;
  'release_date.gte'?: string;
  'release_date.lte'?: string;
  sort_by?:
    | 'popularity.asc'
    | 'popularity.desc'
    | 'revenue.asc'
    | 'revenue.desc'
    | 'primary_release_date.asc'
    | 'primary_release_date.desc'
    | 'vote_average.asc'
    | 'vote_average.desc'
    | 'vote_count.asc'
    | 'vote_count.desc';
  'vote_average.gte'?: number;
  'vote_average.lte'?: number;
  'vote_count.gte'?: number;
  'vote_count.lte'?: number;
  watch_region?: string;
  with_cast?: string;
  with_companies?: string;
  with_crew?: string;
  with_genres?: string;
  with_keywords?: string;
  with_origin_country?: string;
  with_original_language?: string;
  with_people?: string;
  with_release_type?: 1 | 2 | 3 | 4 | 5 | 6; //Premiere | Theatrical (limited) | Theatrical | Digital | Physical | TV
  'with_runtime.gte'?: string;
  'with_runtime.lte'?: string;
  with_watch_monetization_types?: string;
  with_watch_providers?: string;
  without_companies?: string;
  without_genres?: string;
  without_keywords?: string;
  without_watch_providers?: string;
  year?: number;
};

export type DiscoverSeriesParams = {
  'air_date.gte'?: string;
  'air_date.lte'?: string;
  first_air_date_year?: number;
  'first_air_date.gte'?: string;
  'first_air_date.lte'?: string;
  include_adult?: boolean;
  include_null_first_air_dates?: boolean;
  language?: string;
  page?: number;
  screened_theatrically?: boolean;
  sort_by?:
    | 'popularity.asc'
    | 'popularity.desc'
    | 'revenue.asc'
    | 'revenue.desc'
    | 'primary_release_date.asc'
    | 'primary_release_date.desc'
    | 'vote_average.asc'
    | 'vote_average.desc'
    | 'vote_count.asc'
    | 'vote_count.desc';
  timezone?: string;
  'vote_average.gte'?: number;
  'vote_average.lte'?: number;
  'vote_count.gte'?: number;
  'vote_count.lte'?: number;
  watch_region?: string;
  with_companies?: string;
  with_genres?: string;
  with_keywords?: string;
  with_networks?: number;
  with_origin_country?: string;
  with_original_language?: string;
  'with_runtime.gte'?: string;
  'with_runtime.lte'?: string;
  with_status?: 0 | 1 | 2 | 3 | 4 | 5;
  with_watch_monetization_types?: string;
  with_watch_providers?: string;
  without_companies?: string;
  without_genres?: string;
  without_keywords?: string;
  without_watch_providers?: string;
  with_type?: 0 | 1 | 2 | 3 | 4 | 5 | 6; //Scripted | Documentary | Reality | Talk | Animation | News | Soap
};

export type ListParams = {
  page?: number;
  language?: string;
  region?: string;
};

export type KeywordList = {
  total_results: number;
  results: {
    id: number;
    name: string;
  }[];
};

type LocationResOK = {
  place_id: number | null;
  licence: string | null;
  osm_type: string | null;
  osm_id: number | null;
  lat: string | null;
  lon: string | null;
  class: string | null;
  type: string | null;
  place_rank: number | null;
  importance: number | null;
  addresstype: string | null;
  name: string | null;
  display_name: string | null;
  address: {
    amenity: string | null;
    house_number: string | null;
    road: string | null;
    suburb: string | null;
    city: string | null;
    county: string | null;
    'ISO3166-2-lvl6': string | null;
    state: string | null;
    'ISO3166-2-lvl4': string | null;
    postcode: string | null;
    country: string | null;
    country_code: string | null;
    town: string | null;
    state_district: string | null;
  };
  boundingbox: string[] | null;
};

type LocationResError = {
  error: { code: number | null; message: string | null };
};

export type LocationResponse = LocationResOK | LocationResError;

export type CreateRequestTokenResponse = {
  success: boolean;
  expires_at: string;
  request_token: string;
};

export type CreateTmdbSessionIdResponse = {
  success: boolean;
  session_id: string;
};

export type DeleteTmdbSessionIdResponse = {
  success: boolean;
};

export type TmdbProfile = {
  avatar: {
    gravatar: {
      hash: string;
    };
    tmdb: {
      avatar_path: string;
    };
  };
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
};

export type GeneralPostRes = {
  status_code: number; //1-success,12-updated successfully,13-removed successfully
  status_message: string;
  success: boolean;
};

export type GetMovieResponse = {
  adult: boolean;
  backdrop_path?: string;
  belongs_to_collection?: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  } | null;
  budget?: number;
  genres?: {
    id: number;
    name: string;
  }[];
  homepage?: string;
  id: number;
  imdb_id?: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  production_companies?: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries?: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline?: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credits?: {
    cast?: {
      adult: boolean | null;
      gender: number | null;
      id: number;
      known_for_department: string | null;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string | null;
      cast_id: number;
      character: string | null;
      credit_id: string;
      order: number | null;
    }[];
    crew?: {
      adult: boolean | null;
      gender: number | null;
      id: number;
      known_for_department: string | null;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string | null;
      credit_id: string;
      department: string | null;
      job: string | null;
    }[];
  };
  external_ids?: {
    id: number;
    imdb_id?: string | null;
    wikidata_id?: string | null;
    facebook_id?: string | null;
    instagram_id?: string | null;
    twitter_id?: string | null;
  };
};
