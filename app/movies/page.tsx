import { type FC } from 'react';

interface MoviesProps {}

const Movies: FC<MoviesProps> = ({}) => {
  return (
    <div className='w-full flex flex-col items-center'>
      <div className='animate-in flex flex-col gap-7 max-w-7xl'>Movies</div>
    </div>
  );
};

export default Movies;
