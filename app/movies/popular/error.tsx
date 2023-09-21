'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IconArrowNarrowLeft, IconHome, IconReload } from '@tabler/icons-react';
import type { ThrownErrorSWR } from '@/lib/generic.types';

export default function Error({ error, reset }: { error: Error | ThrownErrorSWR; reset: () => void }) {
  const router = useRouter();
  const statusCode = 'statusCode' in error ? error.statusCode : 404;
  const statusText = 'statusText' in error ? error.statusText : error.name;

  return (
    <div className='flex justify-center min-h-screen w-full'>
      <div className='text-center border-1 rounded-md p-5 h-fit my-20'>
        <div>
          <h1 className='font-black text-gray-400 dark:text-gray-200 text-8xl'>{statusCode}</h1>
          <span className='text-2xl font-bold tracking-tight text-gray-700 sm:text-4xl'>Uh-oh!</span>
          <h2>{statusText}</h2>
          <span className='mt-4 text-gray-500'>{error.message}</span>
        </div>
        <div className='flex items-center mt-6 gap-x-3'>
          <button
            onClick={() => router.back()}
            className='flex items-center justify-center px-4 py-2 text-sm text-gray-700 transition-colors duration-200 bg-gray-200 border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-300 dark:text-gray-200 dark:border-gray-700'>
            <IconArrowNarrowLeft size={18} />
            Go back
          </button>
          <Link
            href='/'
            className='flex items-center justify-center px-4 py-2 text-sm text-gray-700 transition-colors duration-200 bg-gray-200 border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-300 dark:text-gray-200 dark:border-gray-700'>
            <IconHome size={18} />
            Home
          </Link>
          <button
            onClick={() => reset()}
            className='flex items-center justify-center px-4 py-2 text-sm text-white transition-colors duration-200 bg-blue-500 border-1 border-blue-500 rounded-lg gap-x-2 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600'>
            <IconReload size={18} />
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
