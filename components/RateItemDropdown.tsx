'use client';

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { StarFilled, StarHalfFilled, StarOff } from '@/assets/icons';

const RateItemDropdown: React.FC = () => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly>
          <StarHalfFilled />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label='Rate Options'>
        <DropdownItem key='rate-5'>
          <div className='flex'>
            <StarFilled />
            <StarFilled />
            <StarFilled />
            <StarFilled />
            <StarFilled />
          </div>
        </DropdownItem>
        <DropdownItem key='rate-4'>
          <div className='flex'>
            <StarFilled />
            <StarFilled />
            <StarFilled />
            <StarFilled />
          </div>
        </DropdownItem>
        <DropdownItem key='rate-3'>
          <div className='flex'>
            <StarFilled />
            <StarFilled />
            <StarFilled />
          </div>
        </DropdownItem>
        <DropdownItem key='rate-2'>
          <div className='flex'>
            <StarFilled />
            <StarFilled />
          </div>
        </DropdownItem>
        <DropdownItem key='rate-1'>
          <StarFilled />
        </DropdownItem>
        <DropdownItem key='remove'>
          <StarOff />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default RateItemDropdown;
