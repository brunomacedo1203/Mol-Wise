import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  isInitialized: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  initializeTheme: () => void;
}

// Função para detectar preferência do sistema
const getSystemPreference = (): Theme => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

// Função para aplicar tema no DOM de forma mais robusta
const applyTheme = (theme: Theme) => {
  if (typeof window === "undefined") return;
  
  const root = document.documentElement;
  
  // Remove ambas as classes primeiro
  root.classList.remove("light", "dark");
  // Adiciona a classe apropriada
  root.classList.add(theme);
  
  // Força atualização do atributo data-theme se usado
  root.setAttribute("data-theme", theme);
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "light", // valor padrão
      isInitialized: false,

      setTheme: (theme: Theme) => {
        set({ theme });
        applyTheme(theme);
      },

      toggleTheme: () => {
        const currentTheme = get().theme;
        const newTheme: Theme = currentTheme === "light" ? "dark" : "light";
        get().setTheme(newTheme);
      },

      initializeTheme: () => {
        if (typeof window === "undefined") {
          set({ isInitialized: true });
          return;
        }

        // Tenta obter o tema do localStorage primeiro
        let savedTheme: Theme | null = null;
        try {
          const stored = localStorage.getItem("theme-storage");
          if (stored) {
            const parsed = JSON.parse(stored);
            savedTheme = parsed.state?.theme;
          }
        } catch (error) {
          console.warn("Erro ao ler tema do localStorage:", error);
        }

        // Se não há tema salvo, usa preferência do sistema
        const initialTheme = savedTheme || getSystemPreference();
        
        set({ theme: initialTheme, isInitialized: true });
        applyTheme(initialTheme);
      },
    }),
    {
      name: "theme-storage",
      // Só persiste o tema, não o estado de inicialização
      partialize: (state) => ({ theme: state.theme }),
      // Garante sincronização entre abas
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyTheme(state.theme);
        }
      },
    }
  )
);