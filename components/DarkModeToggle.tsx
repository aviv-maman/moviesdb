'use client';

import { useDarkMode } from '../context/DarkModeContext';
import { Button } from '@heroui/react';
import { Moon, Sun } from '@/assets/icons';

type DarkModeToggleProps = {
  color?: string;
  className?: HTMLElement['className'];
};

function DarkModeToggle({ color, className }: DarkModeToggleProps) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <Button
      type='button'
      isIconOnly
      onPress={toggleDarkMode}
      className={`${className} border border-neutral-300 dark:border-neutral-800`}
      aria-label='Toggle dark mode'
      variant='light'>
      {isDarkMode ? <Sun color={color} className='size-5' /> : <Moon color={color} className='size-5' />}
    </Button>
  );
}

export default DarkModeToggle;
