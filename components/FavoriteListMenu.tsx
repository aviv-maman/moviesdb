'use client';

import { Listbox, ListboxItem } from '@heroui/react';
import { TopologyStar, UserCog } from '@/assets/icons';
import { useProfile } from '@/context/ProfileContext';

const FavoriteListMenu: React.FC = () => {
  const { dispatch } = useProfile();

  return (
    <div className='sticky top-[82px] z-10 mr-0 h-max rounded-small border-small border-default-200 bg-content2 px-1 py-2 dark:border-default-100 dark:bg-content1 sm:w-full md:mr-4 md:max-w-[260px]'>
      <Listbox
        aria-label='Actions'
        onAction={(key) => dispatch({ type: 'changed_active_favlist', payload: { value: key as 'movie' | 'tv' } })}>
        <ListboxItem key='movie' startContent={<UserCog />}>
          Favorite Movies
        </ListboxItem>
        <ListboxItem key='tv' startContent={<TopologyStar />}>
          Favorite Series
        </ListboxItem>
      </Listbox>
    </div>
  );
};

export default FavoriteListMenu;
