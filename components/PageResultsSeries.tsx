import { type FC } from 'react';
import CardGeneric from '@/components/CardGeneric';
import { discoverSeries } from '@/lib/api_series_lists';
import PaginationCustom from './PaginationCustom';

interface PageResultsSeriesProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const PageResultsSeries: FC<PageResultsSeriesProps> = async ({ searchParams }) => {
  const currentPage = Number(searchParams?.page) || 1;
  const { results, page, total_pages } = (await discoverSeries({ ...searchParams, page: currentPage })) || {};

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

export default PageResultsSeries;
