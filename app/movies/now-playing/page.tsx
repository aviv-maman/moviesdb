import SidebarMenu from '@/components/SidebarMenu';
import PageResultsMoviesByType from '@/components/PageResultsMoviesByType';

interface NowPlayingMoviesProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const NowPlayingMovies: React.FC<NowPlayingMoviesProps> = async ({ searchParams }) => {
  return (
    <main className='animate-in w-full block min-[960px]:flex m-auto justify-center min-h-[calc(100vh-162px)] sm:min-h-[calc(100vh-154px)]'>
      <SidebarMenu />
      <div className='p-4 max-w-7xl mx-auto justify-center'>
        <h1 className='mb-4 text-2xl font-bold text-slate-900 dark:text-white'>Series</h1>
        <PageResultsMoviesByType searchParams={searchParams} type='now_playing' />
      </div>
    </main>
  );
};

export default NowPlayingMovies;
