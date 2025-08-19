"use client";
import { useEffect } from "react";
import { useThemeStore } from "@/shared/store/themeStore";

export function ThemeEffectProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const isInitialized = useThemeStore((s) => s.isInitialized);
  const initializeTheme = useThemeStore((s) => s.initializeTheme);

  // Inicializa o tema apenas uma vez no lado do cliente
  useEffect(() => {
    if (!isInitialized) {
      initializeTheme();
    }
  }, [isInitialized, initializeTheme]);

  // Evita renderizar até o tema ser inicializado
  if (!isInitialized) return null;

  return <>{children}</>;
}
