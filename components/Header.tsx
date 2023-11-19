'use client';
import { useState, type FC } from 'react';
import DarkModeToggle from './DarkModeToggle';
import { type User } from '@supabase/supabase-js';
import { IconSearch } from '@tabler/icons-react';
import {
  Navbar,
  NavbarContent,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@nextui-org/react';
import Logo from './Logo';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Profile } from '@/lib/database.types';
import HeaderDropdown from './HeaderDropdown';
import { mobileItems, movieLinks, seriesLinks } from '@/lib/header-links';
import ButtonCustom from './ButtonCustom';
import { signOut } from '@/lib/auth';

type HeaderProps = {
  user?: User | null | undefined;
  profile?: Profile | null | undefined;
};

const Header: FC<HeaderProps> = ({ user, profile }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchParams = useSearchParams();
  const { push } = useRouter();

  const handleSignOut = async () => {
    const error = await signOut();
    if (error) console.log('Error logging out:', error.message);
  };

  const handleSubmit = (formData: FormData) => {
    const params = new URLSearchParams(searchParams);
    const query = formData.get('query')?.toString();
    if (query) {
      params.set('query', query);
    } else {
      params.delete('query');
    }
    push(`/search?${params.toString()}`);
  };

  //   const handleSearch = (term: string) => {
  //     const params = new URLSearchParams(searchParams);
  //     if (term) {
  //       params.set('query', term);
  //     } else {
  //       params.delete('query');
  //     }
  //     push(`/search?${params.toString()}`);
  //   };

  return (
    <Navbar isBordered onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent justify='start'>
        <div onClick={() => push('/')} className='cursor-pointer flex items-center gap-3'>
          <Logo />
          <span className='hidden md:inline-block'>RottenPopcorn</span>
        </div>

        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className='sm:hidden' />

        <NavbarContent className='hidden sm:flex gap-3'>
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
                type='submit'
                isIconOnly
                size='sm'
                variant='flat'
                color='primary'
                className='h-9 w-12 left-3 top-[1px]'
              >
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
            defaultValue={searchParams.get('query') || ''}
          />
        </form>

        <Dropdown placement='bottom-end' className='md:hidden'>
          <DropdownTrigger className='md:hidden'>
            <IconSearch size={18} />
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
                    inputWrapper: 'font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
                  }}
                  placeholder='Type to search...'
                  size='sm'
                  startContent={<IconSearch size={18} />}
                  endContent={
                    <ButtonCustom
                      type='submit'
                      isIconOnly
                      size='sm'
                      variant='flat'
                      color='primary'
                      className='h-12 w-14 left-3 top-[1px]'
                    >
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
                  defaultValue={searchParams.get('query') || ''}
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
              name={profile?.full_name || undefined}
              size='sm'
              src={profile?.avatar_url || undefined}
            />
          </DropdownTrigger>
          {!user?.id ? (
            <DropdownMenu aria-label='Profile Actions' variant='flat'>
              <DropdownItem key='login' textValue='Login' onClick={() => push('/login')}>
                Login
              </DropdownItem>
              <DropdownItem key='about' textValue='About'>
                About
              </DropdownItem>
            </DropdownMenu>
          ) : (
            <DropdownMenu aria-label='Profile Actions' variant='flat'>
              <DropdownItem key='profile' textValue='Profile' className='h-14 gap-2' onClick={() => push('/profile')}>
                <p className='font-semibold'>Signed in as</p>
                <p className='font-semibold'>{user.email}</p>
              </DropdownItem>
              <DropdownItem key='about' textValue='About'>
                About
              </DropdownItem>
              <DropdownItem key='logout' textValue='Logout' color='danger' onClick={handleSignOut}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          )}
        </Dropdown>
      </NavbarContent>

      <NavbarMenu>
        {mobileItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={index === 2 ? 'primary' : index === mobileItems.length - 1 ? 'danger' : 'foreground'}
              className='w-full'
              href='#'
              size='lg'
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
