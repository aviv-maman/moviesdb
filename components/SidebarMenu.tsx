import { type FC } from 'react';
import SidebarSortBy from './SidebarSortBy';
import SidebarWhereToWatch from './SidebarWhereToWatch';
import SidebarFilters from './SidebarFilters';
import SearchButton from './SearchButton';

interface SidebarMenuProps {}

const SidebarMenu: FC<SidebarMenuProps> = ({}) => {
  return (
    <aside id='logo-sidebar' className='min-[960px]:border-r border-gray-200 dark:border-neutral-800' aria-label='Sidebar'>
      <div className='h-full overflow-y-auto w-full min-[960px]:w-80 mr-4 mt-4'>
        <ul className='space-y-4 font-medium'>
          <li className='bg-foreground-50 rounded-medium'>
            <SidebarSortBy />
          </li>
          <li className='bg-foreground-50 rounded-medium'>
            <SidebarWhereToWatch />
          </li>
          <li className='bg-foreground-50 rounded-medium'>
            <SidebarFilters />
          </li>
        </ul>
        <div className='w-full flex justify-center'>
          <SearchButton />
        </div>
      </div>
    </aside>
  );
};

export default SidebarMenu;
