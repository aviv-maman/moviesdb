//https://tabler.io/icons/icon/clock-down
import type { SVGProps } from 'react';

const ClockDown: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='clock-down'
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
      <path d='M20.984 12.535a9 9 0 1 0 -8.431 8.448' />
      <path d='M12 7v5l3 3' />
      <path d='M19 16v6' />
      <path d='M22 19l-3 3l-3 -3' />
    </svg>
  );
};

export default ClockDown;
