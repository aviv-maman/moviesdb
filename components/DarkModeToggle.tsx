"use client";

import type { FC } from "react";
import { Button } from "@heroui/react";
import { Moon, Sun } from "@/assets/icons";
import { useDarkMode } from "../context/DarkModeContext";

interface DarkModeToggleProps {
  color?: string;
  className?: HTMLElement["className"];
}

const DarkModeToggle: FC<DarkModeToggleProps> = ({ color, className }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <Button
      type="button"
      isIconOnly
      onPress={toggleDarkMode}
      className={`${className} border border-neutral-300 dark:border-neutral-800`}
      aria-label="Toggle dark mode"
      variant="ghost">
      {isDarkMode ? <Sun color={color} className="size-5" /> : <Moon color={color} className="size-5" />}
    </Button>
  );
};
export default DarkModeToggle;
