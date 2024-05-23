import { type FC } from 'react';
import CardGeneric from '@/components/CardGeneric';
import { getMovies } from '@/lib/api_movie_lists';
import PaginationCustom from './PaginationCustom';

interface PageResultsMoviesProps {
  searchParams: { [key: string]: string | string[] | undefined };
  type: 'now_playing' | 'popular' | 'top_rated' | 'upcoming';
}

const PageResultsMovies: FC<PageResultsMoviesProps> = async ({ searchParams, type = 'popular' }) => {
  const currentPage = Number(searchParams?.page) || 1;
  const { results, page, total_pages } = (await getMovies({ ...searchParams, page: currentPage, type })) || {};

  return (
    <>
      <div className='grid grid-cols-2 justify-items-center sm:grid-cols-4 min-[960px]:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4 justify-center items-center'>
        {results?.map((data, index) => (
          <CardGeneric key={`${index}-${data.id}`} data={data} />
        ))}
      </div>
      <PaginationCustom page={page} total={total_pages || 1} className='justify-center align-middle flex mt-4' />
    </>
  );
};

export default PageResultsMovies;
