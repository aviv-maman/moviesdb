'use server';

import CarouselCredits from '@/components/CarouselCredits';
import RateItemDropdown from '@/components/RateItemDropdown';
import SearchResultBadge from '@/components/SearchResultBadge';
import { getMovieById } from '@/lib/api_movies';
import { Button, CircularProgress, Image } from '@nextui-org/react';
import { IconHeart, IconList } from '@tabler/icons-react';

interface MoviePageProps {
  params: { id: string };
}

const MoviePage: React.FC<MoviePageProps> = async ({ params }) => {
  const id = Number(params?.id);
  const { movie } = await getMovieById({ movie_id: id, append_to_response: 'credits,external_ids' });

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

  const imgClasses = 'z-0 w-full rounded-md object-cover w-auto h-full min-w-auto min-h-[calc(100vh-162px)] sm:min-h-[calc(100vh-154px)]';

  return (
    <main className='animate-in w-full block m-auto justify-center min-h-fit'>
      <div className='mx-auto justify-center'>
        <div style={{ backgroundImage: `url(${movieItem?.backdrop_path})` }} className='relative bg-cover bg-no-repeat w-full h-full'>
          <div className='overflow-hidden bg-fixed' style={{ backgroundColor: 'rgba(118, 183, 236, 0.5)' }}>
            <div className='block md:flex p-8'>
              <Image
                src={movieItem?.poster_path}
                alt={movieItem?.title}
                className={`${movieItem?.poster_path === './no-image.svg' && 'p-4'} ${imgClasses}`}
              />
              <div className='block mx-4'>
                <h1 className='my-2 sm:mb-4 text-4xl sm:text-6xl font-bold text-slate-900 dark:text-white'>{movieItem?.title}</h1>
                <div className='flex gap-x-1 items-center mb-2'>
                  <SearchResultBadge
                    label={`${movieItem?.release_date?.slice(0, 4)} • ${movieItem?.runtime}`}
                    className='font-sans rounded-md h-fit'
                    color='sky'
                    textSize='text-md'
                  />
                  <div className='flex gap-x-1'>
                    {movieItem?.genres?.map((genre, index) => (
                      <SearchResultBadge key={index} label={genre} className='rounded-md' color='pink' textSize='text-sm' />
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
                    className='text-white'
                  />
                  <Button isIconOnly aria-label='Like'>
                    <IconHeart />
                  </Button>
                  <RateItemDropdown />
                  <Button isIconOnly aria-label='List'>
                    <IconList />
                  </Button>
                </div>
                <p className='text-md my-2'>{movieItem?.overview}</p>
                <div className='flex gap-x-1'>
                  {movieItem?.external_ids?.imdb_id && (
                    <a
                      href={`https://www.imdb.com/title/${movieItem?.external_ids?.imdb_id}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='rounded-md bg-yellow-500 text-white px-2 py-1'>
                      IMDB
                    </a>
                  )}
                  {movieItem?.homepage && (
                    <a href={movieItem?.homepage} target='_blank' rel='noopener noreferrer' className='rounded-md bg-yellow-500 text-white px-2 py-1'>
                      Homepage
                    </a>
                  )}
                </div>
                <div className='flex gap-x-1'>
                  {movieItem?.spoken_languages?.map((lang, index) => (
                    <SearchResultBadge key={index} label={lang} className='rounded-md' color='yellow' textSize='text-sm' />
                  ))}
                </div>
              </div>
            </div>

            <div className='flex flex-col mx-auto justify-center text-xs mb-8 sm:w-full md:w-2/3 lg:w-2/3 xl:w-1/2 2xl:w-1/2'>
              <h1 className='font-bold text-2xl px-6 sm:px-0'>Credits</h1>
              <CarouselCredits data={movieItem?.credits} />
            </div>

            {/* <div className='flex gap-x-1'>
              {movieItem?.credits?.cast?.slice(0, 5).map((cast, index) => (
                <div key={index} className='flex flex-col items-center'>
                  <Image src={`https://image.tmdb.org/t/p/w185${cast.profile_path}`} alt={cast.name} className={`${imgClasses} rounded-md`} />
                  <p className='text-sm text-center'>{cast.name}</p>
                  <p className='text-xs text-center'>{cast.character}</p>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default MoviePage;
