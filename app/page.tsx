import Link from 'next/link';
import Carousel from '@/components/Carousel';
import FeatureCard from '@/components/FeatureCard';
import { features } from '@/lib/features-data';
import type { MovieListResponse, UpcomingMovieListResponse } from '@/lib/api.types';

import trendingMedia from '@/lib/data/trending-all.json';
import popularMovies from '@/lib/data/popular-movies.json';
import topMovies from '@/lib/data/top_rated-movies.json';
import upcomingMovies from '@/lib/data/upcoming-movies.json';

export const dynamic = 'force-dynamic';

export default async function Index() {
  const trendingData = trendingMedia as MovieListResponse;
  const popularMoviesData = popularMovies as MovieListResponse;
  const topMoviesData = topMovies as MovieListResponse;
  const upcomingMoviesData = upcomingMovies as UpcomingMovieListResponse;

  const backgroundLoader = (width: 'w300' | 'w780' | 'w1280' | 'original', index?: number) => {
    const chosenNumber = index || Math.floor(Math.random() * 19);
    return `https://image.tmdb.org/t/p/${width}${popularMoviesData.results[chosenNumber].backdrop_path}`;
  };

  return (
    <div className='w-full flex flex-col items-center'>
      <div className='flex flex-col gap-7 max-w-7xl'>
        <div
          style={{ backgroundImage: `url(${backgroundLoader('w1280')})` }}
          className={`relative overflow-hidden bg-cover bg-no-repeat p-12 text-center h-96`}
        >
          <div className='absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed bg-gradient-to-b from-[#00000099]'>
            <div className='flex h-full items-center justify-center'>
              <p className='text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center my-12 text-white'>
                The easiest way to discover <strong>movies</strong> and <strong>series</strong>
              </p>
            </div>
          </div>
        </div>

        <div className='w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent' />

        <div className='flex flex-col gap-8 text-foreground px-6 sm:px-0'>
          <h2 className='text-lg font-bold text-center text-slate-900 dark:text-white'>Everything you need to get started</h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-col text-foreground px-6 sm:px-0'>
          {features.map(({ title, subtitle, icon, isLinkingRequired }) => (
            <FeatureCard key={title} title={title} subtitle={subtitle} icon={icon} isLinkingRequired={isLinkingRequired} />
          ))}
        </div>

        <div className='justify-center flex flex-col gap-7 text-xs'>
          <h1 className='font-bold text-2xl px-6 sm:px-0'>Trending</h1>
          <Carousel tabs={['Today', 'This Week']} data={[trendingData, trendingData]} />
          <h1 className='font-bold text-2xl px-6 sm:px-0'>Popular</h1>
          <Carousel
            tabs={['All', 'Streaming', 'On TV', 'In Theaters']}
            data={[popularMoviesData, topMoviesData, popularMoviesData, topMoviesData]}
          />
          <h1 className='font-bold text-2xl px-6 sm:px-0'>Top Rated</h1>
          <Carousel tabs={['Movies', 'Series']} data={[topMoviesData, topMoviesData]} />
          <h1 className='font-bold text-2xl px-6 sm:px-0'>Upcoming</h1>
          <Carousel
            tabs={['Up to 7 days', 'This Month', 'This Year']}
            data={[upcomingMoviesData, upcomingMoviesData, upcomingMoviesData]}
          />
          <p className='text-center'>
            Created by{' '}
            <Link href='https://www.linkedin.com/in/aviv-maman-914a95223' target='_blank' className='font-bold'>
              Aviv Maman
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
