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

export type TrendingListParams = {
  page?: number;
  language?: string;
  media_type: 'all' | 'movie' | 'tv' | 'person';
  time_window: 'day' | 'week';
};

export type NowPlayingListParams = {
  page?: number;
  language?: string;
  region?: string;
};

export type PopularListParams = {
  page?: number;
  language?: string;
  region?: string;
};

export type TopRatedListParams = {
  page?: number;
  language?: string;
  region?: string;
};

export type UpcomingListParams = {
  page?: number;
  language?: string;
  region?: string;
};
