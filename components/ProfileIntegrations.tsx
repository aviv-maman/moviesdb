'use client';

import { Image, Spinner } from '@heroui/react';
import { IconPlugConnected, IconPlugConnectedX } from '@tabler/icons-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { useProfile } from '@/context/ProfileContext';
import { handleLinkAccount, handleUnlinkAccount } from '@/lib/api_profile';

const ProfileIntegrations: React.FC = () => {
  const { state } = useProfile();

  return (
    <div className='w-full dark:text-gray-100'>
      <div className='mb-4'>
        <h1 className='text-lg font-extrabold'>Integrations</h1>
        <p className='text-sm text-orange-600 dark:text-orange-500'>
          Extend your experience by connecting to other services.
        </p>
      </div>
      <div className='max-w-sm rounded-lg border'>
        <div className='flex items-start justify-between p-4'>
          <div className='space-y-2'>
            <Image src='./tmdb48.jpg' alt='tmdb' className='inline-block h-12 rounded-none' width={'48'} />
            <h4 className='font-semibold'>{'The Movie Database (TMDB)'}</h4>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              One of the largest databases of movies and series.
            </p>
          </div>
          <form action={handleLinkAccount}>
            <Suspense fallback={<Spinner />}>
              <button
                className='flex items-center rounded-lg border p-2 text-sm text-gray-600 duration-150 hover:bg-gray-200 dark:text-gray-300 hover:dark:bg-gray-700'
                formAction={state.supabase_profile?.tmdb_session_id ? handleUnlinkAccount : handleLinkAccount}
                type='submit'>
                {state.supabase_profile?.tmdb_session_id ? (
                  <IconPlugConnectedX size={20} className='mr-1' />
                ) : (
                  <IconPlugConnected size={20} className='mr-1' />
                )}
                <span>{state.supabase_profile?.tmdb_session_id ? 'Unlink' : 'Link'}</span>
              </button>
            </Suspense>
          </form>
        </div>
        <div className='border-t p-3'>
          <Link
            href='https://www.themoviedb.org/settings/sessions/api'
            className='text-sm font-medium text-indigo-600 hover:text-indigo-500'
            target='_blank'
            rel='noopener noreferrer'>
            View integration
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileIntegrations;
