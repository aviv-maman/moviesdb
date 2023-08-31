import { type FC } from 'react';
import SidebarSortBy from './SidebarSortBy';
import SidebarWhereToWatch from './SidebarWhereToWatch';
import SidebarFilters from './SidebarFilters';

interface SidebarMenuProps {}

const SidebarMenu: FC<SidebarMenuProps> = ({}) => {
  return (
    <aside id='logo-sidebar' className='sm:w-full md:w-64 p-4 border-r border-gray-200 dark:border-neutral-800' aria-label='Sidebar'>
      <div className='h-full overflow-y-auto bg-slate-200 dark:bg-slate-900'>
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
      </div>
    </aside>
  );
};

export default SidebarMenu;
