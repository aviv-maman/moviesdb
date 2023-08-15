'use client';

import { useState, type FC } from 'react';
import DarkModeToggle from './DarkModeToggle';
import { type User } from '@supabase/supabase-js';
import { IconMenu2, IconSearch, IconX } from '@tabler/icons-react';
import {
  Navbar,
  NavbarContent,
  NavbarItem,
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
import { useSelectedLayoutSegment } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Profile, Database } from '@/lib/database.types';

type HeaderProps = {
  user?: User | null | undefined;
  profile?: Profile | null | undefined;
};

const Header: FC<HeaderProps> = ({ user, profile }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeSegment = useSelectedLayoutSegment();
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [isLoading, setIsLoading] = useState(false);

  const navLinks = [
    { href: '/movies', label: 'Movies', targetSegment: 'movies' },
    { href: '/series', label: 'Series', targetSegment: 'series' },
    // { href: '/watch-list', label: 'Watch List', targetSegment: 'watch-list' },
  ];

  const headerItems = navLinks.map((link) => (
    <NavbarItem key={link.label} isActive={activeSegment === link.targetSegment}>
      <Link href={link.href} color={activeSegment === link.targetSegment ? 'primary' : 'foreground'}>
        {link.label}
      </Link>
    </NavbarItem>
  ));

  const menuItems = ['Profile', 'Help', 'About', 'Log Out'];

  const handleSignOut = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) console.log('Error logging out:', error.message);
    setIsLoading(false);
    router.refresh();
  };

  return (
    <Navbar isBordered onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent justify='start'>
        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className='sm:hidden' />
        <NavbarContent justify='start'>
          <div onClick={() => router.push('/')} className='cursor-pointer flex items-center gap-3'>
            <Logo />
            <span className='hidden md:inline-block'>RottenPopcorn</span>
          </div>
        </NavbarContent>
        <NavbarContent className='hidden sm:flex gap-3'>{headerItems}</NavbarContent>
      </NavbarContent>

      <NavbarContent className='items-center' justify='end'>
        <Input
          classNames={{
            base: 'max-w-full sm:max-w-[20rem] h-max hidden md:block',
            input: 'text-small',
            inputWrapper: 'font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
          }}
          placeholder='Type to search...'
          size='sm'
          startContent={<IconSearch size={18} />}
          type='search'
        />

        {/* <Button type='button' isIconOnly className='md:hidden' variant='faded'>
          <IconSearch size={18} />
        </Button> */}

        <Dropdown placement='bottom-end' className='md:hidden'>
          <DropdownTrigger className='md:hidden'>
            <IconSearch size={18} />
          </DropdownTrigger>
          <DropdownMenu aria-label='Search' variant='flat'>
            <DropdownItem key='search-dropdown' isReadOnly>
              <Input
                classNames={{
                  base: 'max-w-full',
                  input: 'text-small',
                  inputWrapper: 'font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
                }}
                placeholder='Type to search...'
                size='sm'
                startContent={<IconSearch size={18} />}
                type='search'
              />
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
              <DropdownItem key='login' onClick={() => router.push('/login')}>
                Login
              </DropdownItem>
              <DropdownItem key='help'>Help</DropdownItem>
              <DropdownItem key='about'>About</DropdownItem>
            </DropdownMenu>
          ) : (
            <DropdownMenu aria-label='Profile Actions' variant='flat' disabledKeys={[isLoading ? 'logout' : '']}>
              <DropdownItem key='profile' className='h-14 gap-2'>
                <p className='font-semibold'>Signed in as</p>
                <p className='font-semibold'>{user.email}</p>
              </DropdownItem>
              <DropdownItem key='help'>Help</DropdownItem>
              <DropdownItem key='about'>About</DropdownItem>
              <DropdownItem key='logout' color='danger' onClick={handleSignOut}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          )}
        </Dropdown>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link color={index === 2 ? 'primary' : index === menuItems.length - 1 ? 'danger' : 'foreground'} className='w-full' href='#' size='lg'>
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
