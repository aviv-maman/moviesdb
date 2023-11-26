'use client';

import { Button } from '@nextui-org/react';
import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';
import Link from 'next/link';

export default function Footer() {
  const establishedYear = 2023;
  const currentYear = new Date().getFullYear();
  const range = currentYear > establishedYear ? `${establishedYear}-${currentYear}` : `${establishedYear}`;

  return (
    <footer className='mx-auto px-6 border-neutral-200 dark:border-neutral-800 border-t bg-neutral-50 dark:bg-zinc-950'>
      <div className='flex flex-col items-center justify-between py-3 sm:py-6 md:flex-row'>
        <div className='text-sm pb-3 lg:pb-0'>
          <span>&copy; {range} Rotten Popcorn. All rights reserved.</span>
        </div>
        <div className='flex items-center gap-1'>
          <Link href='https://github.com/aviv-maman/rotten-popcorn' target='_blank' referrerPolicy='no-referrer'>
            <Button
              isIconOnly
              aria-label='GitHub'
              variant='light'
              radius='full'
              className='border border-neutral-300 dark:border-neutral-800'
            >
              <IconBrandGithub className='w-6 h-6 mx-2 text-gray-600 dark:text-gray-300' />
            </Button>
          </Link>
          <Link href='https://www.linkedin.com/in/aviv-maman-914a95223' target='_blank' referrerPolicy='no-referrer'>
            <Button
              isIconOnly
              aria-label='LinkedIn'
              variant='light'
              radius='full'
              className='border border-neutral-300 dark:border-neutral-800'
            >
              <IconBrandLinkedin className='w-6 h-6 mx-2 text-blue-600' />
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  );
}
