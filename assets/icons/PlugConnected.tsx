//https://tabler.io/icons/icon/plug-connected
import type { SVGProps } from 'react';

const PlugConnected: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='plug-connected'
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
      <path d='M7 12l5 5l-1.5 1.5a3.536 3.536 0 1 1 -5 -5l1.5 -1.5z' />
      <path d='M17 12l-5 -5l1.5 -1.5a3.536 3.536 0 1 1 5 5l-1.5 1.5z' />
      <path d='M3 21l2.5 -2.5' />
      <path d='M18.5 5.5l2.5 -2.5' />
      <path d='M10 11l-2 2' />
      <path d='M13 14l-2 2' />
    </svg>
  );
};

export default PlugConnected;
