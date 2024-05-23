'use server';

import ButtonHeart from '@/components/ButtonHeart';
import CarouselCredits from '@/components/CarouselCredits';
import SearchResultBadge from '@/components/SearchResultBadge';
import { getSeriesById } from '@/lib/api_series';
import { CircularProgress, Image, Link } from '@nextui-org/react';

interface SeriesPageProps {
  params: { id: string };
}

const SeriesPage: React.FC<SeriesPageProps> = async ({ params }) => {
  const id = Number(params?.id);
  const { series } = await getSeriesById({ series_id: id, append_to_response: 'credits,external_ids' });

  const ratingColors: { [key: number]: 'danger' | 'warning' | 'success' | 'default' } = {
    0: 'danger',
    1: 'warning',
    2: 'success',
    3: 'default',
  };

  const seriesItem = {
    ...series,
    backdrop_path: `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${series?.backdrop_path}`,
    poster_path: series && 'poster_path' in series ? `https://image.tmdb.org/t/p/w342${series?.poster_path}` : './no-image.svg',
    genres: series?.genres?.map((genre) => genre.name),
    spoken_languages: series?.spoken_languages?.map((lang) => lang.english_name),
    runtime: `${series?.number_of_seasons || 1} Seasons, ${series?.number_of_episodes || 1} Episodes`,
    ratingColor:
      ratingColors[
        series && 'vote_average' in series ? (Math.floor(series?.vote_average) <= 4 ? 0 : Math.floor(series?.vote_average) <= 7 ? 1 : 2) : 3
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
    <main className='animate-in w-full block m-auto justify-center min-h-[calc(100vh-162px)] sm:min-h-[calc(100vh-154px)]'>
      <div className='mx-auto justify-center'>
        <div style={{ backgroundImage: `url(${seriesItem?.backdrop_path})` }} className='relative bg-cover bg-no-repeat w-full h-full'>
          <div className='bg-fixed' style={{ backgroundColor: 'rgba(118, 183, 236, 0.5)' }}>
            <div className='block md:flex p-8'>
              <Image
                src={seriesItem?.poster_path}
                alt={seriesItem?.name}
                width={342}
                height={513}
                className={`${seriesItem?.poster_path === './no-image.svg' && 'p-4'} rounded-md`}
                classNames={{ wrapper: 'w-full flex' }}
                style={{ minWidth: 342, height: 513 }}
              />
              <div className='flex flex-col sm:mx-3 gap-y-2'>
                <h1 className='text-4xl sm:text-6xl font-bold text-slate-900 dark:text-white'>{seriesItem?.name}</h1>
                <div className='flex gap-x-1 items-center flex-wrap'>
                  <SearchResultBadge
                    label={`${seriesItem?.years}`}
                    className='font-sans rounded-md h-fit font-semibold'
                    color='sky'
                    textSize='text-md'
                  />
                  <SearchResultBadge
                    label={`${seriesItem?.runtime}`}
                    className='font-sans rounded-md h-fit font-semibold'
                    color='sky'
                    textSize='text-md'
                  />
                  <div className='flex gap-x-1 flex-wrap'>
                    {seriesItem?.genres?.map((genre, index) => (
                      <SearchResultBadge key={index} label={genre} className='rounded-md' color='pink' textSize='text-sm' />
                    ))}
                  </div>
                </div>
                <div className='flex gap-x-1 items-center'>
                  <CircularProgress
                    aria-label='Vote average'
                    size='md'
                    value={seriesItem?.vote_average}
                    color={seriesItem?.ratingColor}
                    showValueLabel={true}
                    className='text-white'
                  />
                  <ButtonHeart mediaId={id} />
                </div>
                <div className='flex gap-x-1'>
                  {seriesItem?.spoken_languages?.map((lang, index) => (
                    <SearchResultBadge key={index} label={lang} className='rounded-md h-fit w-fit' color='yellow' textSize='text-sm' />
                  ))}
                </div>
                <p className='text-md text-wrap flex max-w-5xl'>{seriesItem?.overview}</p>
                <div className='flex flex-row gap-x-1 h-full'>
                  {seriesItem?.external_ids?.imdb_id && (
                    <Link
                      isExternal
                      showAnchorIcon
                      href={`https://www.imdb.com/title/${seriesItem?.external_ids?.imdb_id}`}
                      color='foreground'
                      className='rounded-md px-2 py-1 border-1 border-gray-700 bg-yellow-200 hover:bg-yellow-100 dark:bg-yellow-600 hover:dark:bg-yellow-400 dark:text-gray-900 h-fit self-end'>
                      IMDB
                    </Link>
                  )}
                  {seriesItem?.homepage && (
                    <Link
                      isExternal
                      showAnchorIcon
                      href={seriesItem?.homepage}
                      color='foreground'
                      className='rounded-md px-2 py-1 border-1 border-gray-700 bg-yellow-200 hover:bg-yellow-100 dark:bg-yellow-600 hover:dark:bg-yellow-400 dark:text-gray-900 h-fit self-end'>
                      Home page
                    </Link>
                  )}
                </div>
              </div>
            </div>

            <div className='flex flex-col mx-auto justify-center text-xs mb-8 sm:w-full md:w-2/3 lg:w-2/3 xl:w-1/2 2xl:w-1/2'>
              <h1 className='font-bold text-2xl px-6 sm:px-0'>Credits</h1>
              <CarouselCredits data={seriesItem?.credits} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SeriesPage;
