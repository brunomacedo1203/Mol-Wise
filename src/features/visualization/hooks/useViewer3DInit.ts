import { useEffect } from "react";
import type { ThreeDMolViewer, ThreeDMolNamespace } from "../types/3dmol";
import { waitFor3Dmol } from "../utils/waitFor3Dmol";
import { MIN_CANVAS_WIDTH, MIN_CANVAS_HEIGHT } from "../constants/viewer3d.constants";
import { getElementSize, waitForNonZeroSize } from "../utils/elementSize";
import { trackMolecule3DError } from "../events/molecule3DEvents";

export function useViewer3DInit({
  containerRef,
  viewerRef,
  containerReady,
  setLibReady,
  setErr,
  mountedRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  viewerRef: React.RefObject<ThreeDMolViewer | null>;
  containerReady: boolean;
  setLibReady: (ready: boolean) => void;
  setErr: (msg: string | null) => void;
  mountedRef: React.RefObject<boolean>;
}) {
  useEffect(() => {
    if (!containerReady) return;

    let disposed = false;
    const el = containerRef.current;

    async function init() {
      setErr(null);
      try {
        const $3Dmol: ThreeDMolNamespace = await waitFor3Dmol();
        if (disposed || !el || !mountedRef.current) return;

        let attempts = 0;
        const maxAttempts = 5;

        const validateAndCreateViewer = async () => {
          const { width, height } = getElementSize(el);

          if (width < MIN_CANVAS_WIDTH || height < MIN_CANVAS_HEIGHT) {
            attempts++;
            if (attempts < maxAttempts) {
              setTimeout(validateAndCreateViewer, 50);
              return;
            } else {
              console.warn(
                "Container dimensions still invalid after retries, forcing minimum size"
              );
              el.style.minWidth = `${MIN_CANVAS_WIDTH}px`;
              el.style.minHeight = `${MIN_CANVAS_HEIGHT}px`;
            }
          }

          const isDark = document.documentElement.classList.contains("dark");
          const bgColor = isDark ? "#0a0a0a" : "#f4f4f5";

          el.innerHTML = "";
          await new Promise((resolve) => requestAnimationFrame(resolve));

          viewerRef.current = $3Dmol.createViewer(el, {
            backgroundColor: bgColor,
            backgroundAlpha: 1,
          });

          // Aguarda canvas estabilizar com tamanho não-zero e aplica resize inicial
          const ok = await waitForNonZeroSize(el, 500, MIN_CANVAS_WIDTH, MIN_CANVAS_HEIGHT);
          if (ok && viewerRef.current) {
            try {
              viewerRef.current.resize();
              viewerRef.current.render();
            } catch (e) {
              console.warn("Erro em resize/render inicial do viewer 3D:", e);
            }
          }

          if (mountedRef.current) setLibReady(true);
        };

        await validateAndCreateViewer();
      } catch (e: unknown) {
        if (!mountedRef.current) return;
        setErr(e instanceof Error ? e.message : "Falha ao inicializar 3D");
        trackMolecule3DError({
          error_type: "library_load_failed",
          error_message: e instanceof Error ? e.message : "Failed to init 3D viewer",
        });
      }
    }

    void init();
    return () => {
      disposed = true;
      if (el) el.innerHTML = "";
      viewerRef.current = null;
    };
  }, [containerReady, containerRef, viewerRef, setLibReady, setErr, mountedRef]);
}