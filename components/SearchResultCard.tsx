'use server';

import { Image } from '@heroui/react';
import Link from 'next/link';
import SearchResultBadge from './SearchResultBadge';
import type { MovieListResponse, PersonListResponse, SeriesListResponse } from '@/lib/api.types';
import { MOVIE_GENRES, SERIES_GENRES } from '@/lib/data/search_filters';

interface SearchResultCardProps {
  data: MovieListResponse['results'][0] | SeriesListResponse['results'][0] | PersonListResponse['results'][0];
}

const SearchResultCard: React.FC<SearchResultCardProps> = async ({ data }) => {
  const genres =
    'genre_ids' in data
      ? 'title' in data
        ? data.genre_ids.map((id) => MOVIE_GENRES.find((genre) => genre.value === String(id)))
        : data.genre_ids.map((id) => SERIES_GENRES.find((genre) => genre.value === String(id)))
      : [];

  const ratingColors: { [key: number]: string } = {
    0: 'bg-red-300 text-red-900 dark:bg-red-900 dark:text-red-300',
    1: 'bg-yellow-300 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-300',
    2: 'bg-green-300 text-green-900 dark:bg-green-900 dark:text-green-300',
    3: 'bg-gray-300 text-gray-900 dark:bg-gray-600 dark:text-gray-300',
  };

  const item = {
    title: 'title' in data ? data.title : data.name || 'Not available',
    description: 'overview' in data ? data.overview : 'Not available',
    image:
      'poster_path' in data && data.poster_path
        ? `https://image.tmdb.org/t/p/w342/${data.poster_path}`
        : 'profile_path' in data && data.profile_path
          ? `https://image.tmdb.org/t/p/w342/${data.profile_path}`
          : './no-image.svg',
    href:
      'title' in data
        ? `/movies/item/${data.id}`
        : 'first_air_date' in data
          ? `/series/item/${data.id}`
          : `/people/item/${data.id}`,
    rating:
      'vote_average' in data
        ? data.vote_average === 10
          ? 10
          : data.vote_average.toFixed(1)
        : data.popularity.toFixed(1) || 0.0,
    release_date:
      'release_date' in data
        ? data.release_date.split('-')[0]
        : 'first_air_date' in data
          ? data.first_air_date.split('-')[0]
          : '',
    media_id: data.id,
    media_type: 'title' in data ? 'movie' : 'first_air_date' in data ? 'tv' : ('person' as 'movie' | 'tv' | 'person'),
    genres,
    ratingColor:
      ratingColors[
        'vote_average' in data
          ? Math.floor(data.vote_average) === 0
            ? 3
            : Math.floor(data.vote_average) <= 4
              ? 0
              : Math.floor(data.vote_average) <= 7
                ? 1
                : 2
          : 0
      ],
  };

  return (
    <article className='relative my-4 border bg-gray-100 transition hover:shadow-lg hover:shadow-indigo-400/40 dark:bg-gray-900'>
      <Link href={item.href} className='flex'>
        <Image
          width={168}
          height={336}
          alt={item.title}
          src={item.image}
          radius='none'
          className='z-0 h-[250px] border-r-1 object-cover sm:h-[168px] sm:w-28 md:h-[336px] md:w-56'
          classNames={{ wrapper: 'md:min-w-56' }}
        />

        <div className='flex flex-1 flex-col justify-between'>
          <div className='border-s border-gray-900/10 p-2 sm:border-l-transparent sm:p-6'>
            <div className='flex justify-between'>
              <div className='flex flex-col'>
                <h3 className='font-bold leading-tight text-gray-700 dark:text-gray-300'>{item.title}</h3>
                <span className='text-small'>
                  {item.release_date} |{' '}
                  {item.media_type === 'person' ? 'Person' : item.media_type === 'movie' ? 'Movie' : 'Series'}
                </span>
              </div>
              <p className={`inline-flex h-fit items-center rounded p-1.5 text-sm font-semibold ${item.ratingColor}`}>
                {item.rating}
              </p>
            </div>

            <p className='mt-2 line-clamp-3 text-sm/relaxed text-gray-600 dark:text-gray-400'>
              {item.description.length > 200 ? item.description.slice(0, 700) + '...' : item.description}
            </p>
          </div>

          <div className='my-1 hidden flex-wrap gap-1 p-6 md:flex'>
            {item.genres.map((genre, index) => (
              <SearchResultBadge key={`${index}-${genre}`} label={genre?.label} color={genre?.color} />
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
};

export default SearchResultCard;
