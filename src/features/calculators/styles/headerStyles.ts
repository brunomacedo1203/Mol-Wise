/**
 * Estilos do componente CalculatorHeader
 * Utiliza Tailwind CSS para estilização
 */
export const HEADER_STYLES = {
  container: "mb-3 flex items-start justify-between w-full",
  titleContainer: "flex-1 pl-6",
  title: "py-2 text-4xl font-bold text-zinc-800 dark:text-zinc-100 text-center w-full",
  subtitle: "text-base text-zinc-600 dark:text-white/60 text-center block w-full",
  closeButton: [
    // Layout
    "ml-2 mt-1 p-2 rounded-full",
    // Cores
    "text-red-600 hover:bg-red-500 hover:text-white dark:hover:bg-red-600",
    // Bordas e sombras
    "shadow-lg border border-zinc-300 dark:border-red-800",
    // Interatividade
    "transition focus:outline-none focus:ring-2 focus:ring-red-400",
    "transform hover:scale-110",
  ].join(" "),
} as const; 