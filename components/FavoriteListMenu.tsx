'use client';
import { type FC } from 'react';
import { Listbox, ListboxItem } from '@nextui-org/react';
import { IconTopologyStar, IconUserCog } from '@tabler/icons-react';
import { useProfile } from '@/context/ProfileContext';

interface FavoriteListMenuProps {}

const FavoriteListMenu: FC<FavoriteListMenuProps> = ({}) => {
  const { dispatch } = useProfile();

  return (
    <div className='sm:w-full md:max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100 mr-0 md:mr-4 h-max sticky top-[82px] z-10 bg-content2 dark:bg-content1'>
      <Listbox aria-label='Actions' onAction={(key) => dispatch({ type: 'changed_active_favlist', payload: { value: key as 'movies' | 'series' } })}>
        <ListboxItem key='movies' startContent={<IconUserCog />}>
          Favorite Movies
        </ListboxItem>
        <ListboxItem key='series' startContent={<IconTopologyStar />}>
          Favorite Series
        </ListboxItem>
      </Listbox>
    </div>
  );
};

export default FavoriteListMenu;
