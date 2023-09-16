type ListItem = {
  backdrop_path: string;
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
};

type SeriesItem = ListItem & {
  name: string;
  original_name: string;
  first_air_date: string;
  origin_country: string[];
};

type PersonItem = {
  adult: boolean;
  gender: 1 | 2 | 0;
  id: number;
  known_for: ((MovieItem & { media_type: 'movie' }) & (SeriesItem & { media_type: 'tv' }))[];
  known_for_department: string;
  name: string;
  popularity: number;
  profile_path: string;
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

export type UpcomingMovieListResponse = TrendingMovieListResponse & {
  dates: {
    maximum: string;
    minimum: string;
  };
};

export type MovieListResponse = ListResponse & {
  results: MovieItem[];
};

export type SeriesListResponse = ListResponse & {
  results: SeriesItem[];
};

export type PopularPeopleListResponse = ListResponse & {
  results: PersonItem[];
};

export type TrendingListParams = {
  page?: number;
  language?: string;
  media_type: 'all' | 'movie' | 'tv' | 'person';
  time_window: 'day' | 'week';
};

export type DiscoverListParams = {
  certification?: string;
  'certification.gte'?: string;
  'certification.lte'?: string;
  certification_country?: string;
  include_adult?: boolean;
  include_video?: boolean;
  language?: string;
  page?: number;
  primary_release_year?: number;
  'primary_release_date.gte'?: Date;
  'primary_release_date.lte'?: Date;
  region?: string;
  'release_date.gte'?: Date;
  'release_date.lte'?: Date;
  sort_by?:
    | 'popularity.asc'
    | 'popularity.desc'
    | 'release_date.asc'
    | 'release_date.desc'
    | 'revenue.asc'
    | 'revenue.desc'
    | 'primary_release_date.asc'
    | 'primary_release_date.desc'
    | 'original_title.asc'
    | 'original_title.desc'
    | 'vote_average.asc'
    | 'vote_average.desc'
    | 'vote_count.asc'
    | 'vote_count.desc';
  'vote_average.gte'?: string;
  'vote_average.lte'?: string;
  'vote_count.gte'?: string;
  'vote_count.lte'?: string;
  watch_region?: string;
  with_cast?: string;
  with_companies?: string;
  with_crew?: string;
  with_genres?: string;
  with_keywords?: string;
  with_origin_country?: string;
  with_original_language?: string;
  with_people?: string;
  with_release_type: number;
  'with_runtime.gte'?: string;
  'with_runtime.lte'?: string;
  with_watch_monetization_types?: string;
  with_watch_providers?: string;
  without_companies?: string;
  without_genres?: string;
  without_keywords?: string;
  without_watch_providers?: string;
  year?: string;
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

export type LocationResponse = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  category: string;
  type: string;
  place_rank: number;
  importance: number;
  name: string;
  display_name: string;
  address: {
    road: string;
    town: string;
    state_district: string;
    state: string;
    'ISO3166-2-lvl4': string;
    postcode: string;
    country: string;
    country_code: string;
  };
  boundingbox: string[];
};
