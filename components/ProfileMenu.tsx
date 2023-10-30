'use client';

import { useProfile } from '@/context/ProfileContext';
import { Listbox, ListboxItem } from '@nextui-org/react';
import { IconMovie, IconUserCog } from '@tabler/icons-react';
import { type FC } from 'react';

interface ProfileMenuProps {}

const ProfileMenu: FC<ProfileMenuProps> = ({}) => {
  const { dispatch } = useProfile();

  return (
    <div className='w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100'>
      <Listbox
        aria-label='Actions'
        onAction={(key) => dispatch({ type: 'changed_active_view', payload: { value: key as 'profile' | 'tmdb' } })}
      >
        <ListboxItem key='profile' startContent={<IconUserCog />}>
          Profile Settings
        </ListboxItem>
        <ListboxItem key='tmdb' startContent={<IconMovie />}>
          TMDB Account
        </ListboxItem>
      </Listbox>
    </div>
  );
};

export default ProfileMenu;
