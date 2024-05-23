'use server';
import SearchBar from '@/components/SearchBar';
import SearchResultCard from '@/components/SearchResultCard';
import SearchResultCardSkeleton from '@/components/SearchResultCardSkeleton';
import LoadPageBtn from '@/components/LoadPageBtn';
import { type FilterOptions, filterSearch } from '@/lib/api_search';
import { Suspense } from 'react';

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
    <main className='animate-in w-full min-h-[calc(100vh-162px)] sm:min-h-[calc(100vh-154px)]'>
      <SearchBar />
      <div className='p-4 max-w-7xl mx-auto'>
        <Suspense
          fallback={
            <div className='flex items-center'>
              <h1 className='text-2xl font-bold text-slate-900 dark:text-white'>Search Results</h1>
              <span className='shadow animate-pulse h-4 bg-gray-300 rounded-lg w-16 dark:bg-gray-600 ml-1'></span>
            </div>
          }>
          <div className='flex items-center'>
            <h1 className='text-2xl font-bold text-slate-900 dark:text-white'>Search Results</h1>
            <span className='p-1 ml-1 text-xs font-semibold text-blue-800 bg-blue-200 rounded-md'>{searchData?.total_results} items</span>
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
          {searchData?.results?.map((item) => (
            <SearchResultCard key={item.id} data={item} />
          ))}
          <div className='flex justify-between w-full'>
            <LoadPageBtn label='Back' totalPages={searchData?.total_pages} />
            <LoadPageBtn label='Next' totalPages={searchData?.total_pages} />
          </div>
        </Suspense>
      </div>
    </main>
  );
};

export default Search;
