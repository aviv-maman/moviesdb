'use client';

import { Button, Image } from '@heroui/react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Trash } from '@/assets/icons';
import { useProfile } from '@/context/ProfileContext';
import type { MovieListResponse, PersonListResponse, SeriesListResponse } from '@/lib/api.types';
import { getFavorites, toggleFavorite } from '@/lib/api_account';
import { MOVIE_GENRES, SERIES_GENRES } from '@/lib/data/search_filters';

interface FavoriteListCardProps {
  data: MovieListResponse['results'][0] | SeriesListResponse['results'][0] | PersonListResponse['results'][0];
}

const FavoriteListCard: React.FC<FavoriteListCardProps> = ({ data }) => {
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

  const className = `whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs`;

  const badgeColors: { [key: string]: string } = {
    blue: 'bg-blue-200 text-blue-600 dark:bg-blue-600 dark:text-blue-100',
    purple: 'bg-purple-200 text-purple-600 dark:bg-purple-600 dark:text-purple-100',
    red: 'bg-red-200 text-red-600 dark:bg-red-600 dark:text-red-100',
    green: 'bg-green-200 text-green-600 dark:bg-green-600 dark:text-green-100',
    yellow: 'bg-yellow-200 text-yellow-600 dark:bg-yellow-600 dark:text-yellow-100',
    indigo: 'bg-indigo-200 text-indigo-600 dark:bg-indigo-600 dark:text-indigo-100',
    pink: 'bg-pink-200 text-pink-600 dark:bg-pink-600 dark:text-pink-100',
    orange: 'bg-orange-200 text-orange-600 dark:bg-orange-600 dark:text-orange-100',
    lime: 'bg-lime-200 text-lime-600 dark:bg-lime-600 dark:text-lime-100',
    amber: 'bg-amber-200 text-amber-600 dark:bg-amber-600 dark:text-amber-100',
    fuchsia: 'bg-fuchsia-200 text-fuchsia-600 dark:bg-fuchsia-600 dark:text-fuchsia-100',
    cyan: 'bg-cyan-200 text-cyan-600 dark:bg-cyan-600 dark:text-cyan-100',
    sky: 'bg-sky-200 text-sky-600 dark:bg-sky-600 dark:text-sky-100',
    violet: 'bg-violet-200 text-violet-600 dark:bg-violet-600 dark:text-violet-100',
    emerald: 'bg-emerald-200 text-emerald-600 dark:bg-emerald-600 dark:text-emerald-100',
    teal: 'bg-teal-200 text-teal-600 dark:bg-teal-600 dark:text-teal-100',
    gray: 'bg-gray-300 text-gray-900 dark:bg-gray-900 dark:text-gray-300',
  };

  const { dispatch, state } = useProfile();

  const handleFavorite = async () => {
    if (!state.supabase_profile?.tmdb_account_id || !state.supabase_profile?.tmdb_session_id) return;
    const res = await toggleFavorite({
      account_id: state.supabase_profile?.tmdb_account_id,
      session_id: state.supabase_profile?.tmdb_session_id,
      media_type: state.active_favlist as 'movie' | 'tv',
      media_id: data.id,
      favorite: state.favorites[state.active_favlist as 'movie' | 'tv'].includes(data.id) ? false : true,
    });
    if (!res.success) {
      toast.error('An error was occurred');
      return;
    }
    toast.success(
      state.favorites['movie'].includes(data.id) ? 'Item was removed from favorites' : 'Item was added to favorites',
    );
    dispatch({
      type: 'toggled_favorite_item',
      payload: { value: { media_type: state.active_favlist as 'movie' | 'tv', id: data.id } },
    });
    const favRes = await getFavorites({
      account_id: state.supabase_profile?.tmdb_account_id,
      session_id: state.supabase_profile?.tmdb_session_id,
      media_type: state.active_favlist as 'movie' | 'tv',
      revalidate: 0,
    });
    if (!favRes.results) return;
    dispatch({
      type: (state.active_favlist as 'movie' | 'tv') === 'movie' ? 'changed_favorite_movie' : 'changed_favorite_tv',
      payload: { value: favRes.results.map((item) => item.id) },
    });
  };

  return (
    <article className='relative my-4 flex border bg-gray-100 transition hover:shadow-lg hover:shadow-indigo-400/40 dark:bg-gray-900'>
      <Link href={item.href} className='absolute bottom-0 left-0 right-0 top-0 z-10' />
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
        <div className='border-s border-gray-900/10 p-2 sm:border-l-transparent sm:p-4'>
          <div className='flex justify-between'>
            <div className='flex flex-col'>
              <h3 className='font-bold leading-tight text-gray-700 dark:text-gray-300'>{item.title}</h3>
              <span className='text-small'>
                {item.release_date} |{' '}
                {item.media_type === 'person' ? 'Person' : item.media_type === 'movie' ? 'Movie' : 'Series'}
              </span>
            </div>
            <div className='flex flex-col gap-2 sm:flex-row sm:gap-y-0'>
              <p className={`inline-flex h-fit items-center rounded p-1.5 text-sm font-semibold ${item.ratingColor}`}>
                {item.rating}
              </p>
              <Button isIconOnly size='sm' color='danger' className='z-10'>
                <Trash className='size-5' onClick={handleFavorite} />
              </Button>
            </div>
          </div>

          <p className='mt-2 line-clamp-3 text-sm/relaxed text-gray-600 dark:text-gray-400'>
            {item.description.length > 200 ? item.description.slice(0, 700) + '...' : item.description}
          </p>
        </div>

        <div className='my-1 hidden flex-wrap gap-1 p-6 md:flex'>
          {item.genres.map((genre, index) => (
            <span key={`${index}-${genre}`} className={`${className} ${badgeColors[genre?.color || 'gray']}`}>
              {genre?.label}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default FavoriteListCard;
