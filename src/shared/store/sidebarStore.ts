import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SidebarState {
  collapsed: boolean;
  openSections: Record<string, boolean>;
  toggleCollapsed: () => void;
  setCollapsed: (value: boolean) => void;
  toggleSection: (id: string) => void;
  setOpenSections: (sections: Record<string, boolean>) => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      collapsed: false,
      openSections: {},
      toggleCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
      setCollapsed: (value) => set({ collapsed: value }),
      toggleSection: (id) =>
        set((state) => ({
          openSections: {
            ...state.openSections,
            [id]: !state.openSections[id],
          },
        })),
      setOpenSections: (sections) => set({ openSections: sections }),
    }),
    {
      name: "molwise_sidebar", // chave do localStorage
    }
  )
); 