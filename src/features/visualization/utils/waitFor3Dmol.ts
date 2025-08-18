import type { ThreeDMolNamespace } from "../types/3dmol";

export async function waitFor3Dmol(
  maxWaitMs = 8000
): Promise<ThreeDMolNamespace> {
  const start = Date.now();

  return new Promise((resolve, reject) => {
    const poll = () => {
      if (typeof window !== "undefined" && window.$3Dmol) {
        resolve(window.$3Dmol);
        return;
      }
      if (Date.now() - start > maxWaitMs) {
        reject(new Error("3Dmol não carregou a tempo."));
        return;
      }
      setTimeout(poll, 100);
    };
    poll();
  });
}
