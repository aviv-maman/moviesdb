'use client';
import { type FC } from 'react';
import { CircularProgress, Image } from '@nextui-org/react';
import CarouselDropdown from './CarouselDropdown';
import type { MovieListResponse, PeopleListResponse, SeriesListResponse } from '@/lib/api.types';

interface CardGenericProps {
  data: MovieListResponse['results'][0] | SeriesListResponse['results'][0] | PeopleListResponse['results'][0];
}

const CardGeneric: FC<CardGenericProps> = ({ data }) => {
  const ratingColors: { [key: number]: 'danger' | 'warning' | 'success' } = {
    0: 'danger',
    1: 'danger',
    2: 'danger',
    3: 'danger',
    4: 'danger',
    5: 'warning',
    6: 'warning',
    7: 'warning',
    8: 'success',
    9: 'success',
    10: 'success',
  };

  const imgClasses = 'z-0 w-full rounded-md object-cover max-w-full max-h-auto';

  const loadRatingColor = (rating: number) => {
    return ratingColors[Math.floor(rating)];
  };

  //TODO: Add fallback image
  //TODO: Add type to item
  const item = {
    title: 'title' in data ? data.title : data.name || 'Not available',
    description: 'overview' in data ? data.overview : 'Not available',
    image:
      'poster_path' in data && data.poster_path
        ? `https://image.tmdb.org/t/p/w342/${data.poster_path}`
        : 'profile_path' in data && data.profile_path
        ? `https://image.tmdb.org/t/p/w342/${data.profile_path}`
        : './no-image.svg',
    href: 'title' in data ? `/movies/${data.id}` : 'original_name' in data ? `/series/${data.id}` : `/people/${data.id}`,
    rating: 'vote_average' in data ? data.vote_average : data.popularity || 0,
    releaseDate:
      'release_date' in data
        ? data.release_date
        : 'first_air_date' in data
        ? data.first_air_date
        : data.known_for.map((item) => ('title' in item ? item.title : item.name)).join(', ') || '0000-00-00',
    media_id: data.id,
    media_type: 'title' in data ? 'movie' : ('tv' as 'movie' | 'tv'),
  };

  return (
    <div className='relative rounded-md h-full max-w-[11rem]'>
      <Image src={item.image} alt={item.title} className={`${item.image === './no-image.svg' && 'p-4'} ${imgClasses}`} />
      {'known_for' in data ? null : <CarouselDropdown mediaId={item.media_id} mediaType={item.media_type} />}
      <div className='absolute inset-0 rounded-md bg-gradient-to-t from-gray-900 to-transparent' />
      <div className='absolute bottom-0 left-0 text-left w-full p-2'>
        <h1 className='text-small font-semibold text-white'>{item.title}</h1>
        <div className='flex justify-between mt-1 items-center'>
          <span className='text-tiny text-gray-300'>{item.releaseDate}</span>
          {'known_for' in data ? null : (
            <CircularProgress
              aria-label='Vote average'
              size='sm'
              value={'vote_average' in data ? data.vote_average * 10 : undefined}
              color={loadRatingColor('vote_average' in data ? data.vote_average : 0)}
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
