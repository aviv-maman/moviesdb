'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import ButtonCustom from './ButtonCustom';
import { SquareChevronLeft, SquareChevronRight } from '@/assets/icons';

interface LoadPageBtnProps {
  label?: 'Back' | 'Next';
  totalPages?: number;
}

const LoadPageBtn: React.FC<LoadPageBtnProps> = ({ totalPages = 0, label = 'Next' }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  const params = new URLSearchParams(searchParams);
  const page = Number(params.get('page')) || 1;

  const disabled = (label === 'Next' && page === totalPages) || (label === 'Back' && page === 1) || totalPages === 0;
  const disabledClassName = disabled || isPending ? 'opacity-50 cursor-not-allowed' : '';

  const loadPage = () => {
    if (label === 'Next' && !disabled) {
      params.set('page', String(page + 1));
      replace(`${pathname}?${params.toString()}`);
    } else if (label === 'Back' && !disabled) {
      params.set('page', String(page - 1));
      replace(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <ButtonCustom
      variant='ghost'
      color='secondary'
      label={label}
      startContent={label === 'Next' ? <SquareChevronRight /> : <SquareChevronLeft />}
      disabled={disabled || isPending}
      className={disabledClassName}
      onPress={() => startTransition(() => loadPage())}
    />
  );
};

export default LoadPageBtn;
