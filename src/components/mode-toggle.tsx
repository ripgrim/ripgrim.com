"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      aria-label="Toggle theme"
      className="relative h-6 w-6 text-muted-foreground transition-colors hover:text-foreground"
      onClick={toggleTheme}
      type="button"
    >
      <Sun className="dark:-rotate-90 absolute top-1 left-1 h-4 w-4 rotate-0 scale-100 transition-all dark:scale-0" />
      <Moon className="absolute top-1 left-1 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  );
}
