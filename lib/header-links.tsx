import {
  IconClockDown,
  IconDeviceTv,
  IconMeteor,
  IconPlayerPlay,
  IconStar,
  IconStarFilled,
  IconStars,
  IconStarsFilled,
} from '@tabler/icons-react';
import { type DropdownItemProps } from '@nextui-org/react';

export const movieLinks = [
  {
    href: '/movies/popular',
    label: 'Popular',
    description: 'The most popular movies.',
    icon: <IconStarsFilled size={24} className='text-warning' />,
  },
  {
    href: '/movies/now-playing',
    label: 'Now Playing',
    description: 'Movies currently in cinemas and on streaming services.',
    icon: <IconPlayerPlay size={24} className='text-primary' />,
  },
  {
    href: '/movies/top-rated',
    label: 'Top Rated',
    description: 'Movies with the highest score by users.',
    icon: <IconStarFilled size={24} className='text-danger' />,
  },
  {
    href: '/movies/upcoming',
    label: 'Upcoming',
    description: 'Movies which will be released.',
    icon: <IconMeteor size={24} className='text-success' />,
  },
];

export const seriesLinks = [
  {
    href: '/series/popular',
    label: 'Popular',
    description: 'The most popular series.',
    icon: <IconStars size={24} color='#f59e0b' />,
  },
  {
    href: '/series/on-the-air',
    label: 'On the Air',
    description: 'Series currently airing on TV and streaming services.',
    icon: <IconDeviceTv size={24} color='#005bc4' />,
  },
  {
    href: '/series/top-rated',
    label: 'Top Rated',
    description: 'Series with the highest score by users.',
    icon: <IconStar size={24} color='#22c55e' />,
  },
  {
    href: '/series/airing-today',
    label: 'Airing Today',
    description: 'Series which will be aired today.',
    icon: <IconClockDown size={24} color='#dc2626' />,
  },
];

// const navLinks = [
//   { href: '/movies', label: 'Movies', targetSegment: 'movies' },
//   { href: '/series', label: 'Series', targetSegment: 'series' },
// ];

// const navItems = navLinks.map((link) => (
//   <NavbarItem key={link.label} isActive={activeSegment === link.targetSegment}>
//     <Link href={link.href} color={activeSegment === link.targetSegment ? 'primary' : 'foreground'}>
//       {link.label}
//     </Link>
//   </NavbarItem>
// ));

export const avatarDropItems = {
  guest: [
    { key: 'login', textValue: 'Login', href: '/login', color: 'primary' },
    { key: 'register', textValue: 'Register', href: '/register', color: 'secondary' },
    { key: 'about', textValue: 'About', href: '/about', color: 'primary' },
  ] as DropdownItemProps[],
  user: [
    { key: 'profile', textValue: 'Signed in as', href: '/profile', color: 'success' },
    { key: 'about', textValue: 'About', href: '/about', color: 'primary' },
    { key: 'logout', textValue: 'Logout', color: 'danger' },
  ] as DropdownItemProps[],
};
