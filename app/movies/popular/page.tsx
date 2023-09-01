import { type FC } from 'react';
import SidebarMenu from '@/components/SidebarMenu';
import trendingMedia from '@/lib/dummy-data/trending-all.json';
import type { ListResponse } from '@/lib/api.types';
import MovieCard from '@/components/MovieCard';

interface PopularMoviesProps {}

const PopularMovies: FC<PopularMoviesProps> = ({}) => {
  const { results } = trendingMedia as ListResponse;

  return (
    <div className='animate-in w-full sm:block md:flex m-auto justify-center'>
      <SidebarMenu />
      <div className='p-4 max-w-7xl'>
        <h1 className='mb-4 text-2xl font-bold text-slate-900 dark:text-white'>Movies</h1>
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
          {[...results, ...results].map((data, index) => (
            <MovieCard key={`${index}-${data.id}`} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularMovies;
