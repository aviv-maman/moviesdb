import { type DropdownItemProps } from '@heroui/react';
import { ClockDown, DeviceTv, Meteor, PlayerPlay, Star, StarFilled, Stars, StarsFilled } from '@/assets/icons';

export const movieLinks = [
  {
    href: '/movies/popular',
    label: 'Popular',
    description: 'The most popular movies.',
    icon: <StarsFilled className='size-6 text-warning' />,
  },
  {
    href: '/movies/now-playing',
    label: 'Now Playing',
    description: 'Movies currently in cinemas and on streaming services.',
    icon: <PlayerPlay className='size-6 text-primary' />,
  },
  {
    href: '/movies/top-rated',
    label: 'Top Rated',
    description: 'Movies with the highest score by users.',
    icon: <StarFilled className='size-6 text-danger' />,
  },
  {
    href: '/movies/upcoming',
    label: 'Upcoming',
    description: 'Movies which will be released.',
    icon: <Meteor className='size-6 text-success' />,
  },
];

export const seriesLinks = [
  {
    href: '/series/popular',
    label: 'Popular',
    description: 'The most popular series.',
    icon: <Stars className='size-6' color='#f59e0b' />,
  },
  {
    href: '/series/on-the-air',
    label: 'On the Air',
    description: 'Series currently airing on TV and streaming services.',
    icon: <DeviceTv className='size-6' color='#005bc4' />,
  },
  {
    href: '/series/top-rated',
    label: 'Top Rated',
    description: 'Series with the highest score by users.',
    icon: <Star className='size-6' color='#22c55e' />,
  },
  {
    href: '/series/airing-today',
    label: 'Airing Today',
    description: 'Series which will be aired today.',
    icon: <ClockDown className='size-6' color='#dc2626' />,
  },
];

export const avatarDropItems = {
  guest: [
    { key: 'login', textValue: 'Login', href: '/login', color: 'primary' },
    { key: 'register', textValue: 'Register', href: '/register', color: 'secondary' },
    { key: 'about', textValue: 'About', href: '/about', color: 'primary' },
  ] as DropdownItemProps[],
  user: [
    { key: 'profile', textValue: 'Signed in as', href: '/profile', color: 'success' },
    { key: 'favorite', textValue: 'Favorite List', href: '/profile/favorite-list', color: 'primary' },
    { key: 'about', textValue: 'About', href: '/about', color: 'primary' },
    { key: 'logout', textValue: 'Logout', color: 'danger' },
  ] as DropdownItemProps[],
};
