export async function loadKekule(): Promise<Window['Kekule']> {
import '../types/kekule.d';
    if (typeof window !== "undefined" && window.Kekule) {
      return window.Kekule;
    }
    return new Promise((resolve) => {
      const iv = setInterval(() => {
        if (typeof window !== "undefined" && window.Kekule) {
          clearInterval(iv);
          resolve(window.Kekule);
        }
      }, 50);
    });
  }
  