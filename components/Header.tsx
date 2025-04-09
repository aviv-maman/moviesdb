'use client';

import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Link,
  Navbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@heroui/react';
import { type User } from '@supabase/supabase-js';
import { IconSearch } from '@tabler/icons-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ButtonCustom from './ButtonCustom';
import DarkModeToggle from './DarkModeToggle';
import HeaderDropdown from './HeaderDropdown';
import Logo from './Logo';
import { useProfile } from '@/context/ProfileContext';
import type { MovieItem, SeriesItem } from '@/lib/api.types';
import { signOut } from '@/lib/auth';
import type { Profile } from '@/lib/database.types';
import { avatarDropItems, movieLinks, seriesLinks } from '@/lib/header-links';

type HeaderProps = {
  user?: User | null | undefined;
  profile?: Profile | null | undefined;
  favMovies?: MovieItem[];
  favSeries?: SeriesItem[];
};

const Header: React.FC<HeaderProps> = ({ user, profile, favMovies, favSeries }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const { dispatch } = useProfile();

  const handleSignOut = async () => {
    const error = await signOut();
    if (error) console.log('Error logging out:', error.message);
  };

  const handleSubmit = (formData: FormData) => {
    const params = new URLSearchParams(searchParams);
    const query = formData.get('query')?.toString();
    params.forEach((value, key) => {
      if (key !== 'query') {
        params.delete(key);
      }
    });
    if (query) {
      params.set('query', query);
    } else {
      params.delete('query');
    }
    push(`/search?${params.toString()}`);
  };

  useEffect(() => {
    dispatch({ type: 'changed_supabase_user', payload: { value: user ? user : null } });
    dispatch({ type: 'changed_supabase_profile', payload: { value: profile ? profile : null } });
    dispatch({ type: 'changed_favorite_movie', payload: { value: favMovies ? favMovies.map((item) => item.id) : [] } });
    dispatch({ type: 'changed_favorite_tv', payload: { value: favSeries ? favSeries.map((item) => item.id) : [] } });
  }, [dispatch, user, profile, favMovies, favSeries]);

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent justify='start'>
        <div onClick={() => push('/')} className='flex cursor-pointer items-center gap-3'>
          <Logo />
          <span className='hidden md:inline-block'>MoviesDB</span>
        </div>

        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className='sm:hidden' />

        <NavbarContent className='hidden gap-3 sm:flex'>
          <HeaderDropdown targetSegment='movies' links={movieLinks} />
          <HeaderDropdown targetSegment='series' links={seriesLinks} />
          {/* {navItems} */}
        </NavbarContent>
      </NavbarContent>

      <NavbarContent className='items-center' justify='end'>
        <form id='search-form' action={handleSubmit}>
          <Input
            id='query'
            name='query'
            aria-label='Search'
            classNames={{
              base: 'max-w-full sm:max-w-[15rem] h-max hidden md:block',
              input: 'text-small',
              inputWrapper: 'font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20 h-9',
            }}
            placeholder='Type to search...'
            size='sm'
            startContent={<IconSearch size={18} />}
            endContent={
              <ButtonCustom
                id='search-bar-btn-desk'
                type='submit'
                isIconOnly
                size='sm'
                variant='flat'
                color='primary'
                className='left-2 top-px h-9 w-12'>
                <IconSearch size={16} />
              </ButtonCustom>
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                const formElement = document.getElementById('search-form') as HTMLFormElement;
                formElement?.requestSubmit();
              }
            }}
            defaultValue={searchParams.get('query')?.toString()}
          />
        </form>

        {/*Mobile Menu*/}
        <Dropdown placement='bottom-end' className='md:hidden'>
          <DropdownTrigger className='md:hidden'>
            <IconSearch size={18} className='md:hidden' />
          </DropdownTrigger>
          <DropdownMenu aria-label='Search' variant='flat'>
            <DropdownItem key='search-dropdown' isReadOnly>
              <form id='search-form-mobile' action={handleSubmit}>
                <Input
                  id='query-mobile'
                  name='query'
                  classNames={{
                    base: 'max-w-full',
                    input: 'text-small',
                    inputWrapper: 'font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20 h-10',
                  }}
                  placeholder='Type to search...'
                  size='sm'
                  startContent={<IconSearch size={18} />}
                  endContent={
                    <ButtonCustom
                      id='search-bar-btn-mob'
                      type='submit'
                      isIconOnly
                      size='sm'
                      variant='flat'
                      color='primary'
                      className='left-2 top-px h-10 w-12'>
                      <IconSearch size={16} />
                    </ButtonCustom>
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const formElement = document.getElementById('search-form-mobile') as HTMLFormElement;
                      formElement?.requestSubmit();
                    }
                  }}
                  defaultValue={searchParams.get('query')?.toString()}
                />
              </form>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <DarkModeToggle />

        <Dropdown placement='bottom-end'>
          <DropdownTrigger>
            <Avatar
              isBordered
              as='button'
              className='transition-transform'
              color='default'
              name={undefined}
              size='sm'
              src={profile?.avatar_url || undefined}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label='Profile Actions' variant='flat'>
            {!user?.id
              ? avatarDropItems.guest.map((item) => (
                  <DropdownItem {...item} key={item.key}>
                    {item.textValue}
                  </DropdownItem>
                ))
              : avatarDropItems.user.map((item) => (
                  <DropdownItem
                    onPress={item.key === 'logout' ? handleSignOut : undefined}
                    description={item.key === 'profile' && user.email}
                    {...item}
                    key={item.key}>
                    {item.textValue}
                  </DropdownItem>
                ))}
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarMenu>
        <span className='bg-foreground-200 text-center font-semibold text-primary-600 dark:bg-foreground-100'>
          MOVIES
        </span>
        {movieLinks.map((item, index) => (
          <NavbarMenuItem key={`${index}-${item.label}`}>
            <Link
              className='h-9 w-full text-default-900 dark:text-default-500'
              href={item.href}
              size='lg'
              onPress={() => setIsMenuOpen(false)}>
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
        <span className='bg-foreground-200 text-center font-semibold text-primary-600 dark:bg-foreground-100'>
          SERIES
        </span>
        {seriesLinks.map((item, index) => (
          <NavbarMenuItem key={`${index}-${item.label}`}>
            <Link
              className='h-9 w-full text-default-900 dark:text-default-500'
              href={item.href}
              size='lg'
              onPress={() => setIsMenuOpen(false)}>
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
