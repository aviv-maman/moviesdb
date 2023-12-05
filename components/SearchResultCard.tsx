'use server';
import Image from 'next/image';
import Link from 'next/link';
import { MOVIE_GENRES, SERIES_GENRES } from '@/lib/data/search_filters';
import type { MovieListResponse, PersonListResponse, SeriesListResponse } from '@/lib/api.types';

interface SearchResultCardProps {
  data: MovieListResponse['results'][0] | SeriesListResponse['results'][0] | PersonListResponse['results'][0];
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({ data }) => {
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
    3: 'bg-gray-300 text-gray-900 dark:bg-gray-900 dark:text-gray-300',
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
    href: 'title' in data ? `/movies/${data.id}` : 'first_air_date' in data ? `/series/${data.id}` : `/people/${data.id}`,
    rating: 'vote_average' in data ? data.vote_average.toFixed(1) : data.popularity.toFixed(1) || 0.0,
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
        'vote_average' in data ? (Math.floor(data.vote_average) <= 4 ? 0 : Math.floor(data.vote_average) <= 7 ? 1 : 2) : 3
      ],
  };

  return (
    <article className='transition hover:shadow-xl border my-4 bg-'>
      <Link href={item.href} className='flex'>
        <Image
          width={224}
          height={336}
          alt={item.title}
          src={item.image}
          className='object-cover sm:w-48 md:w-56 border-r-1'
          priority
        />

        <div className='flex flex-1 flex-col justify-between'>
          <div className='border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6'>
            <div className='flex justify-between'>
              <h3 className='font-bold text-gray-700 dark:text-gray-300'>{item.title}</h3>
              <p className={`text-sm font-semibold inline-flex items-center p-1.5 rounded ${item.ratingColor}`}>{item.rating}</p>
            </div>
            <div className='flex flex-col'>
              <span className='text-small'>
                {item.release_date} | {item.media_type === 'person' ? 'Person' : item.media_type === 'movie' ? 'Movie' : 'Series'}
              </span>
            </div>

            <p className='mt-2 line-clamp-3 text-sm/relaxed text-gray-600 dark:text-gray-400'>
              {item.description.length > 200 ? item.description.slice(0, 700) + '...' : item.description}
            </p>
          </div>

          <div className='my-1 flex flex-wrap gap-1 p-6'>
            {genres.map((genre, index) => (
              <span key={`${index}-${genre}`} className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs ${genre?.color}`}>
                {genre?.label}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
};

export default SearchResultCard;
