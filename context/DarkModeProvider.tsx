"use client";

import { useCallback, useEffect, useMemo } from "react";
import useLocalStorageState from "@/hooks/useLocalStorageState";
import { DarkModeContext } from "./DarkModeContext";

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    "isDarkMode",
    window.matchMedia("(prefers-color-scheme: dark)").matches,
  );

  useEffect(() => {
    const className = "dark";
    const bodyClass = window.document.documentElement.classList;
    if (isDarkMode) {
      bodyClass.add(className);
    } else {
      bodyClass.remove(className);
    }
  }, [isDarkMode]);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((isDark) => !isDark);
  }, [setIsDarkMode]);

  const contextValue = useMemo(() => ({ isDarkMode, toggleDarkMode }), [isDarkMode, toggleDarkMode]);

  return <DarkModeContext.Provider value={contextValue}>{children}</DarkModeContext.Provider>;
}
