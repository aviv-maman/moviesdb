'use client';

import { Button } from '@heroui/react';
import Link from 'next/link';
import { GitHub2, LinkedIn2 } from '@/assets/icons';

export default function Footer() {
  const establishedYear = 2023;
  const currentYear = new Date().getFullYear();
  const range = currentYear > establishedYear ? `${establishedYear}-${currentYear}` : `${establishedYear}`;

  return (
    <footer className='mx-auto border-t border-neutral-200 bg-neutral-100 px-6 dark:border-neutral-800 dark:bg-zinc-950'>
      <div className='flex flex-col items-center justify-between py-3 sm:py-6 md:flex-row'>
        <div className='pb-3 text-sm lg:pb-0'>
          <span>&copy; {range} MoviesDB. All rights reserved.</span>
        </div>
        <div className='flex items-center gap-1'>
          <Link href='https://github.com/aviv-maman/moviesdb' target='_blank' referrerPolicy='no-referrer'>
            <Button
              isIconOnly
              size='sm'
              aria-label='GitHub'
              variant='light'
              radius='full'
              className='rounded-md border border-neutral-300 dark:border-neutral-800'>
              <GitHub2 className='size-4 text-gray-600 dark:text-gray-300' />
            </Button>
          </Link>
          <Link href='https://www.linkedin.com/in/aviv-maman-914a95223' target='_blank' referrerPolicy='no-referrer'>
            <Button
              isIconOnly
              size='sm'
              aria-label='LinkedIn'
              variant='light'
              radius='full'
              className='rounded-md border border-neutral-300 dark:border-neutral-800'>
              <LinkedIn2 className='size-4 text-blue-600' />
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  );
}
