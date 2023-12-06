'use server';
import SearchBar from '@/components/SearchBar';
import SearchResultCard from '@/components/SearchResultCard';
import SearchResultCardSkeleton from '@/components/SearchResultCardSkeleton';
import searchData from '@/lib/data/search_data.json';
import { Suspense } from 'react';

interface SearchProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const Search: React.FC<SearchProps> = async ({ searchParams }) => {
  const SKELETON_LENGTH = 10;

  return (
    <main className='animate-in w-full min-h-[80vh]'>
      <SearchBar />
      <div className='p-4 max-w-7xl mx-auto justify-center'>
        <h1 className='mb-4 text-2xl font-bold text-slate-900 dark:text-white'>Search Results</h1>
        <Suspense
          fallback={
            <>
              {Array.from({ length: SKELETON_LENGTH }).map((_, index) => (
                <SearchResultCardSkeleton key={index} />
              ))}
            </>
          }
        >
          {searchData.results.map((item) => (
            <SearchResultCard key={item.id} data={item} />
          ))}
        </Suspense>
      </div>
    </main>
  );
};

export default Search;
