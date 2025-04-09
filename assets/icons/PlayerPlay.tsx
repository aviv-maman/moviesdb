//https://tabler.io/icons/icon/player-play
import type { SVGProps } from 'react';

const PlayerPlay: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='player-play'
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
      <path d='M7 4v16l13 -8z' />
    </svg>
  );
};

export default PlayerPlay;
