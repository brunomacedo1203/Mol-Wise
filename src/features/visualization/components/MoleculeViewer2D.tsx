"use client";

import { useEffect, useRef, useState } from "react";
import { loadKekule } from "../utils/loadKekule";

interface Props {
  smiles: string;
  className?: string;
}

export function MoleculeViewer2D({ smiles, className }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewerRef = useRef<KekuleViewer | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        setError(null);

        // Validação inicial
        if (!smiles || !smiles.trim()) {
          throw new Error("SMILES inválido ou não encontrado.");
        }

        const Kekule = await loadKekule();
        if (cancelled || !containerRef.current) return;

        if (viewerRef.current?.finalize) {
          viewerRef.current.finalize();
        }

        const viewer = new Kekule.ChemWidget.Viewer(containerRef.current);
        viewer.setEnableToolbar(false);
        viewer.setEnableDirectInteraction(true);
        viewer.setPadding({ top: 10, right: 10, bottom: 10, left: 10 });

        try {
          const mol = Kekule.IO.loadFormatData(smiles.trim(), "smi");
          viewer.setChemObj(mol);
          if (viewer.zoomToFit) viewer.zoomToFit();
        } catch {
          throw new Error("Erro ao processar estrutura 2D.");
        }

        viewerRef.current = viewer;
      } catch (e: unknown) {
        console.error(e);
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("Falha ao renderizar estrutura 2D.");
        }
      }
    }

    init();

    return () => {
      cancelled = true;
      if (viewerRef.current?.finalize) {
        viewerRef.current.finalize();
      }
    };
  }, [smiles]);

  if (error) {
    return (
      <div className="text-sm text-red-600 dark:text-red-400">{error}</div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={
        className ?? "w-full h-80 rounded-xl border border-border bg-background"
      }
    />
  );
}
