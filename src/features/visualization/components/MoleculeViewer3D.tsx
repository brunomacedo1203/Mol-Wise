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

  // init viewer
  useEffect(() => {
    let disposed = false;
    const el = containerRef.current;

    async function init() {
      setErr(null);
      try {
        const $3Dmol: ThreeDMolNamespace = await waitFor3Dmol();
        if (disposed || !el) return;

        viewerRef.current = $3Dmol.createViewer(el, {
          backgroundColor: "transparent", // herda do card
          backgroundAlpha: 0,
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

  // update model
  useEffect(() => {
    async function updateModel() {
      if (!viewerRef.current || !libReady || !sdfData) return;
      try {
        const v = viewerRef.current;
        v.clear();
        v.addModel(sdfData, "sdf");
        v.setStyle({}, { stick: { radius: 0.15 }, sphere: { radius: 0.4 } });
        v.zoomTo();
        v.render();
      } catch {
        setErr("Não foi possível renderizar o modelo 3D (SDF inválido?).");
      }
    }
    void updateModel();
  }, [sdfData, libReady]);

  // acompanha troca de tema (se quiser forçar cor de fundo sólida)
  useEffect(() => {
    const html = document.documentElement;
    const obs = new MutationObserver(() => {
      const v = viewerRef.current;
      if (!v) return;
      // Ex.: forçar fundo sólido. Se preferir transparente, pode remover.
      const isDark = html.classList.contains("dark");
      // @ts-expect-error método interno mas funciona na prática
      v.setBackgroundColor(isDark ? "#0a0a0a" : "#ffffff");
      v.render();
    });
    obs.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="absolute inset-0 min-h-0">
      <div
        ref={containerRef}
        className="w-full h-full"
        style={{ position: "relative", overflow: "hidden" }}
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
