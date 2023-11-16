import { type FC } from 'react';
import SidebarMenu from '@/components/SidebarMenu';
import PageResults from '@/components/PageResults';

interface PopularMoviesProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const PopularMovies: FC<PopularMoviesProps> = async ({ searchParams }) => {
  return (
    <div className='w-full block min-[960px]:flex m-auto justify-center'>
      <SidebarMenu />
      <div className='p-4 max-w-7xl mx-auto justify-center'>
        <h1 className='mb-4 text-2xl font-bold text-slate-900 dark:text-white'>Movies</h1>
        <PageResults searchParams={searchParams} />
      </div>
    </div>
  );
};

export default PopularMovies;
