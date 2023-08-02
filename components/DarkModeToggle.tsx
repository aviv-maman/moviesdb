import ButtonIcon from './ButtonIcon';
import { useDarkMode } from '../context/DarkModeContext';
import { IconMoon, IconSun } from '@tabler/icons-react';

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return <ButtonIcon onClick={toggleDarkMode}>{isDarkMode ? <IconSun /> : <IconMoon />}</ButtonIcon>;
}

export default DarkModeToggle;
