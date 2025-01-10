import PaginationCustom from './PaginationCustom';
import CardGeneric from '@/components/CardGeneric';
import { getMovies } from '@/lib/api_movie_lists';

interface PageResultsMoviesProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  type: 'now_playing' | 'popular' | 'top_rated' | 'upcoming';
}

const PageResultsMovies: React.FC<PageResultsMoviesProps> = async ({ searchParams, type = 'popular' }) => {
  const currentPage = Number((await searchParams).page) || 1;
  const { results, page, total_pages } = (await getMovies({ ...(await searchParams), page: currentPage, type })) || {};

  return (
    <>
      <div className='grid grid-cols-2 items-center justify-center justify-items-center gap-4 sm:grid-cols-4 min-[960px]:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5'>
        {results?.map((data, index) => <CardGeneric key={`${index}-${data.id}`} data={data} />)}
      </div>
      <PaginationCustom page={page} total={total_pages || 1} className='mt-4 flex justify-center align-middle' />
    </>
  );
};

export default PageResultsMovies;
