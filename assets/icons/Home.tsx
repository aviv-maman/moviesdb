//https://tabler.io/icons/icon/home
import type { SVGProps } from 'react';

const Home: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='home'
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
      <path d='M5 12l-2 0l9 -9l9 9l-2 0' />
      <path d='M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7' />
      <path d='M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6' />
    </svg>
  );
};

export default Home;
