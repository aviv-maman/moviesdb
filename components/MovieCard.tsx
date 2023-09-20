'use client';

import { type FC } from 'react';
import { CircularProgress, Image } from '@nextui-org/react';
import CarouselDropdown from './CarouselDropdown';
import type { MovieListResponse, SeriesListResponse } from '@/lib/api.types';

interface MovieCardProps {
  data: MovieListResponse['results'][0] | SeriesListResponse['results'][0];
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

  //TODO: Add fallback image
  //TODO: Add type to item
  const item = {
    title: 'title' in data ? data.title : data.name || 'Not available',
    description: data.overview || 'Not available',
    image: `https://image.tmdb.org/t/p/w342/${data.poster_path}`,
    href: 'title' in data ? `/movies/${data.id}` : data.name ? `/series/${data.id}` : '/',
    rating: data.vote_average || 0,
    releaseDate: 'release_date' in data ? data.release_date : data.first_air_date || '0000-00-00',
  };

  return (
    <div className='relative w-auto rounded-md' style={{ maxWidth: '12rem' }}>
      <Image src={item.image} alt={item.title} className='z-0 h-full w-full rounded-md object-cover' width={400} height={500} />
      <CarouselDropdown />
      <div className='absolute inset-0 rounded-md bg-gradient-to-t from-gray-900 to-transparent' />
      <div className='absolute bottom-0 left-0 text-left w-full p-2'>
        <h1 className='text-small font-semibold text-white'>{item.title}</h1>
        <div className='flex justify-between mt-1 items-center'>
          <span className='text-tiny text-gray-300'>{item.releaseDate}</span>
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
