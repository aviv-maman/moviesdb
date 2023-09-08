import { type FC } from 'react';
import SidebarSortBy from './SidebarSortBy';
import SidebarWhereToWatch from './SidebarWhereToWatch';
import SidebarFilters from './SidebarFilters';
import SearchButton from './SearchButton';

interface SidebarMenuProps {}

const SidebarMenu: FC<SidebarMenuProps> = ({}) => {
  return (
    <aside id='logo-sidebar' className='border-r border-gray-200 dark:border-neutral-800' aria-label='Sidebar'>
      <div className='h-full overflow-y-auto bg-slate-200 dark:bg-slate-900 w-full min-[960px]:w-96'>
        <ul className='space-y-2 font-medium'>
          <li>
            <SidebarSortBy />
          </li>
          <li>
            <SidebarWhereToWatch />
          </li>
          <li>
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
