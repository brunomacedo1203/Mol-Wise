"use client";

import { useEffect, useRef, useState } from "react";
import { useVisualizationStore } from "../store/visualizationStore";

type OpenChemLibModule = typeof import("openchemlib");

export function MoleculeViewer2D() {
  const svgHostRef = useRef<HTMLDivElement | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  const smiles = useVisualizationStore((s) => s.smilesData);
  const sdf = useVisualizationStore((s) => s.sdfData);

  const oclRef = useRef<OpenChemLibModule | null>(null);
  useEffect(() => {
    let disposed = false;
    async function loadOCL() {
      try {
        const mod: OpenChemLibModule = await import("openchemlib");
        const OCL: OpenChemLibModule =
          (mod as unknown as { default?: OpenChemLibModule }).default ?? mod;
        if (disposed) return;
        oclRef.current = OCL;
        setReady(true);
      } catch (e) {
        console.error(e);
        setErr(
          "Falha ao carregar OpenChemLib. Verifique a instalação do pacote."
        );
      }
    }
    void loadOCL();
    return () => {
      disposed = true;
    };
  }, []);

  useEffect(() => {
    async function render() {
      setErr(null);
      const host = svgHostRef.current;
      const OCL = oclRef.current;
      if (!host || !OCL || !ready) return;

      try {
        let mol: import("openchemlib").Molecule | null = null;

        if (sdf) {
          try {
            mol = OCL.Molecule.fromMolfile(sdf);
          } catch {}
        }
        if (!mol && smiles) {
          try {
            mol = OCL.Molecule.fromSmiles(smiles);
          } catch {}
        }
        if (!mol) {
          host.innerHTML = "";
          setErr(
            "Sem dados válidos para renderizar (SDF/SMILES indisponíveis)."
          );
          return;
        }
        try {
          mol.addImplicitHydrogens?.();
        } catch {}
        try {
          mol.ensureHelperArrays?.(OCL.Molecule?.cHelperNeighbours ?? 0);
        } catch {}

        const svg = (
          mol as unknown as {
            toSVG: (w: number, h: number, opts?: unknown) => string;
          }
        ).toSVG(640, 420, { autoCrop: true });
        host.innerHTML = svg;
      } catch (e) {
        console.error(e);
        setErr("Não foi possível renderizar a estrutura 2D com OpenChemLib.");
      }
    }
    void render();
  }, [sdf, smiles, ready]);

  return (
    <div className="w-full">
      <div
        ref={svgHostRef}
        className="w-full h-[420px] rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 overflow-hidden"
      />
      {err && <p className="mt-2 text-sm text-red-600">{err}</p>}
      {!err && !ready && (
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Carregando motor 2D…
        </p>
      )}
    </div>
  );
}
