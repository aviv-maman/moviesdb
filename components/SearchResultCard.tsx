'use server';
import Image from 'next/image';
import type { MovieListResponse, PersonListResponse, SeriesListResponse } from '@/lib/api.types';
import { MOVIE_GENRES, SERIES_GENRES } from '@/lib/data/search_filters';
import Link from 'next/link';

interface SearchResultCardProps {
  data: MovieListResponse['results'][0] | SeriesListResponse['results'][0] | PersonListResponse['results'][0];
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({ data }) => {
  const genre_ids =
    'genre_ids' in data
      ? 'title' in data
        ? data.genre_ids.map((id) => MOVIE_GENRES.find((genre) => genre.value === String(id))?.label).join(', ')
        : data.genre_ids.map((id) => SERIES_GENRES.find((genre) => genre.value === String(id))?.label).join(', ')
      : '';

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
    rating: 'vote_average' in data ? data.vote_average : data.popularity || 0,
    release_date:
      'release_date' in data
        ? data.release_date.split('-')[0]
        : 'first_air_date' in data
        ? data.first_air_date.split('-')[0]
        : '',
    media_id: data.id,
    media_type: 'title' in data ? 'movie' : 'first_air_date' in data ? 'tv' : ('person' as 'movie' | 'tv' | 'person'),
    genre_ids,
  };

  return (
    <article className='transition hover:shadow-xl border my-4'>
      <Link href={item.href} className='flex'>
        <Image width={224} height={336} alt={item.title} src={item.image} className='object-cover' priority />

        <div className='flex flex-1 flex-col justify-between'>
          <div className='border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6'>
            <h3 className='font-bold uppercase text-gray-900'>{item.title}</h3>
            <div className='flex flex-col'>
              <span className='text-small'>
                {item.release_date} | {item.media_type === 'person' ? 'Person' : item.media_type === 'movie' ? 'Movie' : 'Series'}
              </span>
              <span className='text-tiny text-default-400'>{item.genre_ids}</span>
            </div>

            <p className='mt-2 line-clamp-3 text-sm/relaxed text-gray-700'>
              {item.description.length > 200 ? item.description.slice(0, 700) + '...' : item.description}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default SearchResultCard;
