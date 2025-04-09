'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowNarrowLeft, Home, Reload } from '@/assets/icons';
import type { ThrownErrorSWR } from '@/lib/generic.types';

export default function GlobalError({
  error,
  reset,
}: {
  error: (Error & { digest?: string }) | ThrownErrorSWR;
  reset: () => void;
}) {
  const router = useRouter();
  const statusCode = 'statusCode' in error ? error.statusCode : 500;
  const statusText = 'statusText' in error ? error.statusText : error.name;

  return (
    <html>
      <body>
        <main className='flex min-h-[calc(100vh-162px)] w-full justify-center sm:min-h-[calc(100vh-154px)]'>
          <div className='my-20 h-fit rounded-md border-1 p-5 text-center'>
            <div>
              <h1 className='text-8xl font-black text-gray-400 dark:text-gray-200'>{statusCode}</h1>
              <span className='text-2xl font-bold tracking-tight text-gray-700 sm:text-4xl'>Something went wrong!</span>
              <h2>{statusText}</h2>
              <span className='mt-4 text-gray-500'>{error.message}</span>
            </div>
            <div className='mt-6 flex items-center gap-x-3'>
              <button
                onClick={() => router.back()}
                className='flex items-center justify-center gap-x-2 rounded-lg border bg-gray-200 px-4 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 sm:w-auto'>
                <ArrowNarrowLeft className='size-[18px]' />
                Go back
              </button>
              <Link
                href='/'
                className='flex items-center justify-center gap-x-2 rounded-lg border bg-gray-200 px-4 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 sm:w-auto'>
                <Home className='size-[18px]' />
                Home
              </Link>
              <button
                onClick={() => reset()}
                className='flex items-center justify-center gap-x-2 rounded-lg border-1 border-blue-500 bg-blue-500 px-4 py-2 text-sm text-white transition-colors duration-200 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 sm:w-auto'>
                <Reload className='size-[18px]' />
                Try again
              </button>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
