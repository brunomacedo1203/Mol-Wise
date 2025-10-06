// src/features/visualization/components/MoleculeViewer3D.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useVisualizationStore } from "../store/visualizationStore";
import type { ThreeDMolViewer } from "../types/3dmol";
import { getMoleculeKey } from "../utils/moleculeKey";
import { useViewer3DTheme } from "../hooks/useViewer3DTheme";
import { useViewer3DContainerReady } from "../hooks/useViewer3DContainerReady";
import { useViewer3DResize } from "../hooks/useViewer3DResize";
import { useViewer3DInit } from "../hooks/useViewer3DInit";
import { useViewer3DModel } from "../hooks/useViewer3DModel";
import { useViewer3DInteractions } from "../hooks/useViewer3DInteractions";
import { MIN_CANVAS_WIDTH, MIN_CANVAS_HEIGHT } from "../constants/viewer3d.constants";

export function MoleculeViewer3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewerRef = useRef<ThreeDMolViewer | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [libReady, setLibReady] = useState(false);
  const [containerReady, setContainerReady] = useState(false);

  const mountedRef = useRef(true);

  const sdfData = useVisualizationStore((s) => s.sdfData);
  const smiles = useVisualizationStore((s) => s.smilesData);
  const viewMode = useVisualizationStore((s) => s.viewMode);
  const setCurrentMolKey = useVisualizationStore((s) => s.setCurrentMolKey);
  const getView3D = useVisualizationStore((s) => s.getView3D);
  const setView3D = useVisualizationStore((s) => s.setView3D);

  // Cleanup ao desmontar
  useEffect(() => {
    mountedRef.current = true;
    const containerElement = containerRef.current;

    return () => {
      mountedRef.current = false;
      if (viewerRef.current) {
        try {
          viewerRef.current.clear?.();
          viewerRef.current = null;
        } catch (e) {
          console.warn("Erro ao limpar viewer 3D:", e);
        }
      }
      if (containerElement) containerElement.innerHTML = "";
    };
  }, []);

  // Aguarda container ter dimensões válidas (extraído para hook)
  const containerIsReady = useViewer3DContainerReady(containerRef);
  useEffect(() => {
    if (containerIsReady) setContainerReady(true);
  }, [containerIsReady]);

  // Inicialização do viewer 3D (extraído)
  useViewer3DInit({
    containerRef,
    viewerRef,
    containerReady,
    setLibReady,
    setErr,
    mountedRef,
  });

  // Redimensionamento do viewer (extraído para hook)
  useViewer3DResize({ containerRef, viewerRef, libReady, viewMode });

  // Salva visão anterior
  const prevMoleculeRef = useRef<{
    smiles: string | null;
    sdfData: string | null;
  } | null>(null);

  useEffect(() => {
    if (!mountedRef.current) return;
    if (prevMoleculeRef.current && viewerRef.current) {
      const prevKey = getMoleculeKey(
        prevMoleculeRef.current.smiles,
        prevMoleculeRef.current.sdfData
      );
      try {
        const view = viewerRef.current.getView?.();
        if (view) setView3D(prevKey, view);
      } catch {}
    }
    prevMoleculeRef.current = { smiles, sdfData };
  }, [smiles, sdfData, setView3D]);

  // Atualização do modelo (extraído)
  useViewer3DModel({
    viewerRef,
    libReady,
    sdfData,
    smiles,
    getView3D,
    viewMode,
    setErr,
  });

  // Interações do usuário (extraído)
  useViewer3DInteractions({
    containerRef,
    viewerRef,
    libReady,
    viewMode,
    smiles,
    sdfData,
    setView3D,
  });

  // Tema dinâmico
  useViewer3DTheme({ viewerRef, libReady, viewMode });

  useEffect(() => {
    if (!mountedRef.current) return;
    setCurrentMolKey(getMoleculeKey(smiles ?? null, sdfData ?? null));
  }, [smiles, sdfData, setCurrentMolKey]);

  return (
    <div className="absolute inset-0 min-h-0">
      <div
        ref={containerRef}
        className="w-full h-full"
        style={{
          position: "relative",
          overflow: "hidden",
          minWidth: MIN_CANVAS_WIDTH,
          minHeight: MIN_CANVAS_HEIGHT,
        }}
      />
      {!libReady && !err && (
        <p className="absolute bottom-2 left-3 text-sm text-zinc-500 dark:text-zinc-400 pointer-events-none">
          Carregando visualizador 3D...
        </p>
      )}
      {err && (
        <p className="absolute bottom-2 left-3 text-sm text-red-600 pointer-events-none">
          {err}
        </p>
      )}
    </div>
  );
}
