'use client';
import { Suspense, type FC } from 'react';
import { handleLinkAccount, handleUnlinkAccount } from '@/app/profile/page';
import { IconPlugConnected, IconPlugConnectedX } from '@tabler/icons-react';
import { useProfile } from '@/context/ProfileContext';
import { Image, Spinner } from '@nextui-org/react';
import Link from 'next/link';

interface ProfileIntegrationsProps {}

const ProfileIntegrations: FC<ProfileIntegrationsProps> = ({}) => {
  const { state } = useProfile();

  return (
    <div className='dark:text-gray-100 w-full'>
      <div className='mb-4'>
        <h1 className='text-lg font-extrabold'>Integrations</h1>
        <p className='text-orange-600 dark:text-orange-500 text-sm'>Extend your experience by connecting to other services.</p>
      </div>
      <div className='border rounded-lg max-w-sm'>
        <div className='flex items-start justify-between p-4'>
          <div className='space-y-2'>
            <Image src='./tmdb48.jpg' alt='tmdb' className='inline-block h-12 rounded-none' width={'48'} />
            <h4 className='font-semibold'>{'The Movie Database (TMDB)'}</h4>
            <p className='text-gray-600 dark:text-gray-400 text-sm'>One of the largest databases of movies and series.</p>
          </div>
          <form action={handleLinkAccount}>
            <Suspense fallback={<Spinner />}>
              <button
                className='text-gray-600 dark:text-gray-300 text-sm border rounded-lg p-2 duration-150 hover:bg-gray-200 hover:dark:bg-gray-700 flex items-center'
                formAction={state.supabase_profile?.tmdb_session_id ? handleUnlinkAccount : handleLinkAccount}
                type='submit'
              >
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
        <div className='p-3 border-t'>
          <Link
            href='https://www.themoviedb.org/settings/sessions/api'
            className='text-indigo-600 hover:text-indigo-500 text-sm font-medium'
            target='_blank'
            rel='noopener noreferrer'
          >
            View integration
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileIntegrations;
