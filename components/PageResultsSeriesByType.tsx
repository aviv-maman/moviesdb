import PaginationCustom from './PaginationCustom';
import CardGeneric from '@/components/CardGeneric';
import { getSeries } from '@/lib/api_series_lists';

interface PageResultsSeriesByTypeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  type: 'airing_today' | 'on_the_air' | 'popular' | 'top_rated';
}

const PageResultsSeriesByType: React.FC<PageResultsSeriesByTypeProps> = async ({ searchParams, type = 'popular' }) => {
  const currentPage = Number((await searchParams).page) || 1;
  const { results, page, total_pages } = (await getSeries({ ...(await searchParams), page: currentPage, type })) || {};

  return (
    <>
      <div className='grid grid-cols-2 items-center justify-center justify-items-center gap-4 sm:grid-cols-4 min-[960px]:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5'>
        {results?.map((data, index) => <CardGeneric key={`${index}-${data.id}`} data={data} />)}
      </div>
      <PaginationCustom page={page} total={total_pages || 1} className='mt-4 flex justify-center align-middle' />
    </>
  );
};

export default PageResultsSeriesByType;
