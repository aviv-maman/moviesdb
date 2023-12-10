import { IconHome, IconMoodSad } from '@tabler/icons-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className='flex justify-center min-h-screen w-full'>
      <div className='text-center border-1 rounded-md p-5 h-fit my-20'>
        <div>
          <IconMoodSad size={18} />
          <span className='text-2xl font-bold tracking-tight text-gray-700 sm:text-4xl'>Uh-oh!</span>
          <h2>404: Not Found</h2>
          <span className='mt-4 text-gray-500'>The requested page could not be found.</span>
          <Link
            href='/'
            className='flex items-center justify-center px-4 py-2 text-sm text-gray-700 transition-colors duration-200 bg-gray-200 border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-300 dark:text-gray-200 dark:border-gray-700'>
            <IconHome size={18} />
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
