import { useEffect, useRef } from "react";
import type { ThreeDMolViewer, MolView } from "../types/3dmol";
import { getMoleculeKey } from "../utils/moleculeKey";
import { trackMolecule3DInteraction } from "../events/molecule3DEvents";

export function useViewer3DInteractions({
  containerRef,
  viewerRef,
  libReady,
  viewMode,
  smiles,
  sdfData,
  setView3D,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  viewerRef: React.RefObject<ThreeDMolViewer | null>;
  libReady: boolean;
  viewMode: "2D" | "3D" | string;
  smiles: string | null;
  sdfData: string | null;
  setView3D: (key: string, view: MolView) => void;
}) {
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (viewMode !== "3D") return;

    const el = containerRef.current;
    const v = viewerRef.current;
    if (!el || !v || !libReady) return;

    const save = () => {
      if (!mountedRef.current) return;
      const key = getMoleculeKey(smiles ?? null, sdfData ?? null);
      try {
        const view = v.getView?.();
        if (view) setView3D(key, view);
      } catch {}
    };

    const trackInteraction = (
      interactionType: "zoom" | "rotate",
      source: "mouse" | "touch" | "wheel" = "mouse"
    ) => {
      if (!mountedRef.current) return;
      const moleculeName = getMoleculeKey(smiles ?? null, sdfData ?? null);

      let interactionValue: string | undefined;
      switch (interactionType) {
        case "zoom":
          interactionValue = source === "wheel" ? "wheel_scroll" : "pinch_zoom";
          break;
        case "rotate":
          interactionValue = source === "mouse" ? "mouse_drag" : "touch_rotate";
          break;
        default:
          interactionValue = source;
      }

      trackMolecule3DInteraction({
        molecule_name: moleculeName,
        interaction_type: interactionType,
        interaction_value: interactionValue,
      });
    };

    const handleMouseUp = () => {
      save();
      trackInteraction("rotate", "mouse");
    };

    const handleWheel = () => {
      save();
      trackInteraction("zoom", "wheel");
    };

    const handleTouchEnd = () => {
      save();
      trackInteraction("rotate", "touch");
    };

    el.addEventListener("mouseup", handleMouseUp, true);
    el.addEventListener("wheel", handleWheel, {
      capture: true,
      passive: true,
    } as unknown as AddEventListenerOptions);
    el.addEventListener("touchend", handleTouchEnd, true);

    return () => {
      el.removeEventListener("mouseup", handleMouseUp, true);
      el.removeEventListener("wheel", handleWheel, true);
      el.removeEventListener("touchend", handleTouchEnd, true);
    };
  }, [smiles, sdfData, setView3D, libReady, viewMode, containerRef, viewerRef]);
}