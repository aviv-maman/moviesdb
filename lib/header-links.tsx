import { IconClockDown, IconDeviceTv, IconMeteor, IconPlayerPlay, IconStarFilled, IconStarsFilled } from '@tabler/icons-react';

export const mobileItems = ['Profile', 'Help', 'About', 'Log Out'];

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
    icon: <IconStarsFilled size={24} className='text-warning' />,
  },
  {
    href: '/series/on-the-air',
    label: 'On the Air',
    description: 'Series currently airing on TV and streaming services.',
    icon: <IconDeviceTv size={24} className='text-secondary' />,
  },
  {
    href: '/series/top-rated',
    label: 'Top Rated',
    description: 'Series with the highest score by users.',
    icon: <IconStarFilled size={24} className='text-danger' />,
  },
  {
    href: '/series/airing-today',
    label: 'Airing Today',
    description: 'Series which will be aired today.',
    icon: <IconClockDown size={24} className='text-orange-600' />,
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
