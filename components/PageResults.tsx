'use client';

import { type FC } from 'react';
import type { MovieListResponse } from '@/lib/api.types';
import MovieCard from '@/components/MovieCard';

interface PageResultsProps {
  results: MovieListResponse['results'];
}

const PageResults: FC<PageResultsProps> = ({ results }) => {
  return (
    <div className='grid grid-cols-2 justify-items-center sm:grid-cols-4 min-[960px]:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4 justify-center items-center '>
      {results.map((data, index) => (
        <MovieCard key={`${index}-${data.id}`} data={data} />
      ))}
    </div>
  );
};

export default PageResults;
