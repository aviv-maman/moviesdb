'use client';

import { Button } from '@nextui-org/react';
import { useDarkMode } from '../context/DarkModeContext';
import { IconMoon, IconSun } from '@tabler/icons-react';

type DarkModeToggleProps = {
  color?: string;
  size?: string | number;
  className?: string;
};

function DarkModeToggle({ color, size = '1.5rem', className }: DarkModeToggleProps) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <Button
      type='button'
      isIconOnly
      onClick={toggleDarkMode}
      className={`${className} border border-neutral-300 dark:border-neutral-800`}
      aria-label='Toggle dark mode'
      variant='light'>
      {isDarkMode ? <IconSun color={color} size={size} /> : <IconMoon color={color} size={size} />}
    </Button>
  );
}

export default DarkModeToggle;
