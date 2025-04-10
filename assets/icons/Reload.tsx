//https://tabler.io/icons/icon/reload
import type { SVGProps } from 'react';

const Reload: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='reload'
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
      <path d='M19.933 13.041a8 8 0 1 1 -9.925 -8.788c3.899 -1 7.935 1.007 9.425 4.747' />
      <path d='M20 4v5h-5' />
    </svg>
  );
};

export default Reload;
