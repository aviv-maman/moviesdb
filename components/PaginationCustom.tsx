'use client';

import { Pagination, type PaginationProps } from '@nextui-org/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const PaginationCustom: React.FC<PaginationProps> = ({ page, total, ...props }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const changePage = (page: number) => {
    router.push(pathname + '?' + createQueryString('page', String(page)));
  };

  return (
    <Pagination showControls variant='bordered' showShadow total={total} page={page} onChange={changePage} {...props} />
  );
};

export default PaginationCustom;
