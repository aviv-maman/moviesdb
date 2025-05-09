//https://tabler.io/icons/icon/upload
import type { SVGProps } from 'react';

const Upload: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='upload'
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
      <path d='M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2' />
      <path d='M7 9l5 -5l5 5' />
      <path d='M12 4l0 12' />
    </svg>
  );
};

export default Upload;
