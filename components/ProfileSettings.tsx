'use client';

import { useProfile } from '@/context/ProfileContext';
import { Avatar } from '@nextui-org/react';
import { IconMail, IconPencil, IconUser } from '@tabler/icons-react';
import { type FC } from 'react';

interface ProfileSettingsProps {}

const ProfileSettings: FC<ProfileSettingsProps> = ({}) => {
  const { state } = useProfile();

  return (
    <div className='block min-[640px]:flex bg-zinc-100 dark:bg-zinc-900 dark:text-gray-200 border-small rounded-small border-default-400 dark:border-default-100'>
      <div className='flex m-4'>
        <Avatar
          src={state.supabase_profile?.avatar_url || undefined}
          alt='avatar'
          className='p-4 w-28 h-28 md:w-32 md:h-32 mr-4'
          isBordered={false}
          radius='sm'
          size='lg'
        />
        <div className='flex flex-col space-y-4'>
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
      <div>
        <button className='text-gray-700 dark:text-gray-300 text-sm border rounded-lg p-2 duration-150 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center m-4'>
          <IconPencil size={20} className='mr-1' />
          <span>Edit</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
