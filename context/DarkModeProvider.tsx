"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { DarkModeContext } from "./DarkModeContext";

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<boolean | null>(null);
  const isDarkMode = theme ?? false;

  useEffect(() => {
    let initialTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    try {
      const storedTheme = window.localStorage.getItem("isDarkMode");
      if (storedTheme === "true" || storedTheme === "false") {
        initialTheme = storedTheme === "true";
      }
    } catch {
      // Use the system preference when browser storage is unavailable.
    }
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (theme === null) return;
    document.documentElement.classList.toggle("dark", theme);
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
}
