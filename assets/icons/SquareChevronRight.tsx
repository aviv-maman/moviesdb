//https://tabler.io/icons/icon/square-chevron-right
import type { SVGProps } from 'react';

const SquareChevronRight: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='square-chevron-right'
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
      <path d='M11 9l3 3l-3 3' />
      <path d='M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z' />
    </svg>
  );
};

export default SquareChevronRight;
