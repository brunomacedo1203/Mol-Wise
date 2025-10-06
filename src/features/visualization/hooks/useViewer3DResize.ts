import { useEffect } from "react";
import type { ThreeDMolViewer } from "../types/3dmol";
import { MIN_CANVAS_WIDTH, MIN_CANVAS_HEIGHT, RESIZE_DEBOUNCE_MS } from "../constants/viewer3d.constants";
import { getElementSize } from "../utils/elementSize";

export function useViewer3DResize({
  containerRef,
  viewerRef,
  libReady,
  viewMode,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  viewerRef: React.RefObject<ThreeDMolViewer | null>;
  libReady: boolean;
  viewMode: "2D" | "3D" | string;
}) {
  useEffect(() => {
    const el = containerRef.current;
    const viewer = viewerRef.current;
    if (!el || !viewer || !libReady || viewMode !== "3D") return;

    let resizeTimeoutId: ReturnType<typeof setTimeout> | null = null;

    const handleResize = () => {
      const { width, height } = getElementSize(el);

      if (width < MIN_CANVAS_WIDTH || height < MIN_CANVAS_HEIGHT) {
        console.warn("⚠️ Dimensões inválidas durante resize, aguardando...");
        return;
      }

      if (resizeTimeoutId) clearTimeout(resizeTimeoutId);

      resizeTimeoutId = setTimeout(() => {
        try {
          viewer.resize();
          viewer.render();
        } catch (e) {
          console.warn("Erro ao redimensionar viewer 3D:", e);
        }
      }, RESIZE_DEBOUNCE_MS);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(el);

    return () => {
      resizeObserver.disconnect();
      if (resizeTimeoutId) clearTimeout(resizeTimeoutId);
    };
  }, [containerRef, viewerRef, libReady, viewMode]);
}