//https://tabler.io/icons/icon/mood-sad
import type { SVGProps } from 'react';

const MoodSad: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='sad'
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
      <path d='M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0' />
      <path d='M9 10l.01 0' />
      <path d='M15 10l.01 0' />
      <path d='M9.5 15.25a3.5 3.5 0 0 1 5 0' />
    </svg>
  );
};

export default MoodSad;
