'use client';
import { type FC } from 'react';

type HeaderMenuProps = {
  isOpen: boolean;
};

const openMenu = 'transition ease-out duration-100 transform opacity-100 scale-100 block';
const closeMenu = 'transition ease-in duration-75 transform opacity-0 scale-95 hidden';

const HeaderMenu: FC<HeaderMenuProps> = ({ isOpen }) => {
  return (
    <div
      className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
        isOpen ? openMenu : closeMenu
      }`}
      role='menu'
      aria-orientation='vertical'
      aria-labelledby='user-menu-button'
      tabIndex={-1}>
      {/* Active: "bg-gray-100", Not Active: "" */}
      <a href='#' className='block px-4 py-2 text-sm text-gray-700' role='menuitem' tabIndex={-1} id='user-menu-item-0'>
        Your Profile
      </a>
      <a href='#' className='block px-4 py-2 text-sm text-gray-700' role='menuitem' tabIndex={-1} id='user-menu-item-1'>
        Settings
      </a>
      <a href='#' className='block px-4 py-2 text-sm text-gray-700' role='menuitem' tabIndex={-1} id='user-menu-item-2'>
        Sign out
      </a>
    </div>
  );
};

export default HeaderMenu;
