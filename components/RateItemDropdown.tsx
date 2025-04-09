'use client';

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { IconStarFilled, IconStarHalfFilled, IconStarOff } from '@tabler/icons-react';

const RateItemDropdown: React.FC = () => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly>
          <IconStarHalfFilled />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label='Rate Options'>
        <DropdownItem key='rate-5'>
          <div className='flex'>
            <IconStarFilled />
            <IconStarFilled />
            <IconStarFilled />
            <IconStarFilled />
            <IconStarFilled />
          </div>
        </DropdownItem>
        <DropdownItem key='rate-4'>
          <div className='flex'>
            <IconStarFilled />
            <IconStarFilled />
            <IconStarFilled />
            <IconStarFilled />
          </div>
        </DropdownItem>
        <DropdownItem key='rate-3'>
          <div className='flex'>
            <IconStarFilled />
            <IconStarFilled />
            <IconStarFilled />
          </div>
        </DropdownItem>
        <DropdownItem key='rate-2'>
          <div className='flex'>
            <IconStarFilled />
            <IconStarFilled />
          </div>
        </DropdownItem>
        <DropdownItem key='rate-1'>
          <IconStarFilled />
        </DropdownItem>
        <DropdownItem key='remove'>
          <IconStarOff />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default RateItemDropdown;
