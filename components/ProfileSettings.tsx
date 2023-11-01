'use client';

import { useProfile } from '@/context/ProfileContext';
import { Avatar } from '@nextui-org/react';
import { IconMail, IconUser } from '@tabler/icons-react';
import { type FC } from 'react';

interface ProfileSettingsProps {}

const ProfileSettings: FC<ProfileSettingsProps> = ({}) => {
  const { state } = useProfile();

  return (
    <div className='flex w-full dark:bg-gray-900 dark:text-gray-100'>
      <div className='w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0'>
        <Avatar
          src={state.supabase_profile?.avatar_url || undefined}
          alt='avatar'
          className='w-full h-full'
          isBordered
          radius='sm'
          size='lg'
        />
      </div>
      <div className='flex flex-col space-y-4 mx-4'>
        <div>
          <h2 className='text-2xl font-semibold'>{state.supabase_profile?.full_name || 'Not set yet'}</h2>
          <span className='text-sm dark:text-gray-400'>{state.supabase_profile?.username || 'Not set yet'}</span>
        </div>
        <div className='space-y-1'>
          <span className='flex items-center space-x-1'>
            <IconMail size={20} />
            <span className='text-sm dark:text-gray-400'>{state.supabase_user?.email}</span>
          </span>
          <span className='flex items-center space-x-1'>
            <IconUser size={20} />
            <span className='text-sm dark:text-gray-400'>{state.supabase_profile?.tmdb_account_id}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
