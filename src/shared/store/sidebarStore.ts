import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SidebarState {
  collapsed: boolean; // desktop sidebar
  mobileOpen: boolean; // mobile drawer (não persiste)
  showSettings: boolean; // mobile settings panel (não persiste)
  openSections: Record<string, boolean>;
  toggleCollapsed: () => void;
  setCollapsed: (value: boolean) => void;
  toggleSection: (id: string) => void;
  setOpenSections: (sections: Record<string, boolean>) => void;
  toggleMobile: () => void;
  setMobileOpen: (value: boolean) => void;
  setShowSettings: (value: boolean) => void;
  toggleShowSettings: () => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      collapsed: false,
      mobileOpen: false,
      showSettings: false,
      openSections: {},
      toggleCollapsed: () => set((s) => ({ collapsed: !s.collapsed })),
      setCollapsed: (value) => set({ collapsed: value }),
      toggleSection: (id) =>
        set((s) => ({
          openSections: { ...s.openSections, [id]: !s.openSections[id] },
        })),
      setOpenSections: (sections) => set({ openSections: sections }),
      toggleMobile: () => set((s) => ({ mobileOpen: !s.mobileOpen })),
      setMobileOpen: (value) => set({ mobileOpen: value }),
      setShowSettings: (value) => set({ showSettings: value }),
      toggleShowSettings: () => set((s) => ({ showSettings: !s.showSettings })),
    }),
    {
      name: "molclass_sidebar",
      partialize: (state) => ({
        collapsed: state.collapsed,
        openSections: state.openSections,
      }),
    }
  )
);