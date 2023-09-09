'use client';

import { type FC } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { IconDots, IconHeartFilled, IconList, IconStarFilled } from '@tabler/icons-react';

interface CarouselDropdownProps {
  className?: string;
}

const CarouselDropdown: FC<CarouselDropdownProps> = ({ className }) => {
  const iconClasses = 'text-xl text-default-500 pointer-events-none flex-shrink-0';

  return (
    <Dropdown className={className}>
      <DropdownTrigger className='absolute top-1 left-1'>
        <button className='rounded-lg bg-default-300 hover:bg-current'>
          <IconDots className='text-xl text-default-500 pointer-events-none flex-shrink-0' />
        </button>
      </DropdownTrigger>
      <DropdownMenu variant='faded' aria-label='Dropdown menu with icons'>
        <DropdownItem key='list' startContent={<IconList className={iconClasses} size={18} />}>
          Add to list
        </DropdownItem>
        <DropdownItem key='favorites' startContent={<IconHeartFilled className={iconClasses} size={18} />}>
          Add to favorites
        </DropdownItem>
        <DropdownItem key='rate' startContent={<IconStarFilled className={iconClasses} size={18} />}>
          Rate
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default CarouselDropdown;
