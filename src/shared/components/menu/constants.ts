export const MENU_STORAGE_KEY = "menuState";

export const MENU_SECTIONS = {
  CALCULATORS: "calculators",
  CATALOG: "catalog",
  MOLVIEW: "molview", // Nova seção
  // GAMES: "games", // Comentado temporariamente
} as const;

export const SUBMENU_VARIANTS = {
  open: {
    opacity: 1,
    display: "block",
    transition: { duration: 0.12, ease: "easeOut" },
  },
  closed: {
    opacity: 0,
    transitionEnd: { display: "none" },
    transition: { duration: 0.08, ease: "easeIn" },
  },
} as const;

export const MENU_WIDTHS = {
  COLLAPSED: "w-16",
  EXPANDED: "w-60",
} as const;

export const MENU_CLASSES = {
  BASE: "sidebar relative flex flex-col h-full bg-zinc-100 dark:bg-neutral-900",
  ITEM: "flex items-center px-2 py-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 gap-2 ",
  ACTIVE_ITEM: "bg-zinc-100 dark:bg-zinc-900",
  SUBMENU: "rounded-xl border border-zinc-200 bg-white shadow-lg dark:bg-neutral-800 dark:border-neutral-700 min-w-[160px] w-full mb-2",
  SUBMENU_ITEM:  "flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm mt-1 " +
  " hover:bg-zinc-200 dark:hover:bg-zinc-600",
} as const; 