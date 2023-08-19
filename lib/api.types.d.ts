export type ListResponse = {
  page: number;
  results: {
    adult: boolean;
    backdrop_path: string;
    id: number;
    title: string;
    original_language: string;
    original_title: string;
    overview: string;
    poster_path: string;
    media_type: string;
    genre_ids: number[];
    popularity: number;
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }[];
  total_pages: number;
  total_results: number;
};

export type UpcomingListResponse = {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }[];
  total_pages: number;
  total_results: number;
};

export type PopularPeopleListResponse = {
  page: number;
  results: {
    adult: boolean;
    gender: number;
    id: number;
    known_for: {
      adult: boolean;
      backdrop_path: string;
      genre_ids: number[];
      id: number;
      media_type: string;
      original_language: string;
      original_title: string;
      overview: string;
      poster_path: string;
      release_date: string;
      title: string;
      video: boolean;
      vote_average: number;
      vote_count: number;
    }[];
    known_for_department: string;
    name: string;
    popularity: number;
    profile_path: string;
  }[];
  total_pages: number;
  total_results: number;
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
