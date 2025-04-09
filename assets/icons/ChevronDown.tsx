//https://tabler.io/icons/icon/chevron-down
import type { SVGProps } from 'react';

const ChevronDown: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='chevron-down'
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
      <path d='M6 9l6 6l6 -6' />
    </svg>
  );
};

export default ChevronDown;
