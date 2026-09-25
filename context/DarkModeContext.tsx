"use client";

import { createContext, useContext } from "react";

export const DarkModeContext = createContext({ isDarkMode: false, toggleDarkMode: () => {} });

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) throw new Error("DarkModeContext was used outside of <DarkModeProvider />");
  return context;
}

export { useDarkMode };
