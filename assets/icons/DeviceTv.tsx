//https://tabler.io/icons/icon/device-tv
import type { SVGProps } from 'react';

const DeviceTv: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='device-tv'
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
      <path d='M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z' />
      <path d='M16 3l-4 4l-4 -4' />
    </svg>
  );
};

export default DeviceTv;
