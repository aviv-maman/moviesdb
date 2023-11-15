import { type FC } from 'react';
import SidebarMenu from '@/components/SidebarMenu';
import PaginationCustom from '@/components/PaginationCustom';
import PageResults from '@/components/PageResults';
import { discoverMovies } from '@/lib/api_movie_lists';

interface PopularMoviesProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const PopularMovies: FC<PopularMoviesProps> = async ({ searchParams }) => {
  const currentPage = searchParams.page ? parseInt(searchParams.page as string) : 1;
  const { results, page, total_pages } = await discoverMovies({ ...searchParams, page: currentPage });

  return (
    <div className='w-full block min-[960px]:flex m-auto justify-center'>
      <SidebarMenu />
      <div className='p-4 max-w-7xl mx-auto justify-center'>
        <h1 className='mb-4 text-2xl font-bold text-slate-900 dark:text-white'>Movies</h1>
        <PageResults results={results} />
        <PaginationCustom page={page} total={total_pages} className='justify-center align-middle flex mt-4' />
      </div>
    </div>
  );
};

export default PopularMovies;
