'use client';

import { CircularProgress, Image, Link } from '@heroui/react';
import CarouselDropdown from './CarouselDropdown';
import type { MovieListResponse, PersonListResponse, SeriesListResponse } from '@/lib/api.types';

interface CardGenericProps {
  data: MovieListResponse['results'][0] | SeriesListResponse['results'][0] | PersonListResponse['results'][0];
}

const CardGeneric: React.FC<CardGenericProps> = ({ data }) => {
  const ratingColors: { [key: number]: 'danger' | 'warning' | 'success' | 'default' } = {
    0: 'danger',
    1: 'warning',
    2: 'success',
    3: 'default',
  };
  const imgClasses = 'z-0 w-full rounded-md object-cover max-w-full max-h-auto min-h-64';

  const item = {
    title: 'title' in data ? data.title : data.name || 'Not available',
    description: 'overview' in data ? data.overview : 'Not available',
    image:
      'poster_path' in data && data.poster_path
        ? `https://image.tmdb.org/t/p/w342/${data.poster_path}`
        : 'profile_path' in data && data.profile_path
          ? `https://image.tmdb.org/t/p/w342/${data.profile_path}`
          : './no-image.jpg',
    href:
      'title' in data
        ? `/movies/item/${data.id}`
        : 'first_air_date' in data
          ? `/series/item/${data.id}`
          : `/people/item/${data.id}`,
    rating: 'vote_average' in data ? data.vote_average : data.popularity || 0,
    releaseDate:
      'release_date' in data
        ? data.release_date
        : 'first_air_date' in data
          ? data.first_air_date
          : data.known_for.map((item) => ('title' in item ? item.title : item.name)).join(', ') || '0000-00-00',
    media_id: data.id,
    media_type: 'title' in data ? 'movie' : ('tv' as 'movie' | 'tv'),
    ratingColor:
      ratingColors[
        'vote_average' in data
          ? Math.floor(data.vote_average) <= 4
            ? 0
            : Math.floor(data.vote_average) <= 7
              ? 1
              : 2
          : 3
      ],
  };

  return (
    <div className='relative h-full max-w-44 rounded-md'>
      <Link
        href={item.href}
        isDisabled={item.href.includes('people')}
        disableAnimation
        className='absolute inset-0 z-10 rounded-md sm:hover:bg-violet-400 sm:hover:opacity-20'
      />
      <Image
        src={item.image}
        alt={item.title}
        className={`${imgClasses} min-w-[159px] border-1 md:min-w-[175px]`}
        fallbackSrc={'./no-image.jpg'}
        radius='sm'
      />
      {'known_for' in data ? null : (
        <CarouselDropdown mediaId={item.media_id} mediaType={item.media_type} href={item.href} />
      )}
      <div className='absolute inset-0 rounded-md bg-gradient-to-t from-gray-900 to-transparent' />
      <div className='absolute bottom-0 left-0 w-full p-2 text-left'>
        <h1 className='text-small font-semibold text-white'>{item.title}</h1>
        <div className='mt-1 flex items-center justify-between'>
          <span className='text-tiny text-gray-300'>{item.releaseDate}</span>
          {'known_for' in data ? null : (
            <CircularProgress
              aria-label='Vote average'
              size='sm'
              value={'vote_average' in data ? data.vote_average * 10 : undefined}
              color={item.ratingColor}
              showValueLabel={true}
              className='text-white'
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CardGeneric;
