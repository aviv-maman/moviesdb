//https://tabler.io/icons/icon/movie
import type { SVGProps } from 'react';

const Movie: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='movie'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z' />
      <path d='M8 4l0 16' />
      <path d='M16 4l0 16' />
      <path d='M4 8l4 0' />
      <path d='M4 16l4 0' />
      <path d='M4 12l16 0' />
      <path d='M16 8l4 0' />
      <path d='M16 16l4 0' />
    </svg>
  );
};

export default Movie;
