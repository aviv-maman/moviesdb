//https://tabler.io/icons/icon/x
import type { SVGProps } from 'react';

const X: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='x'
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
      <path d='M18 6l-12 12' />
      <path d='M6 6l12 12' />
    </svg>
  );
};

export default X;
