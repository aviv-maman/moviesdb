'use client';

import useLocalStorageState from '../hooks/useLocalStorageState';
import { type ReactNode, createContext, useContext, useEffect } from 'react';

const DarkModeContext = createContext({ isDarkMode: false, toggleDarkMode: () => {} });

function DarkModeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia('(prefers-color-scheme: dark)').matches,
    'isDarkMode',
  );

  useEffect(() => {
    const className = 'dark';
    const bodyClass = window.document.body.classList;
    if (isDarkMode) {
      bodyClass.add(className);
    } else {
      bodyClass.remove(className);
    }
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((isDark: boolean) => !isDark);
  }

  return <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>{children}</DarkModeContext.Provider>;
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) throw new Error('DarkModeContext was used outside of DarkModeProvider');
  return context;
}

export { DarkModeProvider, useDarkMode };
