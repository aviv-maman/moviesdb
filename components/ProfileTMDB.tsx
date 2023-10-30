'use client';

import { Suspense, type FC, useEffect } from 'react';
import { handleLinkAccount, handleUnlinkAccount } from '@/app/profile/page';
import ButtonCustom from './ButtonCustom';
import { IconId, IconLink, IconUnlink } from '@tabler/icons-react';
import { useProfile } from '@/context/ProfileContext';
import useSWR from 'swr';
import type { TmdbProfile } from '@/lib/api.types';
import { Image } from '@nextui-org/react';

interface ProfileTMDBProps {}

const ProfileTMDB: FC<ProfileTMDBProps> = ({}) => {
  const { dispatch, state } = useProfile();

  const options: RequestInit = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_ACCESS_AUTH_TOKEN}`,
    },
    next: { revalidate: 3600 },
  };

  const {
    data: tmdb_profile,
    error,
    isValidating,
    isLoading,
  } = useSWR<TmdbProfile, Error>(
    state.supabase_profile?.tmdb_session_id ? { url: `/api/tmdb-profile`, options } : null
  );

  useEffect(() => {
    dispatch({ type: 'changed_tmdb_profile', payload: { value: tmdb_profile ? tmdb_profile : null } });
  }, [dispatch, tmdb_profile]);

  return (
    <div className='max-w-md p-8 sm:flex sm:space-x-6 dark:bg-gray-900 dark:text-gray-100'>
      <Suspense>
        <div className='flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0'>
          <Image
            src={
              tmdb_profile?.avatar?.tmdb?.avatar_path ||
              `https://www.gravatar.com/avatar/${tmdb_profile?.avatar.gravatar.hash}`
            }
            alt='profile picture'
            className='object-cover object-center w-full h-full rounded dark:bg-gray-500'
            isLoading={isLoading || isValidating}
          />
        </div>
        <div className='flex flex-col space-y-4'>
          <div>
            <h2 className='text-2xl font-semibold'>{tmdb_profile?.name}</h2>
            <span className='text-sm dark:text-gray-400'>@{tmdb_profile?.username}</span>
          </div>
          <div className='space-y-1'>
            <span className='flex items-center space-x-2'>
              <IconId size={18} />
              <span className='dark:text-gray-400'>{tmdb_profile?.id}</span>
            </span>
          </div>
        </div>
      </Suspense>

      <form action={handleLinkAccount}>
        <Suspense
          fallback={
            <ButtonCustom
              label='Link Account'
              color='secondary'
              variant='solid'
              startContent={<IconLink />}
              isLoading
            />
          }
        >
          <ButtonCustom
            label={state.supabase_profile?.tmdb_session_id ? 'Unlink Account' : 'Link Account'}
            color='secondary'
            variant='solid'
            startContent={state.supabase_profile?.tmdb_session_id ? <IconUnlink /> : <IconLink />}
            formAction={state.supabase_profile?.tmdb_session_id ? handleUnlinkAccount : handleLinkAccount}
            type='submit'
          />
        </Suspense>
      </form>
    </div>
  );
};

export default ProfileTMDB;
