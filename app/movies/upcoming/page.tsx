import PageResultsMoviesByType from '@/components/PageResultsMoviesByType';
import SidebarMenu from '@/components/SidebarMenu';

interface UpcomingMoviesProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const UpcomingMovies: React.FC<UpcomingMoviesProps> = async ({ searchParams }) => {
  return (
    <main className='animate-in m-auto block min-h-[calc(100vh-162px)] w-full justify-center sm:min-h-[calc(100vh-154px)] min-[960px]:flex'>
      <SidebarMenu />
      <div className='mx-auto max-w-7xl justify-center p-4'>
        <h1 className='mb-4 text-2xl font-bold text-slate-900 dark:text-white'>Series</h1>
        <PageResultsMoviesByType searchParams={searchParams} type='upcoming' />
      </div>
    </main>
  );
};

export default UpcomingMovies;
