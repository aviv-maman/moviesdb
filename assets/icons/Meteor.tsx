//https://tabler.io/icons/icon/meteor
import type { SVGProps } from 'react';

const Meteor: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='meteor'
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
      <path d='M21 3l-5 9h5l-6.891 7.086a6.5 6.5 0 1 1 -8.855 -9.506l7.746 -6.58l-1 5l9 -5z' />
      <path d='M9.5 14.5m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0' />
    </svg>
  );
};

export default Meteor;
