// TypeScript: extend the Window interface to include __molwiseSetSectionHome
// Place this at the top of this file or in a global.d.ts if used elsewhere

declare global {
  interface Window {
    __molwiseSetSectionHome?: () => void;
  }
}

export {}; // Ensures this file is treated as a module by TypeScript
