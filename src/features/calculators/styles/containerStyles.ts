/**
 * Estilos CSS para o container da calculadora
 * Utiliza Tailwind CSS para definir a aparência visual
 */

export const containerStyles = {
  /**
   * Estilos do container principal
   */
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

  /**
   * Estilos do cabeçalho
   */
  header: {
    container: "mb-3 flex items-start justify-between w-full",
    titleContainer: "flex-1 pl-6",
    title: "py-2 text-4xl font-bold text-zinc-800 dark:text-zinc-100 text-center w-full",
    subtitle: "text-base text-zinc-600 dark:text-white/60 text-center block w-full",
    closeButton: `
      ml-2 mt-1 p-2 rounded-full text-red-600
      hover:bg-red-500 hover:text-white dark:hover:bg-red-600
      shadow-lg border border-zinc-300 dark:border-red-800
      transition focus:outline-none focus:ring-2 focus:ring-red-400
      transform hover:scale-110
    `,
  },

  /**
   * Estilos do conteúdo
   */
  content: {
    container: "mb-2",
    actions: "mb-2 w-full",
    error: "flex justify-center items-center text-red-500 dark:text-red-400 text-center text-sm mb-2",
  },

  /**
   * Estilos do toggle do teclado
   */
  keyboardToggle: {
    container: "w-full flex justify-center mt-2",
    button: "text-base text-zinc-500 dark:text-zinc-300 hover:text-zinc-800 dark:hover:text-white flex items-center gap-1",
  },

  /**
   * Configurações do Rnd
   */
  rnd: {
    minWidth: 300,
    maxWidth: 800,
    defaultWidth: 500,
    defaultHeight: 400,
    enable: {
      top: true,
      right: true,
      bottom: true,
      left: true,
      topRight: true,
      bottomRight: true,
      bottomLeft: true,
      topLeft: true,
    },
    className: "z-50",
  },
} as const;

export type ContainerStyles = typeof containerStyles; 