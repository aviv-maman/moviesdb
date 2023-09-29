'use client';

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link, NavbarItem } from '@nextui-org/react';
import { IconChevronDown } from '@tabler/icons-react';
import { useRouter, useSelectedLayoutSegment, useSelectedLayoutSegments } from 'next/navigation';
import type { ReactNode, FC } from 'react';

interface HeaderDropdownProps {
  targetSegment: string;
  links: {
    href: string;
    label: string;
    description: string;
    icon: ReactNode;
  }[];
}

const HeaderDropdown: FC<HeaderDropdownProps> = ({ targetSegment, links }) => {
  const router = useRouter();
  const activeSegment = useSelectedLayoutSegment();
  const activeSegments = useSelectedLayoutSegments();

  const dropdownLabel = targetSegment;
  const capitalizedLabel = dropdownLabel.charAt(0).toUpperCase() + dropdownLabel.slice(1);
  const dropdownId = `dropdown-${dropdownLabel}`;

  return (
    <Dropdown id={dropdownId}>
      <NavbarItem isActive={activeSegment === targetSegment}>
        <DropdownTrigger>
          <Link
            color={activeSegment === targetSegment ? 'primary' : 'foreground'}
            className='p-0 bg-transparent data-[hover=true]:bg-transparent cursor-pointer'>
            {capitalizedLabel} {<IconChevronDown size={18} />}
          </Link>
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label={`${capitalizedLabel} Menu`}
        className='w-[340px]'
        itemClasses={{
          base: 'gap-4',
        }}>
        {links.map((link) => {
          const { href, label, description, icon } = link;
          return (
            <DropdownItem
              key={href}
              description={description}
              startContent={icon}
              className={href === `/${activeSegment}/${activeSegments[1]}` ? 'bg-primary-500/10' : ''}
              onClick={() => router.push(href)}>
              {label}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
};

export default HeaderDropdown;
