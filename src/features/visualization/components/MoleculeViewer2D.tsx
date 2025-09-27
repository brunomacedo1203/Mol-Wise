// src/features/visualization/components/MoleculeViewer2D.tsx
"use client";

import { useEffect, useRef } from "react";
import { useVisualizationStore } from "../store/visualizationStore";
import { useTranslations } from "next-intl";
import { ViewBox } from "../types/viewer2d.types";
import { useViewer2DRenderer } from "../hooks/useViewer2DRenderer";
import { useViewer2DInteractions } from "../hooks/useViewer2DInteractions";
import { writeViewBox, centerViewBox } from "../utils/viewBoxUtils";
import { getMoleculeKey } from "../utils/moleculeKey";

export function MoleculeViewer2D() {
  const svgHostRef = useRef<HTMLDivElement | null>(null);
  const svgElRef = useRef<SVGSVGElement | null>(null);
  const vbRef = useRef<ViewBox | null>(null);
  const vbInitialRef = useRef<ViewBox | null>(null);
  const contentBoundsRef = useRef<ViewBox | null>(null);

  // ✅ CORREÇÃO: Ref para rastrear se o componente foi desmontado
  const mountedRef = useRef(true);

  const smiles = useVisualizationStore((s) => s.smilesData);
  const sdf = useVisualizationStore((s) => s.sdfData);

  const setCurrentMolKey = useVisualizationStore((s) => s.setCurrentMolKey);
  const getZoom2D = useVisualizationStore((s) => s.getZoom2D);

  // ✅ CORREÇÃO: Cleanup ao desmontar componente
  useEffect(() => {
    mountedRef.current = true;

    // Captura a referência atual para usar no cleanup
    const hostElement = svgHostRef.current;

    return () => {
      mountedRef.current = false;
      // Limpa referências usando a variável capturada
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

  useEffect(() => {
    if (!mountedRef.current) return; // ✅ CORREÇÃO: Só executa se montado

    const key = getMoleculeKey(smiles, sdf);
    setCurrentMolKey(key);

    if (ready && svgElRef.current && mountedRef.current) {
      const saved = getZoom2D(key);

      if (saved) {
        writeViewBox(svgElRef.current, saved);
        vbRef.current = saved;
      } else if (contentBoundsRef.current && svgHostRef.current) {
        const containerRect = svgHostRef.current.getBoundingClientRect();
        const newViewBox = centerViewBox(
          svgElRef.current,
          contentBoundsRef.current,
          containerRect.width,
          containerRect.height
        );

        vbRef.current = newViewBox;
        vbInitialRef.current = newViewBox;
      }
    }
  }, [ready, smiles, sdf, getZoom2D, setCurrentMolKey]);

  const t = useTranslations("visualization.controls");

  return (
    <div
      className="w-full h-full relative"
      style={{ contain: "layout style paint", overflow: "hidden" }}
    >
      <div
        ref={svgHostRef}
        onWheel={onWheel}
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
        }}
        title={t("tooltip")}
      />
      {!ready && (
        <p className="absolute bottom-2 left-3 text-sm text-zinc-500 dark:text-zinc-400 pointer-events-none">
          Carregando motor 2D…
        </p>
      )}
    </div>
  );
}
