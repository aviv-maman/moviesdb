import Carousel from '@/components/Carousel';
import FeatureCard from '@/components/FeatureCard';
import { discoverMovies, getMovies } from '@/lib/api_movie_lists';
import { getPeople } from '@/lib/api_people_lists';
import { getSeries } from '@/lib/api_series_lists';
import { getTrendingItems } from '@/lib/api_trending';
import popularMoviesFallback from '@/lib/data/popular_movies.json';
import { features } from '@/lib/features-data';

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
    const backdropPath =
      popularMovies?.results?.[chosenNumber]?.backdrop_path ||
      popularMoviesFallback?.results?.[chosenNumber]?.backdrop_path;
    return `https://image.tmdb.org/t/p/${width}${backdropPath}`;
  };

  const [trendingMovies, trendingSeries] = await Promise.all([
    getTrendingItems({ type: 'movie' }),
    getTrendingItems({ type: 'tv' }),
  ]);
  const [popularMovies, popularSeries, PopularPeople] = await Promise.all([
    getMovies({ type: 'popular' }),
    getSeries({ type: 'popular' }),
    getPeople({ type: 'popular' }),
  ]);

  const [topRatedMovies, topRatedSeries] = await Promise.all([
    getMovies({ type: 'top_rated' }),
    getSeries({ type: 'top_rated' }),
  ]);
  const [upcomingWeeklyMovies, upcomingMonthlyMovies, upcomingYearlyMovies] = await Promise.all([
    discoverMovies({
      'primary_release_date.gte': new Date().toISOString().slice(0, 10),
      'primary_release_date.lte': new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    }),
    discoverMovies({
      'primary_release_date.gte': new Date().toISOString().slice(0, 10),
      'release_date.lte': new Date(getDateWithLastDayOfMonth()).toISOString().slice(0, 10),
    }),
    discoverMovies({
      'primary_release_date.gte': new Date().toISOString().slice(0, 10),
      year: new Date().getFullYear(),
    }),
  ]);

  return (
    <main className='animate-in mx-4 flex min-h-[calc(100vh-162px)] flex-col gap-7 sm:min-h-[calc(100vh-154px)]'>
      <div
        style={{ backgroundImage: `url(${backgroundLoader('w1280')})` }}
        className={`relative h-96 overflow-hidden bg-cover bg-no-repeat p-12 text-center`}>
        <div className='absolute inset-0 size-full overflow-hidden bg-gradient-to-b from-[#00000099] bg-fixed'>
          <div className='flex h-full items-center justify-center'>
            <p className='mx-auto my-12 text-center text-3xl !leading-tight text-white lg:text-4xl'>
              The easiest way to discover <strong>movies</strong> and <strong>series</strong>
            </p>
          </div>
        </div>
      </div>

      <div className='w-full bg-gradient-to-r from-transparent via-foreground/10 to-transparent p-px' />

      <div className='flex flex-col gap-8 px-6 text-foreground sm:px-0'>
        <h2 className='text-center text-lg font-bold text-slate-900 dark:text-white'>
          Everything you need to get started
        </h2>
      </div>

      <div className='flex w-full justify-center'>
        <div className='grid max-w-[192px] grid-cols-1 flex-col gap-4 text-foreground min-[389px]:max-w-[368px] sm:max-w-[564px] md:max-w-[596px] md:grid-cols-2 min-[825px]:max-w-[786px] lg:max-w-[968px] lg:grid-cols-4 xl:max-w-[1178px]'>
          {features.map(({ title, subtitle, icon, isLinkingRequired }) => (
            <FeatureCard
              key={title}
              title={title}
              subtitle={subtitle}
              icon={icon}
              isLinkingRequired={isLinkingRequired}
            />
          ))}
        </div>
      </div>

      <div className='flex w-full justify-center'>
        <div className='mb-8 flex max-w-[192px] flex-col items-center justify-center gap-7 text-xs min-[389px]:max-w-[368px] sm:max-w-[564px] md:max-w-[596px] min-[825px]:max-w-[786px] lg:max-w-[968px] xl:max-w-[1178px]'>
          <h1 className='px-6 text-2xl font-bold sm:px-0'>Trending</h1>
          <Carousel tabs={['Movies', 'Series']} data={[trendingMovies, trendingSeries]} />
          <h1 className='px-6 text-2xl font-bold sm:px-0'>Popular</h1>
          <Carousel tabs={['Movies', 'Series', 'People']} data={[popularMovies, popularSeries, PopularPeople]} />
          <h1 className='px-6 text-2xl font-bold sm:px-0'>Top Rated</h1>
          <Carousel tabs={['Movies', 'Series']} data={[topRatedMovies, topRatedSeries]} />
          <h1 className='px-6 text-2xl font-bold sm:px-0'>Upcoming</h1>
          <Carousel
            tabs={['Up to 7 Days', 'This Month', 'This Year']}
            data={[upcomingWeeklyMovies, upcomingMonthlyMovies, upcomingYearlyMovies]}
          />
        </div>
      </div>
    </main>
  );
}
