import { useEffect } from "react";
import type { ThreeDMolViewer } from "../types/3dmol";

export function useViewer3DTheme({
  viewerRef,
  libReady,
  viewMode,
}: {
  viewerRef: React.RefObject<ThreeDMolViewer | null>;
  libReady: boolean;
  viewMode: "2D" | "3D" | string;
}) {
  useEffect(() => {
    if (!libReady || viewMode !== "3D") return;

    const html = document.documentElement;
    const updateTheme = () => {
      const v = viewerRef.current;
      if (!v) return;

      const isDark = html.classList.contains("dark");
      const bgColor = isDark ? "#0a0a0a" : "#f4f4f5";

      try {
        v.setBackgroundColor(bgColor);
        v.render();
      } catch (e) {
        console.warn("Erro ao atualizar tema 3D:", e);
      }
    };

    updateTheme();
    const obs = new MutationObserver(updateTheme);
    obs.observe(html, { attributes: true, attributeFilter: ["class"] });

    return () => obs.disconnect();
  }, [libReady, viewMode, viewerRef]);
}