"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { MenuState, MenuContextType } from "../types";
import { MENU_STORAGE_KEY } from "../constants";

const MenuContext = createContext<MenuContextType | undefined>(undefined);

interface MenuProviderProps {
  children: ReactNode;
  initialCollapsed?: boolean;
}

export function MenuProvider({
  children,
  initialCollapsed = false,
}: MenuProviderProps) {
  const [state, setState] = useState<MenuState>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(MENU_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          return {
            ...parsed,
            collapsed: initialCollapsed,
          };
        }
      } catch (error) {
        console.error("Erro ao carregar estado do menu:", error);
      }
    }
    return {
      openSections: {},
      collapsed: initialCollapsed,
    };
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(state));
      } catch (error) {
        console.error("Erro ao salvar estado do menu:", error);
      }
    }
  }, [state]);

  const toggleSection = (id: string) => {
    setState((prev) => ({
      ...prev,
      openSections: {
        ...prev.openSections,
        [id]: !prev.openSections[id],
      },
    }));
  };

  const setCollapsed = (collapsed: boolean) => {
    setState((prev) => ({ ...prev, collapsed }));
  };

  const value: MenuContextType = {
    state,
    toggleSection,
    setCollapsed,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu deve ser usado dentro de um MenuProvider");
  }
  return context;
}
