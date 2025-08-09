"use client";

import { useEffect, useRef, useState } from "react";
import { waitForKekule } from "../utils/waitForKekule";
import { useVisualizationStore } from "../store/visualizationStore";
import type { KekuleChemViewer, KekuleNamespace } from "../types/kekule";

export function MoleculeViewer2D() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewerRef = useRef<KekuleChemViewer | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const smiles = useVisualizationStore((s) => s.smilesData);

  // Inicializa o viewer 2D (apenas uma vez)
  useEffect(() => {
    let disposed = false;

    async function init() {
      setErr(null);
      try {
        const Kekule: KekuleNamespace = await waitForKekule();
        if (disposed || !containerRef.current) return;

        // Destroi instância anterior se houver
        if (viewerRef.current?.finalize) {
          viewerRef.current.finalize();
          viewerRef.current = null;
        }

        // >>> CORREÇÃO AQUI: usar ChemWidget.Viewer (não Kekule.ChemViewer)
        const viewer = new Kekule.ChemWidget.Viewer(containerRef.current, {
          renderType: "2D",
        });
        viewer.setRenderType("2D");
        viewer.setEnableToolbar?.(false);
        viewer.setToolButtonsVisible?.(false);
        viewer.setAutoAdjustAspect?.(true);
        viewerRef.current = viewer;
      } catch (e: unknown) {
        setErr(
          e instanceof Error
            ? e.message
            : "Falha ao inicializar o visualizador 2D."
        );
      }
    }

    void init();
    return () => {
      disposed = true;
      if (viewerRef.current?.finalize) {
        viewerRef.current.finalize();
        viewerRef.current = null;
      }
    };
  }, []);

  // Atualiza a molécula sempre que smiles mudar
  useEffect(() => {
    async function updateMol() {
      if (!viewerRef.current || !smiles) return;
      try {
        const Kekule = await waitForKekule();
        const mol = Kekule.IO.loadFormatData(smiles, "smi");
        viewerRef.current.setChemObj(mol);
        viewerRef.current.setZoom?.(1.0);
      } catch {
        setErr("Não foi possível renderizar a molécula (SMILES inválido?).");
      }
    }
    void updateMol();
  }, [smiles]);

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="w-full h-[420px] rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
      />
      {err && <p className="mt-2 text-sm text-red-600">{err}</p>}
    </div>
  );
}
