'use client';
import { useState, type FC } from 'react';
import HeaderMenu from './HeaderMenu';

interface ProfileDropdownProps {}

const ProfileDropdown: FC<ProfileDropdownProps> = ({}) => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu((prevState) => !prevState);

  return (
    <div className='relative ml-3'>
      <div>
        <button
          onClick={toggleMenu}
          type='button'
          className='relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
          id='user-menu-button'
          aria-expanded='false'
          aria-haspopup='true'>
          <span className='absolute -inset-1.5'></span>
          <span className='sr-only'>Open user menu</span>
          <img
            className='h-8 w-8 rounded-full'
            src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            alt=''
          />
        </button>
      </div>

      <HeaderMenu isOpen={showMenu} />
    </div>
  );
};

export default ProfileDropdown;
