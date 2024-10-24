import { IconHome, IconMoodSad } from '@tabler/icons-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className='flex min-h-[calc(100vh-162px)] w-full justify-center sm:min-h-[calc(100vh-154px)]'>
      <div className='my-20 h-fit rounded-md border-1 p-5 text-center'>
        <div>
          <IconMoodSad size={18} />
          <span className='text-2xl font-bold tracking-tight text-gray-700 sm:text-4xl'>Uh-oh!</span>
          <h2>404: Not Found</h2>
          <span className='mt-4 text-gray-500'>The requested page could not be found.</span>
          <Link
            href='/'
            className='flex items-center justify-center gap-x-2 rounded-lg border bg-gray-200 px-4 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 sm:w-auto'>
            <IconHome size={18} />
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
