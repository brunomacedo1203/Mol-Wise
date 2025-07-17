"use client";
import { useEffect } from "react";
import { useThemeStore } from "@/shared/store/themeStore";

export function ThemeEffectProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);

  // Sincroniza zustand com localStorage/matchMedia no client
  useEffect(() => {
    if (theme === undefined) {
      const stored = localStorage.getItem("theme");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const initial =
        stored === "light" || stored === "dark"
          ? stored
          : prefersDark
          ? "dark"
          : "light";
      setTheme(initial);
      if (initial === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [theme, setTheme]);

  useEffect(() => {
    if (theme !== undefined) {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [theme]);

  if (theme === undefined) return null; // Evita renderizar até saber o tema

  return <>{children}</>;
}
