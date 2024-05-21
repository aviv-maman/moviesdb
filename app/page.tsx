import Carousel from '@/components/Carousel';
import FeatureCard from '@/components/FeatureCard';
import { features } from '@/lib/features-data';
import { getTrendingItems } from '@/lib/api_trending';
import { discoverMovies, getMovies } from '@/lib/api_movie_lists';
import { getSeries } from '@/lib/api_series_lists';
import { getPeople } from '@/lib/api_people_lists';
import popularMoviesFallback from '@/lib/data/popular_movies.json';

export const dynamic = 'force-dynamic';

const getDateWithLastDayOfMonth = () => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const lastDayOfMonth = new Date(year, month, 0).getDate();
  return `${year}-${month}-${lastDayOfMonth}`;
};

export default async function Index() {
  const backgroundLoader = (width: 'w300' | 'w780' | 'w1280' | 'original', index?: number) => {
    const chosenNumber = index || Math.floor(Math.random() * 19);
    const backdropPath = popularMovies?.results?.[chosenNumber]?.backdrop_path || popularMoviesFallback?.results?.[chosenNumber]?.backdrop_path;
    return `https://image.tmdb.org/t/p/${width}${backdropPath}`;
  };

  const [trendingMovies, trendingSeries] = await Promise.all([getTrendingItems({ type: 'movie' }), getTrendingItems({ type: 'tv' })]);
  const [popularMovies, popularSeries, PopularPeople] = await Promise.all([
    getMovies({ type: 'popular' }),
    getSeries({ type: 'popular' }),
    getPeople({ type: 'popular' }),
  ]);

  const [topRatedMovies, topRatedSeries] = await Promise.all([getMovies({ type: 'top_rated' }), getSeries({ type: 'top_rated' })]);
  const [upcomingWeeklyMovies, upcomingMonthlyMovies, upcomingYearlyMovies] = await Promise.all([
    discoverMovies({
      'primary_release_date.gte': new Date().toISOString().slice(0, 10),
      'primary_release_date.lte': new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    }),
    discoverMovies({
      'primary_release_date.gte': new Date().toISOString().slice(0, 10),
      'release_date.lte': new Date(getDateWithLastDayOfMonth()).toISOString().slice(0, 10),
    }),
    discoverMovies({ 'primary_release_date.gte': new Date().toISOString().slice(0, 10), year: new Date().getFullYear() }),
  ]);

  return (
    <main className='animate-in flex flex-col gap-7 mx-4'>
      <div
        style={{ backgroundImage: `url(${backgroundLoader('w1280')})` }}
        className={`relative overflow-hidden bg-cover bg-no-repeat p-12 text-center h-96`}>
        <div className='absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed bg-gradient-to-b from-[#00000099]'>
          <div className='flex h-full items-center justify-center'>
            <p className='text-3xl lg:text-4xl !leading-tight mx-auto text-center my-12 text-white'>
              The easiest way to discover <strong>movies</strong> and <strong>series</strong>
            </p>
          </div>
        </div>
      </div>

      <div className='w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent' />

      <div className='flex flex-col gap-8 text-foreground px-6 sm:px-0'>
        <h2 className='text-lg font-bold text-center text-slate-900 dark:text-white'>Everything you need to get started</h2>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-col text-foreground xl:mx-12 2xl:mx-32'>
        {features.map(({ title, subtitle, icon, isLinkingRequired }) => (
          <FeatureCard key={title} title={title} subtitle={subtitle} icon={icon} isLinkingRequired={isLinkingRequired} />
        ))}
      </div>

      <div className='flex justify-center w-full'>
        <div className='flex flex-col justify-center gap-7 text-xs mb-8 items-center max-w-[192px] min-[386px]:max-w-[368px] sm:max-w-[564px] md:max-w-[596px] min-[824px]:max-w-[786px] lg:max-w-[968px] xl:max-w-[1178px]'>
          <h1 className='font-bold text-2xl px-6 sm:px-0'>Trending</h1>
          <Carousel tabs={['Movies', 'Series']} data={[trendingMovies, trendingSeries]} />
          <h1 className='font-bold text-2xl px-6 sm:px-0'>Popular</h1>
          <Carousel tabs={['Movies', 'Series', 'People']} data={[popularMovies, popularSeries, PopularPeople]} />
          <h1 className='font-bold text-2xl px-6 sm:px-0'>Top Rated</h1>
          <Carousel tabs={['Movies', 'Series']} data={[topRatedMovies, topRatedSeries]} />
          <h1 className='font-bold text-2xl px-6 sm:px-0'>Upcoming</h1>
          <Carousel tabs={['Up to 7 Days', 'This Month', 'This Year']} data={[upcomingWeeklyMovies, upcomingMonthlyMovies, upcomingYearlyMovies]} />
        </div>
      </div>
    </main>
  );
}
