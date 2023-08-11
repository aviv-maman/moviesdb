'use client';
import { useDarkMode } from '../context/DarkModeContext';
import { IconMoon, IconSun } from '@tabler/icons-react';

function DarkModeToggle({ color = 'rgb(156 163 175 / var(--tw-bg-opacity))', size = '1.5rem', className = '' }) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button type='button' onClick={toggleDarkMode} className={`${className} relative rounded-full bg-gray-800 p-1 text-gray-400`}>
      {isDarkMode ? <IconSun color={color} size={size} /> : <IconMoon color={color} size={size} />}
    </button>
  );
}

export default DarkModeToggle;
