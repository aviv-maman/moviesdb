import { type FC } from 'react';

interface PopularMoviesProps {}

const PopularMovies: FC<PopularMoviesProps> = ({}) => {
  return (
    <div className='w-full flex flex-col items-center'>
      <div className='animate-in flex flex-col gap-7 max-w-7xl'>Popular Movies</div>
    </div>
  );
};

export default PopularMovies;
