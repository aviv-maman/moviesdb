import SidebarMenu from '@/components/SidebarMenu';
import PageResultsSeriesByType from '@/components/PageResultsSeriesByType';

interface AiringTodaySeriesProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const AiringTodaySeries: React.FC<AiringTodaySeriesProps> = async ({ searchParams }) => {
  return (
    <main className='animate-in w-full block min-[960px]:flex m-auto justify-center min-h-[calc(100vh-162px)] sm:min-h-[calc(100vh-154px)]'>
      <SidebarMenu />
      <div className='p-4 max-w-7xl mx-auto justify-center'>
        <h1 className='mb-4 text-2xl font-bold text-slate-900 dark:text-white'>Series</h1>
        <PageResultsSeriesByType searchParams={searchParams} type='airing_today' />
      </div>
    </main>
  );
};

export default AiringTodaySeries;
