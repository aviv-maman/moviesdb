'use client';
import { type FC } from 'react';
import SidebarSortBy from './SidebarSortBy';
import SidebarWhereToWatch from './SidebarWhereToWatch';
import SidebarFilters from './SidebarFilters';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AVAILABILITIES, GENRES, RELEASE_TYPES } from '@/lib/data/search_filters';
import ButtonCustom from './ButtonCustom';
import { IconSearch } from '@tabler/icons-react';

interface SidebarMenuProps {}

const SidebarMenu: FC<SidebarMenuProps> = ({}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(formData: FormData) {
    const params = new URLSearchParams(searchParams);
    const with_watch_providers = formData.getAll('with_watch_providers');
    const with_availabilities = formData.getAll('with_availabilities');
    const with_release_type = formData.getAll('with_release_type');
    const vote_average = formData.getAll('vote_average');
    const with_runtime = formData.getAll('with_runtime');
    const with_genres = formData.getAll('with_genres');
    const with_keywords = formData.getAll('with_keywords');
    Array.from(formData.entries()).forEach(([key, value]) => {
      if (value === '') {
        params.delete(key);
        return;
      }
      if (key === 'page') {
        params.delete(key);
        return;
      }
      if (key === 'sort_by' && value === 'popularity.desc') {
        params.delete(key);
        return;
      }
      if (key === 'vote_count.gte' && value === '0') {
        params.delete(key);
        return;
      }
      if (key === 'with_watch_providers') return;
      if (key === 'with_availabilities') return;
      if (key === 'with_release_type') return;
      if (key === 'with_genres') return;
      if (key === 'vote_average') return;
      if (key === 'with_runtime') return;
      if (key === 'with_keywords') return;
      if (key === 'show_me') return;
      params.set(key, value.toString());
    });

    if (0 < with_watch_providers.length) {
      params.set('with_watch_providers', String(with_watch_providers));
    } else {
      params.delete('with_watch_providers');
    }

    if (with_availabilities[0] !== 'all-availabilities' && with_availabilities.length !== AVAILABILITIES.length) {
      params.set('with_availabilities', String(with_availabilities));
    } else {
      params.delete('with_availabilities');
    }

    if (with_release_type[0] !== '0' && with_release_type.length !== RELEASE_TYPES.length) {
      params.set('with_release_type', String(with_release_type));
    } else {
      params.delete('with_release_type');
    }

    if (0 < with_genres.length && with_genres.length < GENRES.length) {
      params.set('with_genres', String(with_genres));
    } else {
      params.delete('with_genres');
    }

    if (Number(vote_average.at(0)) > 0) {
      params.set('vote_average.gte', String(vote_average.at(0)));
    } else {
      params.delete('vote_average.gte');
    }

    if (Number(vote_average.at(1)) < 10) {
      params.set('vote_average.lte', String(vote_average.at(1)));
    } else {
      params.delete('vote_average.lte');
    }

    if (Number(with_runtime.at(0)) > 0) {
      params.set('with_runtime.gte', String(with_runtime.at(0)));
    } else {
      params.delete('with_runtime.gte');
    }

    if (Number(with_runtime.at(1)) < 360) {
      params.set('with_runtime.lte', String(with_runtime.at(1)));
    } else {
      params.delete('with_runtime.lte');
    }

    if (0 < with_keywords.length && with_keywords[0] !== '') {
      params.set('with_keywords', String(with_keywords));
    } else {
      params.delete('with_keywords');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <aside id='logo-sidebar' className='min-[960px]:border-r border-gray-200 dark:border-neutral-800 p-4' aria-label='Sidebar'>
      <div className='h-full overflow-y-auto w-full min-[960px]:w-80'>
        <form action={handleSearch}>
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
            <ButtonCustom
              type='submit'
              label='Search'
              className='mt-4 w-full max-w-sm text-secondary-500 bg-secondary-200 dark:bg-secondary-300 dark:text-secondary-700'
              variant='shadow'
              startContent={<IconSearch size={18} />}
            />
          </div>
        </form>
      </div>
    </aside>
  );
};

export default SidebarMenu;
