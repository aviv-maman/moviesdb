import { type FC } from 'react';
import SidebarMenu from '@/components/SidebarMenu';
import PaginationCustom from '@/components/PaginationCustom';
import PageResults from '@/components/PageResults';
import topRatedMovies from '@/lib/data/top_rated-movies.json';
import popularMovies from '@/lib/data/popular-movies.json';
import type { MovieListResponse } from '@/lib/api.types';

interface PopularMoviesProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const topRatedResults: MovieListResponse['results'] = topRatedMovies.results;
const popularResults: MovieListResponse['results'] = popularMovies.results;

const getResults = async (page: number) => {
  // const res = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=1f6e8e2b0c0a0c1a1f6e8e2b0c0a0c1a');
  // return await res.json();
  const page1 = topRatedResults;
  const page2 = popularResults;
  return page === 1 ? page1 : page2;
};

const PopularMovies: FC<PopularMoviesProps> = async ({ searchParams }) => {
  const page = searchParams.page ? parseInt(searchParams.page as string) : 1;
  const movies = await getResults(page);

  return (
    <div className='animate-in w-full block min-[960px]:flex m-auto justify-center'>
      <SidebarMenu />
      <div className='p-4 max-w-7xl mx-auto justify-center'>
        <h1 className='mb-4 text-2xl font-bold text-slate-900 dark:text-white'>Movies</h1>
        <PageResults results={movies} />
        <PaginationCustom page={page} total={20} className='justify-center align-middle flex mt-4' />
      </div>
    </div>
  );
};

export default PopularMovies;
