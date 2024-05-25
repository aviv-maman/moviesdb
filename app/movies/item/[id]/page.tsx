'use server';

import ButtonHeart from '@/components/ButtonHeart';
import Carousel from '@/components/Carousel';
import CarouselCredits from '@/components/CarouselCredits';
import SearchResultBadge from '@/components/SearchResultBadge';
import { getMovieById } from '@/lib/api_movies';
import { CircularProgress, Image, Link } from '@nextui-org/react';

interface MoviePageProps {
  params: { id: string };
}

const MoviePage: React.FC<MoviePageProps> = async ({ params }) => {
  const id = Number(params?.id);
  const { movie } = await getMovieById({ movie_id: id, append_to_response: 'credits,external_ids,videos,recommendations' });

  const ratingColors: { [key: number]: 'danger' | 'warning' | 'success' | 'default' } = {
    0: 'danger',
    1: 'warning',
    2: 'success',
    3: 'default',
  };

  const movieItem = {
    ...movie,
    backdrop_path: `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${movie?.backdrop_path}`,
    poster_path: movie && 'poster_path' in movie ? `https://image.tmdb.org/t/p/w342${movie?.poster_path}` : './no-image.svg',
    genres: movie?.genres?.map((genre) => genre.name),
    spoken_languages: movie?.spoken_languages?.map((lang) => lang.english_name),
    runtime: `${Math.floor((movie?.runtime || 0) / 60)}h ${(movie?.runtime || 0) % 60}m`,
    ratingColor:
      ratingColors[movie && 'vote_average' in movie ? (Math.floor(movie?.vote_average) <= 4 ? 0 : Math.floor(movie?.vote_average) <= 7 ? 1 : 2) : 3],
    vote_average: movie && 'vote_average' in movie ? movie?.vote_average * 10 : 0,
  };

  return (
    <main className='animate-in w-full block m-auto justify-center min-h-[calc(100vh-162px)] sm:min-h-[calc(100vh-154px)]'>
      <div className='mx-auto justify-center'>
        <div style={{ backgroundImage: `url(${movieItem?.backdrop_path})` }} className='relative bg-cover bg-no-repeat w-full h-full'>
          <div className='overflow-hidden bg-fixed bg-white/20 dark:bg-black/50'>
            <div className='block md:flex p-8'>
              <Image
                src={movieItem?.poster_path}
                alt={movieItem?.title}
                width={342}
                height={513}
                className={`${movieItem?.poster_path === './no-image.svg' && 'p-4'} rounded-md`}
                classNames={{ wrapper: 'w-full flex' }}
                style={{ minWidth: 342, height: 513 }}
              />
              <div className='flex flex-col sm:mx-3 gap-y-2 pt-2 sm:pt-0'>
                <h1 className='text-4xl sm:text-6xl font-bold text-black dark:text-white'>{movieItem?.title}</h1>
                <div className='flex gap-x-1 items-center'>
                  <SearchResultBadge
                    label={`${movieItem?.release_date?.slice(0, 4)} • ${movieItem?.runtime}`}
                    className='font-sans rounded-md h-fit font-semibold'
                    color='cyan'
                    textSize='text-md'
                  />
                  <div className='flex gap-1'>
                    {movieItem?.genres?.map((genre, index) => (
                      <SearchResultBadge key={index} label={genre} className='rounded-md' color='indigo' textSize='text-sm' />
                    ))}
                  </div>
                </div>
                <div className='flex gap-x-1 items-center'>
                  <CircularProgress
                    aria-label='Vote average'
                    size='md'
                    value={movieItem?.vote_average}
                    color={movieItem?.ratingColor}
                    showValueLabel={true}
                    classNames={{ value: 'text-sm font-semibold' }}
                    strokeWidth={4}
                    valueLabel={Math.ceil(movieItem?.vote_average)}
                  />
                  <ButtonHeart mediaId={id} />
                  {movieItem?.external_ids?.imdb_id && (
                    <Link
                      isExternal
                      href={`https://www.imdb.com/title/${movieItem?.external_ids?.imdb_id}`}
                      color='foreground'
                      className='rounded-md px-2 py-1 border-1 border-gray-700 bg-yellow-400 hover:bg-yellow-400 text-gray-900'>
                      IMDB
                    </Link>
                  )}
                  {movieItem?.homepage && (
                    <Link
                      isExternal
                      href={movieItem?.homepage}
                      color='foreground'
                      className='rounded-md px-2 py-1 border-1 border-gray-700 bg-yellow-400 hover:bg-yellow-400 text-gray-900'>
                      Home
                    </Link>
                  )}
                </div>
                <div className='flex gap-x-1'>
                  {movieItem?.spoken_languages?.map((lang, index) => (
                    <SearchResultBadge
                      key={index}
                      label={lang}
                      className='rounded-md h-fit w-fit border text-black bg-neutral-200 dark:bg-neutral-700 border-neutral-400'
                      textSize='text-sm'
                    />
                  ))}
                </div>
                <p className='text-md text-wrap flex max-w-5xl rounded-sm p-1 pl-2 leading-snug backdrop-blur-3xl text-black dark:text-white'>
                  {movieItem?.overview}
                </p>
              </div>
            </div>

            <div className='flex justify-center w-full'>
              <div className='flex flex-col justify-center gap-7 text-xs mb-8 items-center max-w-[192px] min-[389px]:max-w-[368px] sm:max-w-[564px] md:max-w-[596px] min-[825px]:max-w-[786px] lg:max-w-[968px] xl:max-w-[1178px]'>
                <div className='relative w-full flex gap-4 py-6 overflow-x-auto'>
                  {movieItem?.videos?.results?.slice(0, 8).map((video, index) => (
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
                <h1 className='font-bold text-2xl px-6 sm:px-0 backdrop-blur-md'>Credits</h1>
                <CarouselCredits data={movieItem?.credits} />
                <h1 className='font-bold text-2xl px-6 sm:px-0 backdrop-blur-md'>Recommendations</h1>
                <Carousel data={[movieItem?.recommendations]} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MoviePage;
