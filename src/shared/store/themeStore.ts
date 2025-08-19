import { create } from "zustand";

type Theme = "light" | "dark" | undefined;

interface ThemeState {
  theme: Theme;
  isInitialized: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  initializeTheme: () => void;
}

// Função utilitária para aplicar o tema no DOM
const applyThemeToDOM = (theme: Theme) => {
  if (typeof window === "undefined") return;
  
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

// Função utilitária para detectar preferência do sistema
const getSystemPreference = (): "light" | "dark" => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

// Função utilitária para obter tema do localStorage
const getStoredTheme = (): Theme => {
  if (typeof window === "undefined") return undefined;
  const stored = localStorage.getItem("theme");
  return stored === "light" || stored === "dark" ? stored : undefined;
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: undefined,
  isInitialized: false,
  
  setTheme: (theme) => {
    set({ theme });
    
    // Persiste no localStorage e aplica no DOM
    if (typeof window !== "undefined" && theme) {
      localStorage.setItem("theme", theme);
      applyThemeToDOM(theme);
    }
  },
  
  toggleTheme: () => {
    const { theme, setTheme } = get();
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  },
  
  initializeTheme: () => {
    if (typeof window === "undefined") return;
    
    const storedTheme = getStoredTheme();
    const systemPreference = getSystemPreference();
    const initialTheme = storedTheme || systemPreference;
    
    set({ theme: initialTheme, isInitialized: true });
    applyThemeToDOM(initialTheme);
    
    // Persiste a preferência inicial se não havia tema salvo
    if (!storedTheme) {
      localStorage.setItem("theme", initialTheme);
    }
  },
}));
