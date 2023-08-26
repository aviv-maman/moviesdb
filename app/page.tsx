import Link from 'next/link';
import Carousel from '@/components/Carousel';

import trendingMedia from '@/lib/dummy-data/trending-all.json';
import popularMovies from '@/lib/dummy-data/popular-movies.json';
import topMovies from '@/lib/dummy-data/top_rated-movies.json';
import upcomingMovies from '@/lib/dummy-data/upcoming-movies.json';
import type { ListResponse, UpcomingListResponse } from '@/lib/api.types';
import FeatureCard from '@/components/FeatureCard';
import { features, resources } from '@/lib/features-data';

export const dynamic = 'force-dynamic';

export default async function Index() {
  const trendingData = trendingMedia as ListResponse;
  const popularMoviesData = popularMovies as ListResponse;
  const topMoviesData = topMovies as ListResponse;
  const upcomingMoviesData = upcomingMovies as UpcomingListResponse;

  const backgroundLoader = (width: 'w300' | 'w780' | 'w1280' | 'original', index?: number) => {
    const chosenNumber = index || Math.floor(Math.random() * 19);
    return `https://image.tmdb.org/t/p/${width}${popularMoviesData.results[chosenNumber].backdrop_path}`;
  };

  return (
    <div className='w-full flex flex-col items-center'>
      <div className='animate-in flex flex-col gap-7 max-w-7xl'>
        <div
          style={{ backgroundImage: `url(${backgroundLoader('w1280')})` }}
          className={`relative overflow-hidden bg-cover bg-no-repeat p-12 text-center h-96`}>
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
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
            {resources.map(({ title, subtitle, url, icon }) => (
              <a
                key={title}
                className='relative flex flex-col group rounded-lg border p-6 hover:border-sky-400'
                href={url}
                target='_blank'
                rel='noreferrer'>
                <h3 className='font-bold mb-2  min-h-[40px] lg:min-h-[60px] text-slate-900 dark:text-white'>{title}</h3>
                <div className='flex flex-col grow gap-4 justify-between text-slate-500 dark:text-slate-400'>
                  <p className='text-sm opacity-70'>{subtitle}</p>
                  <div className='flex justify-between items-center'>
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      className='opacity-80 group-hover:opacity-100'>
                      <path d={icon} stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                    </svg>

                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all'>
                      <polyline points='9 18 15 12 9 6' />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {features.map(({ title, subtitle, icon }) => (
            <FeatureCard key={title} title={title} subtitle={subtitle} icon={icon} />
          ))}
        </div>

        <div className='justify-center flex flex-col gap-7 text-xs'>
          <h1 className='font-bold text-2xl px-6 sm:px-0'>Trending</h1>
          <Carousel tabs={['Today', 'This Week']} data={[trendingData, trendingData]} />
          <h1 className='font-bold text-2xl px-6 sm:px-0'>Popular</h1>
          <Carousel tabs={['All', 'Streaming', 'On TV', 'In Theaters']} data={[popularMoviesData, topMoviesData, popularMoviesData, topMoviesData]} />
          <h1 className='font-bold text-2xl px-6 sm:px-0'>Top Rated</h1>
          <Carousel tabs={['Movies', 'Series']} data={[topMoviesData, topMoviesData]} />
          <h1 className='font-bold text-2xl px-6 sm:px-0'>Upcoming</h1>
          <Carousel data={[upcomingMoviesData]} />
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
