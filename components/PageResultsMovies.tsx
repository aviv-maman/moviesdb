import PaginationCustom from './PaginationCustom';
import CardGeneric from '@/components/CardGeneric';
import { discoverMovies } from '@/lib/api_movie_lists';

interface PageResultsMoviesProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const PageResultsMovies: React.FC<PageResultsMoviesProps> = async ({ searchParams }) => {
  const currentPage = Number((await searchParams).page) || 1;
  const { results, page, total_pages } = (await discoverMovies({ ...(await searchParams), page: currentPage })) || {};

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
