'use client';

import { createContext, useContext, useEffect, useMemo } from 'react';
import useLocalStorageState from '@/hooks/useLocalStorageState';

const DarkModeContext = createContext({ isDarkMode: false, toggleDarkMode: () => {} });

function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    'isDarkMode',
    window.matchMedia('(prefers-color-scheme: dark)').matches,
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
    setIsDarkMode((isDark) => !isDark);
  }

  const contextValue = useMemo(() => ({ isDarkMode, toggleDarkMode }), [isDarkMode, toggleDarkMode]);

  return <DarkModeContext.Provider value={contextValue}>{children}</DarkModeContext.Provider>;
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) throw new Error('DarkModeContext was used outside of <DarkModeProvider />');
  return context;
}

export { DarkModeProvider, useDarkMode };
