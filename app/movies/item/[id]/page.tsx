'use server';

import SearchResultBadge from '@/components/SearchResultBadge';
import { getMovieById } from '@/lib/api_movies';
import { Image } from '@nextui-org/react';

interface MoviePageProps {
  params: { id: string };
}

const MoviePage: React.FC<MoviePageProps> = async ({ params }) => {
  const id = Number(params?.id);
  const { movie } = await getMovieById({ movie_id: id });
  const movieItem = {
    ...movie,
    backdrop_path: `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${movie?.backdrop_path}`,
    poster_path: movie && 'poster_path' in movie ? `https://image.tmdb.org/t/p/w342${movie?.poster_path}` : './no-image.svg',
    genres: movie?.genres?.map((genre) => genre.name),
    spoken_languages: movie?.spoken_languages?.map((lang) => lang.english_name),
    runtime: `${Math.floor((movie?.runtime || 0) / 60)}h ${(movie?.runtime || 0) % 60}m`,
  };
  const imgClasses = 'z-0 w-full rounded-md object-cover w-auto h-full min-w-auto min-h-full';

  return (
    <main className='animate-in w-full block m-auto justify-center min-h-fit'>
      <div className='mx-auto justify-center'>
        <div style={{ backgroundImage: `url(${movieItem?.backdrop_path})` }} className='relative bg-cover bg-no-repeat w-full h-full'>
          <div className='overflow-hidden bg-fixed' style={{ backgroundColor: 'rgba(118, 183, 236, 0.5)' }}>
            <div className='flex p-8'>
              <Image
                src={movieItem?.poster_path}
                alt={movieItem?.title}
                className={`${movieItem?.poster_path === './no-image.svg' && 'p-4'} ${imgClasses}`}
              />
              <div className='block mx-4'>
                <h1 className='mb-4 text-6xl font-bold text-slate-900 dark:text-white'>{movieItem?.title}</h1>
                <SearchResultBadge
                  label={`${movieItem?.release_date?.slice(0, 4)} • ${movieItem?.runtime}`}
                  className='font-sans rounded-md'
                  color='sky'
                  textSize='text-md'
                />
                <p className='text-md my-2'>{movieItem?.overview}</p>
                <div className='flex gap-x-1'>
                  {movieItem?.genres?.map((genre, index) => (
                    <SearchResultBadge key={index} label={genre} className='rounded-md' color='pink' textSize='text-sm' />
                  ))}
                </div>
                <div className='flex gap-x-1'>
                  <div className='flex flex-col items-center justify-center p-4'>
                    <span className='text-sm'>Rating</span>
                    <span className='text-2xl font-bold'>{(movieItem?.vote_average || 0) * 10}%</span>
                  </div>
                  <div className='flex flex-col items-center justify-center p-4'>
                    <span className='text-sm'>Votes</span>
                    <span className='text-2xl font-bold'>{movieItem?.vote_count}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MoviePage;
