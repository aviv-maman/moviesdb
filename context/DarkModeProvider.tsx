"use client";

import type { FC, ReactNode } from "react";
import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { DarkModeContext } from "./DarkModeContext";

interface DarkModeProviderProps {
  children: ReactNode;
}

export const DarkModeProvider: FC<DarkModeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<boolean | null>(null);
  const isDarkMode = theme ?? false;

  useLayoutEffect(() => {
    let initialTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

    try {
      const storedTheme = window.localStorage.getItem("isDarkMode");
      if (storedTheme === "true" || storedTheme === "false") {
        initialTheme = storedTheme === "true";
      }
    } catch {
      // Use the system preference when browser storage is unavailable.
    }

    document.documentElement.classList.toggle("dark", initialTheme);
    document.documentElement.style.colorScheme = initialTheme ? "dark" : "light";
    setTheme(initialTheme);
  }, []);

  useLayoutEffect(() => {
    if (theme === null) return;

    document.documentElement.classList.toggle("dark", theme);
    document.documentElement.style.colorScheme = theme ? "dark" : "light";

    try {
      window.localStorage.setItem("isDarkMode", JSON.stringify(theme));
    } catch {
      // Theme switching still works when browser storage is unavailable.
    }
  }, [theme]);

  const toggleDarkMode = useCallback(() => {
    setTheme((isDark) => !isDark);
  }, []);

  const contextValue = useMemo(() => ({ isDarkMode, toggleDarkMode }), [isDarkMode, toggleDarkMode]);

  return <DarkModeContext.Provider value={contextValue}>{children}</DarkModeContext.Provider>;
};
