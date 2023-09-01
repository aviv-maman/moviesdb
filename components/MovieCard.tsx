'use client';

import { type FC } from 'react';
import { CircularProgress, Image } from '@nextui-org/react';
import CarouselDropdown from './CarouselDropdown';
import type { ListResponse } from '@/lib/api.types';

interface MovieCardProps {
  data: ListResponse['results'][0];
}

const MovieCard: FC<MovieCardProps> = ({ data }) => {
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

  const loadRatingColor = (rating: number) => {
    return ratingColors[Math.floor(rating)];
  };

  return (
    <div className='relative w-auto rounded-md'>
      <Image
        src={`https://image.tmdb.org/t/p/w342/${data.poster_path}`}
        alt={data.original_title}
        className='z-0 h-full w-full rounded-md object-cover'
        width={400}
        height={500}
      />
      <CarouselDropdown />
      <div className='absolute inset-0 rounded-md bg-gradient-to-t from-gray-900 to-transparent'></div>
      <div className='absolute bottom-0 left-0 text-left w-full p-2'>
        <h1 className='text-small font-semibold text-white'>{data.title || 'Not available'}</h1>
        <div className='flex justify-between mt-1 items-center'>
          <span className='text-tiny text-gray-300'>{data.release_date || '0000-00-00'}</span>
          <CircularProgress
            aria-label='Vote average'
            size='sm'
            value={data.vote_average * 10}
            color={loadRatingColor(data.vote_average)}
            showValueLabel={true}
            className='text-white'
          />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
