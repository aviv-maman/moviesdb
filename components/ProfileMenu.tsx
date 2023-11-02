'use client';

import { useProfile } from '@/context/ProfileContext';
import { Listbox, ListboxItem } from '@nextui-org/react';
import { IconTopologyStar, IconUserCog } from '@tabler/icons-react';
import { type FC } from 'react';

interface ProfileMenuProps {}

const ProfileMenu: FC<ProfileMenuProps> = ({}) => {
  const { dispatch } = useProfile();

  return (
    <div className='sm:w-full md:max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100 mr-0 md:mr-4 my-4 md:my-0'>
      <Listbox
        aria-label='Actions'
        onAction={(key) =>
          dispatch({ type: 'changed_active_view', payload: { value: key as 'profile' | 'integrations' } })
        }
      >
        <ListboxItem key='profile' startContent={<IconUserCog />}>
          Profile Settings
        </ListboxItem>
        <ListboxItem key='integrations' startContent={<IconTopologyStar />}>
          Integrations
        </ListboxItem>
      </Listbox>
    </div>
  );
};

export default ProfileMenu;
