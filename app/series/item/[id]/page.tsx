'use server';

import ButtonHeart from '@/components/ButtonHeart';
import Carousel from '@/components/Carousel';
import CarouselCredits from '@/components/CarouselCredits';
import SearchResultBadge from '@/components/SearchResultBadge';
import { getSeriesById } from '@/lib/api_series';
import { CircularProgress, Image, Link } from '@nextui-org/react';

interface SeriesPageProps {
  params: { id: string };
}

const SeriesPage: React.FC<SeriesPageProps> = async ({ params }) => {
  const id = Number(params?.id);
  const { series } = await getSeriesById({ series_id: id, append_to_response: 'credits,external_ids,videos,recommendations' });

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
          <div className='bg-fixed bg-white/20 dark:bg-black/50'>
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
              <div className='flex flex-col sm:mx-3 gap-y-2 pt-2 sm:pt-0'>
                <h1 className='text-4xl sm:text-6xl font-bold text-slate-900 dark:text-white'>{seriesItem?.name}</h1>
                <div className='flex gap-x-1 items-center flex-wrap'>
                  <SearchResultBadge
                    label={`${seriesItem?.years}`}
                    className='font-sans rounded-md h-fit font-semibold'
                    color='cyan'
                    textSize='text-md'
                  />
                  <SearchResultBadge
                    label={`${seriesItem?.runtime}`}
                    className='font-sans rounded-md h-fit font-semibold'
                    color='cyan'
                    textSize='text-md'
                  />
                  <div className='flex gap-1 flex-wrap mt-2 sm:mt-0'>
                    {seriesItem?.genres?.map((genre, index) => (
                      <SearchResultBadge key={index} label={genre} className='rounded-md' color='indigo' textSize='text-sm' />
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
                  {seriesItem?.external_ids?.imdb_id && (
                    <Link
                      isExternal
                      underline='hover'
                      href={`https://www.imdb.com/title/${seriesItem?.external_ids?.imdb_id}`}
                      color='foreground'
                      className='rounded-md px-2 py-1 border-1 border-gray-700 bg-yellow-400 hover:bg-yellow-100 hover:dark:bg-yellow-400 dark:text-gray-900'>
                      IMDB
                    </Link>
                  )}
                  {seriesItem?.homepage && (
                    <Link
                      isExternal
                      href={seriesItem?.homepage}
                      color='foreground'
                      underline='hover'
                      className='rounded-md px-2 py-1 border-1 border-gray-700 bg-yellow-400 hover:bg-yellow-100 hover:dark:bg-yellow-400 dark:text-gray-900'>
                      Home
                    </Link>
                  )}
                </div>
                <div className='flex gap-x-1'>
                  {seriesItem?.spoken_languages?.map((lang, index) => (
                    <SearchResultBadge
                      key={index}
                      label={lang}
                      className='rounded-md h-fit w-fit border text-black bg-neutral-200 dark:bg-neutral-700 border-neutral-400'
                      textSize='text-sm'
                    />
                  ))}
                </div>
                <p className='text-md text-wrap flex max-w-5xl rounded-sm p-1 pl-2 leading-snug backdrop-blur-3xl'>{seriesItem?.overview}</p>
              </div>
            </div>

            <div className='flex justify-center w-full'>
              <div className='flex flex-col justify-center gap-7 text-xs mb-8 items-center max-w-[192px] min-[389px]:max-w-[368px] sm:max-w-[564px] md:max-w-[596px] min-[825px]:max-w-[786px] lg:max-w-[968px] xl:max-w-[1178px]'>
                <div className='relative w-full flex gap-4 py-6 overflow-x-auto'>
                  {seriesItem?.videos?.results?.slice(0, 16).map((video, index) => (
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

                <h1 className='font-bold text-2xl px-6 sm:px-0'>Credits</h1>
                <CarouselCredits data={seriesItem?.credits} />
                <h1 className='font-bold text-2xl px-6 sm:px-0'>Recommendations</h1>
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
