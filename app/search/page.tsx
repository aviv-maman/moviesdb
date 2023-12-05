'use server';
import SearchBar from '@/components/SearchBar';
import SearchResultCard from '@/components/SearchResultCard';
import searchData from '@/lib/data/search_data.json';

interface SearchProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const Search: React.FC<SearchProps> = async ({ searchParams }) => {
  return (
    <main className='animate-in w-full min-h-[80vh]'>
      <SearchBar />
      <div className='p-4 max-w-7xl mx-auto justify-center'>
        <h1 className='mb-4 text-2xl font-bold text-slate-900 dark:text-white'>Search Results</h1>
        {searchData.results.map((item) => (
          <SearchResultCard key={item.id} data={item} />
        ))}
      </div>
    </main>
  );
};

export default Search;
