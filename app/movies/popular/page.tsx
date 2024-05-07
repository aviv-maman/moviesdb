import SidebarMenu from '@/components/SidebarMenu';
import PageResults from '@/components/PageResults';

interface PopularMoviesProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const PopularMovies: React.FC<PopularMoviesProps> = async ({ searchParams }) => {
  return (
    <main className='animate-in w-full block min-[960px]:flex m-auto justify-center min-h-[80vh]'>
      <SidebarMenu />
      <div className='p-4 max-w-7xl mx-auto justify-center'>
        <h1 className='mb-4 text-2xl font-bold text-slate-900 dark:text-white'>Movies</h1>
        <PageResults searchParams={searchParams} />
      </div>
    </main>
  );
};

export default PopularMovies;
