"use client";
import { useEffect, useState } from "react";
import { useThemeStore } from "@/shared/store/themeStore";

export function ThemeEffectProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isHydrated, setIsHydrated] = useState(false);
  const { theme, initializeTheme, isInitialized } = useThemeStore();

  // Garante hidratação completa no cliente
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Inicializa tema assim que o componente hidrata
  useEffect(() => {
    if (isHydrated && !isInitialized) {
      initializeTheme();
    }
  }, [isHydrated, isInitialized, initializeTheme]);

  // Aplica o tema no DOM sempre que mudar
  useEffect(() => {
    if (isHydrated && theme) {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [isHydrated, theme]);

  // Renderiza as crianças mesmo durante a inicialização para evitar flash
  return <>{children}</>;
}
