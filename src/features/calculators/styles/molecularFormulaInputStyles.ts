/**
 * Estilos do componente MolecularFormulaInput
 * Utiliza Tailwind CSS para estilização
 */

export const MOLECULAR_FORMULA_INPUT_STYLES = {
  container: "w-full",
  inputWrapper: "relative w-full min-h-[3rem] max-h-32",
  input: "w-full h-full absolute inset-0 opacity-0 z-10 cursor-text",
  content: (errorMessage: boolean, isFocused: boolean) => `
    molecular-formula-input border 
    ${errorMessage
      ? "border-red-500 dark:border-red-400"
      : "border-gray-300 dark:border-white/20"
    } 
    rounded-xl pt-2 pb-2 px-3 text-gray-900 dark:text-white 
    bg-white dark:bg-white/5 dark:border-white/20
    text-xl min-h-[3rem] max-h-48 cursor-text
    transition-all whitespace-pre-wrap break-words overflow-y-auto
    ${isFocused ? "ring-2 ring-blue-500 ring-opacity-50" : ""}
    touch-manipulation
  `,
  placeholder: (errorMessage: boolean) => `
    absolute inset-0 w-full h-full 
    flex items-start pl-3 pt-3 pb-3 
    pointer-events-none select-none 
    text-xl font-sans whitespace-pre-wrap break-words
    ${errorMessage
      ? "text-red-500 dark:text-red-400"
      : "text-gray-400 dark:text-white/40"
    }
  `,
  result: `
    result-html 
    text-blue-600 dark:text-blue-400 
    text-left text-lg min-h-8 mt-3 -mb-2 
    w-full overflow-hidden break-words
  `,
  cursor: (visible: boolean) => `
    inline-block w-px h-5 
    ${visible ? "bg-black dark:bg-white" : "bg-transparent"} 
    align-middle ml-px
  `,
} as const; 