//https://tabler.io/icons/icon/star-off
import type { SVGProps } from 'react';

const StarOff: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='star-off'
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
      <path d='M3 3l18 18' />
      <path d='M10.012 6.016l1.981 -4.014l3.086 6.253l6.9 1l-4.421 4.304m.012 4.01l.588 3.426l-6.158 -3.245l-6.172 3.245l1.179 -6.873l-5 -4.867l6.327 -.917' />
    </svg>
  );
};

export default StarOff;
