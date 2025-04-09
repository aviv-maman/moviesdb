//https://tabler.io/icons/icon/topology-star
import type { SVGProps } from 'react';

const TopologyStar: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='topology-star'
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
      <path d='M8 18a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z' />
      <path d='M20 6a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z' />
      <path d='M8 6a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z' />
      <path d='M20 18a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z' />
      <path d='M14 12a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z' />
      <path d='M7.5 7.5l3 3' />
      <path d='M7.5 16.5l3 -3' />
      <path d='M13.5 13.5l3 3' />
      <path d='M16.5 7.5l-3 3' />
    </svg>
  );
};

export default TopologyStar;
