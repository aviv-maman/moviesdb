//https://tabler.io/icons/icon/arrow-narrow-left
import type { SVGProps } from 'react';

const ArrowNarrowLeft: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='left'
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
      <path d='M5 12l14 0' />
      <path d='M5 12l4 4' />
      <path d='M5 12l4 -4' />
    </svg>
  );
};

export default ArrowNarrowLeft;
