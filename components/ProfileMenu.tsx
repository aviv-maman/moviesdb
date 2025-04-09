'use client';

import { Listbox, ListboxItem } from '@heroui/react';
import { IconTopologyStar, IconUserCog } from '@tabler/icons-react';
import { useProfile } from '@/context/ProfileContext';

const ProfileMenu: React.FC = () => {
  const { dispatch } = useProfile();

  return (
    <div className='my-4 mr-0 rounded-small border-small border-default-200 px-1 py-2 dark:border-default-100 sm:w-full md:my-0 md:mr-4 md:max-w-[260px]'>
      <Listbox
        aria-label='Actions'
        onAction={(key) =>
          dispatch({ type: 'changed_active_view', payload: { value: key as 'profile' | 'integrations' } })
        }>
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
