/**
 * Estilos CSS para o container da calculadora
 * Utiliza Tailwind CSS para definir a aparência visual
 */

export const containerStyles = {
  root: `
    p-2 
    rounded-2xl 
    border border-zinc-200 shadow-xl
    bg-white bg-opacity-90 dark:bg-neutral-800 dark:bg-opacity-80
    flex flex-col
    dark:border-white/20 dark:shadow-none
    relative
    w-full
  `,
  content: "mb-2",
  actions: "mb-2 w-full",
  error: "flex justify-center items-center text-red-500 dark:text-red-400 text-center text-sm mb-2",
} as const;

export type ContainerStyles = typeof containerStyles; 