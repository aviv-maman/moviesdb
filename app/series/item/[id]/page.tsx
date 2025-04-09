'use server';

import { CircularProgress, Image, Link } from '@heroui/react';
import ButtonHeart from '@/components/ButtonHeart';
import Carousel from '@/components/Carousel';
import CarouselCredits from '@/components/CarouselCredits';
import SearchResultBadge from '@/components/SearchResultBadge';
import { getSeriesById } from '@/lib/api_series';

interface SeriesPageProps {
  params: Promise<{ id: string }>;
}

const SeriesPage: React.FC<SeriesPageProps> = async ({ params }) => {
  const id = Number((await params).id);
  const { series } = await getSeriesById({
    series_id: id,
    append_to_response: 'credits,external_ids,videos,recommendations',
  });

  const ratingColors: { [key: number]: 'danger' | 'warning' | 'success' | 'default' } = {
    0: 'danger',
    1: 'warning',
    2: 'success',
    3: 'default',
  };

  const seriesItem = {
    ...series,
    backdrop_path: `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${series?.backdrop_path}`,
    poster_path:
      series && 'poster_path' in series ? `https://image.tmdb.org/t/p/w342${series?.poster_path}` : './no-image.svg',
    genres: series?.genres?.map((genre) => genre.name),
    spoken_languages: series?.spoken_languages?.map((lang) => lang.english_name),
    runtime: `${series?.number_of_seasons || 1} Seasons, ${series?.number_of_episodes || 1} Episodes`,
    ratingColor:
      ratingColors[
        series && 'vote_average' in series
          ? Math.floor(series?.vote_average) <= 4
            ? 0
            : Math.floor(series?.vote_average) <= 7
              ? 1
              : 2
          : 3
      ],
    vote_average: series && 'vote_average' in series ? series?.vote_average * 10 : 0,
    years:
      series?.status === 'Returning Series'
        ? `${series?.first_air_date?.slice(0, 4)}-`
        : series?.first_air_date?.slice(0, 4) === series?.last_air_date?.slice(0, 4)
          ? series?.first_air_date?.slice(0, 4)
          : `${series?.first_air_date?.slice(0, 4)}-${series?.last_air_date?.slice(0, 4)}`,
  };

  return (
    <main className='animate-in m-auto block min-h-[calc(100vh-162px)] w-full justify-center sm:min-h-[calc(100vh-154px)]'>
      <div className='mx-auto justify-center'>
        <div
          style={{ backgroundImage: `url(${seriesItem?.backdrop_path})` }}
          className='relative size-full bg-cover bg-no-repeat'>
          <div className='bg-white/20 bg-fixed dark:bg-black/50'>
            <div className='block p-8 md:flex'>
              <Image
                src={seriesItem?.poster_path}
                alt={seriesItem?.name}
                width={342}
                height={513}
                className={`${seriesItem?.poster_path === './no-image.svg' && 'p-4'} rounded-md`}
                classNames={{ wrapper: 'w-full flex' }}
                style={{ minWidth: 342, height: 513 }}
              />
              <div className='flex flex-col gap-y-2 pt-2 sm:mx-3 sm:pt-0'>
                <h1 className='text-4xl font-bold text-slate-900 dark:text-white sm:text-6xl'>{seriesItem?.name}</h1>
                <div className='flex flex-wrap items-center gap-x-1'>
                  <SearchResultBadge
                    label={`${seriesItem?.years}`}
                    className='h-fit rounded-md font-sans font-semibold'
                    color='cyan'
                    textSize='text-md'
                  />
                  <SearchResultBadge
                    label={`${seriesItem?.runtime}`}
                    className='h-fit rounded-md font-sans font-semibold'
                    color='cyan'
                    textSize='text-md'
                  />
                  <div className='mt-2 flex flex-wrap gap-1 sm:mt-0'>
                    {seriesItem?.genres?.map((genre, index) => (
                      <SearchResultBadge
                        key={index}
                        label={genre}
                        className='rounded-md'
                        color='indigo'
                        textSize='text-sm'
                      />
                    ))}
                  </div>
                </div>
                <div className='flex items-center gap-x-1'>
                  <CircularProgress
                    aria-label='Vote average'
                    size='md'
                    value={seriesItem?.vote_average}
                    color={seriesItem?.ratingColor}
                    showValueLabel={true}
                    classNames={{ value: 'text-sm font-semibold' }}
                    strokeWidth={4}
                    valueLabel={Math.ceil(seriesItem?.vote_average)}
                  />
                  <ButtonHeart mediaId={id} />
                  {seriesItem?.external_ids?.imdb_id && (
                    <Link
                      isExternal
                      href={`https://www.imdb.com/title/${seriesItem?.external_ids?.imdb_id}`}
                      color='foreground'
                      className='rounded-md border-1 border-gray-700 bg-yellow-400 px-2 py-1 text-gray-900 hover:bg-yellow-400'>
                      IMDB
                    </Link>
                  )}
                  {seriesItem?.homepage && (
                    <Link
                      isExternal
                      href={seriesItem?.homepage}
                      color='foreground'
                      className='rounded-md border-1 border-gray-700 bg-yellow-400 px-2 py-1 text-gray-900 hover:bg-yellow-400'>
                      Home
                    </Link>
                  )}
                </div>
                <div className='flex gap-x-1'>
                  {seriesItem?.spoken_languages?.map((lang, index) => (
                    <SearchResultBadge
                      key={index}
                      label={lang}
                      className='size-fit rounded-md border border-neutral-400 bg-neutral-200 text-black dark:bg-neutral-700'
                      textSize='text-sm'
                    />
                  ))}
                </div>
                <p className='flex max-w-5xl text-wrap rounded-sm p-1 pl-2 text-medium leading-snug backdrop-blur-3xl'>
                  {seriesItem?.overview}
                </p>
              </div>
            </div>

            <div className='flex w-full justify-center'>
              <div className='mb-8 flex max-w-[192px] flex-col items-center justify-center gap-7 text-xs min-[389px]:max-w-[368px] sm:max-w-[564px] md:max-w-[596px] min-[825px]:max-w-[786px] lg:max-w-[968px] xl:max-w-[1178px]'>
                <div className='relative flex w-full gap-4 overflow-x-auto py-6'>
                  {seriesItem?.videos?.results
                    ?.slice(0, 8)
                    .map((video, index) => (
                      <iframe
                        id={video.id}
                        key={`${video.id}-${index}`}
                        className='sm:h-[320px] sm:min-w-[540px]'
                        src={`https://www.${video.site}.com/embed/${video.key}?autoplay=1&origin=https://moviesdb-indol.vercel.app`}
                        title={video.name}
                        height={320}
                        width={640}
                        itemType='text/html'
                      />
                    ))}
                </div>

                <h1 className='px-6 text-2xl font-bold backdrop-blur-md sm:px-0'>Credits</h1>
                <CarouselCredits data={seriesItem?.credits} />
                <h1 className='px-6 text-2xl font-bold backdrop-blur-md sm:px-0'>Recommendations</h1>
                <Carousel data={[seriesItem?.recommendations]} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SeriesPage;
