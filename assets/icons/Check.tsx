//https://tabler.io/icons/icon/check
import type { SVGProps } from 'react';

const Check: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='check'
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
      <path d='M5 12l5 5l10 -10' />
    </svg>
  );
};

export default Check;
