// src/features/visualization/components/MoleculeViewer2D.tsx
"use client";

import { useEffect, useRef } from "react";
import { useVisualizationStore } from "../store/visualizationStore";
import { ViewBox } from "../types/viewer2d.types";
import { useViewer2DRenderer } from "../hooks/useViewer2DRenderer";
import { useViewer2DInteractions } from "../hooks/useViewer2DInteractions";
import { useWheelListener } from "../hooks/useWheelListener";
import { useInitialViewBox } from "../hooks/useInitialViewBox";
import { MIN_CANVAS_WIDTH, MIN_CANVAS_HEIGHT } from "../constants/viewer2d.constants";

export function MoleculeViewer2D() {
  const svgHostRef = useRef<HTMLDivElement | null>(null);
  const svgElRef = useRef<SVGSVGElement | null>(null);
  const vbRef = useRef<ViewBox | null>(null);
  const vbInitialRef = useRef<ViewBox | null>(null);
  const contentBoundsRef = useRef<ViewBox | null>(null);

  const mountedRef = useRef(true);

  const smiles = useVisualizationStore((s) => s.smilesData);
  const sdf = useVisualizationStore((s) => s.sdfData);

  const setCurrentMolKey = useVisualizationStore((s) => s.setCurrentMolKey);
  const getZoom2D = useVisualizationStore((s) => s.getZoom2D);

  useEffect(() => {
    mountedRef.current = true;

    const hostElement = svgHostRef.current;

    return () => {
      mountedRef.current = false;
      if (hostElement) {
        hostElement.innerHTML = "";
      }

      svgElRef.current = null;
      vbRef.current = null;
      vbInitialRef.current = null;
      contentBoundsRef.current = null;
    };
  }, []);

  const { ready } = useViewer2DRenderer({
    svgHostRef,
    svgElRef,
    vbRef,
    vbInitialRef,
    contentBoundsRef,
    sdf,
    smiles,
  });

  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleDoubleClick,
    onWheel,
  } = useViewer2DInteractions({
    svgElRef,
    svgHostRef,
    vbRef,
    vbInitialRef,
    contentBoundsRef,
  });

  // Listener de wheel extraído para hook dedicado
  useWheelListener(svgHostRef, onWheel);

  // Restauração/centralização do ViewBox via hook dedicado
  useInitialViewBox({
    ready,
    svgElRef,
    svgHostRef,
    vbRef,
    vbInitialRef,
    contentBoundsRef,
    smiles,
    sdf,
    getZoom2D,
    setCurrentMolKey,
    mountedRef,
  });

  return (
    <div
      className="w-full h-full relative"
      style={{
        contain: "layout style paint",
        overflow: "hidden",
        minWidth: MIN_CANVAS_WIDTH,
        minHeight: MIN_CANVAS_HEIGHT,
      }}
    >
      <div
        ref={svgHostRef}
        onDoubleClick={handleDoubleClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        className="w-full h-full select-none"
        style={{
          position: "relative",
          touchAction: "none",
          overflow: "hidden",
          cursor: "grab",
          contain: "layout style paint",
          minWidth: MIN_CANVAS_WIDTH,
          minHeight: MIN_CANVAS_HEIGHT,
        }}
      />
      {!ready && (
        <p className="absolute bottom-2 left-3 text-sm text-zinc-500 dark:text-zinc-400 pointer-events-none">
          Carregando motor 2D…
        </p>
      )}
    </div>
  );
}
