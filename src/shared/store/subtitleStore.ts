import { create } from "zustand";

interface SubtitleState {
  subtitle: string;
  setSubtitle: (subtitle: string) => void;
}

export const useSubtitleStore = create<SubtitleState>()((set) => ({
  subtitle: "",
  setSubtitle: (subtitle) => set({ subtitle }),
})); 