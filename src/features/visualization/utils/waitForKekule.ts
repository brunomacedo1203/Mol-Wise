// src/features/visualization/utils/waitForKekule.ts

// 1. Declaração global para o TypeScript reconhecer window.Kekule
declare global {
  interface Window {
    Kekule?: {
      version?: string;
      // Adicione mais tipagens específicas se quiser
    };
  }
}

/**
 * Espera o Kekule.js estar disponível no objeto global.
 * Útil para componentes que dependem de carregamento externo via <script>.
 */
export function waitForKekule(maxAttempts = 50, delay = 100): Promise<void> {
  return new Promise((resolve, reject) => {
    let attempts = 0;

    const check = () => {
      if (window.Kekule) {
        resolve();
      } else {
        attempts++;
        if (attempts >= maxAttempts) {
          reject(new Error("Kekule.js não foi carregado dentro do tempo esperado."));
        } else {
          setTimeout(check, delay);
        }
      }
    };

    check();
  });
}
