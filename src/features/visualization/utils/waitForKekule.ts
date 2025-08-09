import type { KekuleNamespace } from "../types/kekule";

export async function waitForKekule(
  maxWaitMs = 8000
): Promise<KekuleNamespace> {
  const start = Date.now();

  return new Promise((resolve, reject) => {
    const poll = () => {
      if (typeof window !== "undefined" && window.Kekule) {
        resolve(window.Kekule);
        return;
      }
      if (Date.now() - start > maxWaitMs) {
        reject(new Error("Kekule não carregou a tempo."));
        return;
      }
      setTimeout(poll, 100);
    };
    poll();
  });
}
