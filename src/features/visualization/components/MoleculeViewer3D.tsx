"use client";

import { useEffect, useRef, useState } from "react";
import { useVisualizationStore } from "../store/visualizationStore";
import { waitFor3Dmol } from "../utils/waitFor3Dmol";
import type { ThreeDMolViewer, ThreeDMolNamespace } from "../types/3dmol";

export function MoleculeViewer3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewerRef = useRef<ThreeDMolViewer | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [libReady, setLibReady] = useState(false);

  const sdfData = useVisualizationStore((s) => s.sdfData);

  // Inicializa o viewer 3D (apenas uma vez)
  useEffect(() => {
    let disposed = false;
    const el = containerRef.current; // captura para cleanup

    async function init() {
      setErr(null);
      try {
        const $3Dmol: ThreeDMolNamespace = await waitFor3Dmol();
        if (disposed || !el) return;

        viewerRef.current = $3Dmol.createViewer(el, {
          backgroundColor: "white",
        });
        setLibReady(true);
      } catch (e: unknown) {
        setErr(
          e instanceof Error
            ? e.message
            : "Falha ao inicializar o visualizador 3D."
        );
      }
    }

    void init();
    return () => {
      disposed = true;
      if (el) el.innerHTML = "";
      viewerRef.current = null;
    };
  }, []);

  // Atualiza o modelo quando sdfData mudar
  useEffect(() => {
    async function updateModel() {
      if (!viewerRef.current || !libReady || !sdfData) return;
      try {
        const v = viewerRef.current;
        v.clear();
        v.addModel(sdfData, "sdf");
        v.setStyle(
          {},
          {
            stick: { radius: 0.15 },
            sphere: { radius: 0.4 },
          }
        );
        v.zoomTo();
        v.render();
      } catch {
        setErr("Não foi possível renderizar o modelo 3D (SDF inválido?).");
      }
    }
    void updateModel();
  }, [sdfData, libReady]);

  return (
    <div className="w-full h-full">
      <div
        ref={containerRef}
        className="w-full h-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 overflow-hidden flex items-center justify-center"
        style={{ position: "relative" }}
      />
      {!libReady && !err && (
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Carregando visualizador 3D...
        </p>
      )}
      {err && <p className="mt-2 text-sm text-red-600">{err}</p>}
    </div>
  );
}
