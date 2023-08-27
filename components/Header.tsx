'use client';

import { useState, type FC } from 'react';
import DarkModeToggle from './DarkModeToggle';
import { type User } from '@supabase/supabase-js';
import {
  IconChevronDown,
  IconClockDown,
  IconDeviceTv,
  IconMenu2,
  IconMeteor,
  IconPlayerPlay,
  IconSearch,
  IconStarFilled,
  IconStarsFilled,
  IconX,
} from '@tabler/icons-react';
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

  // const navLinks = [
  //   { href: '/movies', label: 'Movies', targetSegment: 'movies' },
  //   { href: '/series', label: 'Series', targetSegment: 'series' },
  // ];

  const movieLinks = {
    popular: {
      href: '/movies/popular',
      label: 'Popular',
      description: 'The most popular movies.',
      icon: <IconStarsFilled size={24} className='text-warning' />,
    },
    nowPlaying: {
      href: '/movies/now-playing',
      label: 'Now Playing',
      description: 'Movies currently in cinemas and on streaming services.',
      icon: <IconPlayerPlay size={24} className='text-primary' />,
    },
    topRated: {
      href: '/movies/top-rated',
      label: 'Top Rated',
      description: 'Movies with the highest score by users.',
      icon: <IconStarFilled size={24} className='text-danger' />,
    },
    upcoming: {
      href: '/movies/upcoming',
      label: 'Upcoming',
      description: 'Movies which will be released.',
      icon: <IconMeteor size={24} className='text-success' />,
    },
  };

  const seriesLinks = {
    popular: {
      href: '/series/popular',
      label: 'Popular',
      description: 'The most popular series.',
      icon: <IconStarsFilled size={24} className='text-warning' />,
    },
    onTheAir: {
      href: '/series/on-the-air',
      label: 'On the Air',
      description: 'Series currently airing on TV and streaming services.',
      icon: <IconDeviceTv size={24} className='text-secondary' />,
    },
    topRated: {
      href: '/series/top-rated',
      label: 'Top Rated',
      description: 'Series with the highest score by users.',
      icon: <IconStarFilled size={24} className='text-danger' />,
    },
    airingToday: {
      href: '/series/airing-today',
      label: 'Airing Today',
      description: 'Series which will be aired today.',
      icon: <IconClockDown size={24} className='text-orange-600' />,
    },
  };

  // const headerItems = navLinks.map((link) => (
  //   <NavbarItem key={link.label} isActive={activeSegment === link.targetSegment}>
  //     <Link href={link.href} color={activeSegment === link.targetSegment ? 'primary' : 'foreground'}>
  //       {link.label}
  //     </Link>
  //   </NavbarItem>
  // ));

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
        <div onClick={() => router.push('/')} className='cursor-pointer flex items-center gap-3'>
          <Logo />
          <span className='hidden md:inline-block'>RottenPopcorn</span>
        </div>

        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className='sm:hidden' />

        <NavbarContent className='hidden sm:flex gap-3'>
          <Dropdown>
            <NavbarItem isActive={activeSegment === 'movies'}>
              <DropdownTrigger>
                <Link
                  color={activeSegment === 'movies' ? 'primary' : 'foreground'}
                  className='p-0 bg-transparent data-[hover=true]:bg-transparent cursor-pointer'>
                  Movies {<IconChevronDown size={18} />}
                </Link>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label='Movies Menu'
              className='w-[340px]'
              itemClasses={{
                base: 'gap-4',
              }}>
              <DropdownItem
                key={movieLinks.popular.href}
                description={movieLinks.popular.description}
                startContent={movieLinks.popular.icon}
                className={activeSegment === 'movies' ? 'bg-primary-500/10' : ''}
                onClick={() => router.push(movieLinks.popular.href)}>
                {movieLinks.popular.label}
              </DropdownItem>
              <DropdownItem
                key={movieLinks.nowPlaying.href}
                description={movieLinks.nowPlaying.description}
                startContent={movieLinks.nowPlaying.icon}
                onClick={() => router.push(movieLinks.nowPlaying.href)}>
                {movieLinks.nowPlaying.label}
              </DropdownItem>
              <DropdownItem
                key={movieLinks.topRated.href}
                description={movieLinks.topRated.description}
                startContent={movieLinks.topRated.icon}
                onClick={() => router.push(movieLinks.topRated.href)}>
                {movieLinks.topRated.label}
              </DropdownItem>
              <DropdownItem
                key={movieLinks.upcoming.href}
                description={movieLinks.upcoming.description}
                startContent={movieLinks.upcoming.icon}
                onClick={() => router.push(movieLinks.upcoming.href)}>
                {movieLinks.upcoming.label}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Dropdown>
            <NavbarItem isActive={activeSegment === 'series'}>
              <DropdownTrigger>
                <Link
                  color={activeSegment === 'series' ? 'primary' : 'foreground'}
                  className='p-0 bg-transparent data-[hover=true]:bg-transparent cursor-pointer'>
                  Series {<IconChevronDown size={18} />}
                </Link>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label='Series Menu'
              className='w-[340px]'
              itemClasses={{
                base: 'gap-4',
              }}>
              <DropdownItem key={seriesLinks.popular.href} description={seriesLinks.popular.description} startContent={seriesLinks.popular.icon}>
                {seriesLinks.popular.label}
              </DropdownItem>
              <DropdownItem key={seriesLinks.onTheAir.href} description={seriesLinks.onTheAir.description} startContent={seriesLinks.onTheAir.icon}>
                {seriesLinks.onTheAir.label}
              </DropdownItem>
              <DropdownItem key={seriesLinks.topRated.href} description={seriesLinks.topRated.description} startContent={seriesLinks.topRated.icon}>
                {seriesLinks.topRated.label}
              </DropdownItem>
              <DropdownItem
                key={seriesLinks.airingToday.href}
                description={seriesLinks.airingToday.description}
                startContent={seriesLinks.airingToday.icon}>
                {seriesLinks.airingToday.label}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>

        {/* <NavbarContent className='hidden sm:flex gap-3'>{headerItems}</NavbarContent> */}
      </NavbarContent>

      <NavbarContent className='items-center' justify='end'>
        <Input
          classNames={{
            base: 'max-w-full sm:max-w-[15rem] h-max hidden md:block',
            input: 'text-small',
            inputWrapper: 'font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
          }}
          placeholder='Type to search...'
          size='sm'
          startContent={<IconSearch size={18} />}
          type='search'
        />

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
