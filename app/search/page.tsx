'use server';

import { Suspense } from 'react';
import LoadPageBtn from '@/components/LoadPageBtn';
import SearchBar from '@/components/SearchBar';
import SearchResultCard from '@/components/SearchResultCard';
import SearchResultCardSkeleton from '@/components/SearchResultCardSkeleton';
import { type FilterOptions, filterSearch } from '@/lib/api_search';

interface SearchProps {
  searchParams?: {
    media_type?: 'multi' | 'movie' | 'tv' | 'person';
    query?: string;
    page?: number;
    language?: string;
    year?: number;
  };
}

const Search: React.FC<SearchProps> = async ({ searchParams }) => {
  const SKELETON_LENGTH = 10;
  const filterParams: FilterOptions = {
    media_type: searchParams?.media_type ? searchParams?.media_type : 'multi',
    query: searchParams?.query,
    page: Number(searchParams?.page) || 1,
    language: searchParams?.language,
    year: searchParams?.year ? Number(searchParams?.year) : undefined,
  };

  const searchData = await filterSearch(filterParams);

  return (
    <main className='animate-in min-h-[calc(100vh-162px)] w-full sm:min-h-[calc(100vh-154px)]'>
      <SearchBar />
      <div className='mx-auto max-w-7xl p-4'>
        <Suspense
          fallback={
            <div className='flex items-center justify-between'>
              <h1 className='text-2xl font-bold text-slate-900 dark:text-white'>Search Results</h1>
              <span className='ml-1 h-4 w-16 animate-pulse rounded-lg bg-gray-300 shadow dark:bg-gray-600'></span>
            </div>
          }>
          <div className='flex items-center justify-between'>
            <h1 className='text-2xl font-bold text-slate-900 dark:text-white'>Search Results</h1>
            <span className='ml-1 rounded-md bg-blue-200 p-1 text-xs font-semibold text-blue-800'>
              {searchData?.total_results} items
            </span>
          </div>
        </Suspense>
        <Suspense
          fallback={
            <>
              {Array.from({ length: SKELETON_LENGTH }).map((_, index) => (
                <SearchResultCardSkeleton key={index} />
              ))}
            </>
          }>
          {searchData?.results?.map((item) => <SearchResultCard key={item.id} data={item} />)}
          {searchData && searchData?.total_pages > 1 && (
            <div className='flex w-full justify-between'>
              <LoadPageBtn label='Back' totalPages={searchData?.total_pages} />
              <LoadPageBtn label='Next' totalPages={searchData?.total_pages} />
            </div>
          )}
        </Suspense>
      </div>
    </main>
  );
};

export default Search;
