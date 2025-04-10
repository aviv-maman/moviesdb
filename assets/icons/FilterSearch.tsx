//https://tabler.io/icons/icon/filter-search
import type { SVGProps } from 'react';

const FilterSearch: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='filter-search'
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
      <path d='M11.36 20.213l-2.36 .787v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414' />
      <path d='M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0' />
      <path d='M20.2 20.2l1.8 1.8' />
    </svg>
  );
};

export default FilterSearch;
