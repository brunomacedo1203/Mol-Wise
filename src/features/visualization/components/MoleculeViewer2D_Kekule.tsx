/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useRef } from "react";
import { useVisualizationStore } from "../store/visualizationStore";
import { getMoleculeKey } from "../utils/moleculeKey";
import { useTranslations } from "next-intl";

// Define types for Kekule objects
interface KekuleViewer {
  setPredefinedSetting: (setting: string) => void;
  setEnableToolbar: (enabled: boolean) => void;
  setEnableEdit: (enabled: boolean) => void;
  setChemObj: (obj: unknown) => void;
  setViewSize: (size: { width: string; height: string }) => void;
  finalize?: () => void;
  setDimension?: (width: string, height: string) => void;
}

interface KekuleIO {
  loadFormatData: (data: string, format: string) => unknown;
}

interface KekuleChemWidget {
  Viewer: new (container: HTMLElement) => KekuleViewer;
}

interface KekuleLib {
  OpenBabel: any;
  ChemWidget: KekuleChemWidget;
  IO: KekuleIO;
}

export function MoleculeViewer2D_Kekule() {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    smilesData: smiles,
    sdfData: sdf,
    setCurrentMolKey,
  } = useVisualizationStore();
  const t = useTranslations("visualization.controls");

  useEffect(() => {
    let widget: KekuleViewer | null = null;
    let disposed = false;

    async function load() {
      try {
        // Aguarda o Kekule estar disponível globalmente
        if (typeof window === 'undefined' || !window.Kekule) {
          console.error("Kekule.js não está disponível globalmente");
          return;
        }

        const Kekule = window.Kekule as KekuleLib;
        if (!containerRef.current || disposed || !smiles || typeof smiles !== "string") {
          console.warn("Viewer não iniciado: smiles inválido", smiles);
          return;
        }

         await new Promise<void>((resolve, reject) => {
        Kekule.OpenBabel.enable((err?: any) => err ? reject(err) : resolve());
      });


      // 2) cria viewer
      widget = new Kekule.ChemWidget.Viewer(containerRef.current!);
      widget.setPredefinedSetting('basic');
      widget.setEnableToolbar(true);
      widget.setEnableEdit(true);
      widget.setDimension?.('100%', '100%');      // importante: container precisa ter altura real
      (widget as any).setAutofit?.(true);

      // 3) lê o SMILES
      const mol = Kekule.IO.loadFormatData(smiles, 'smi');

      // 4) GERA 2D (tente OB; se falhar, caia no gerador interno)
      let laidOut = mol;
      try {
        const ob2d = new (Kekule as any).Calculator.ObStructure2DGenerator();
        ob2d.setSourceMol(mol);
        ob2d.executeSync(() => {
          laidOut = ob2d.getGeneratedMol() || mol;
        });
      } catch {
        const gen2d = new (Kekule as any).Calculator.Structure2DGenerator(); // fallback
        gen2d.setSourceMol(mol);
        gen2d.executeSync(() => {
          laidOut = gen2d.getGeneratedMol() || mol;
        });
      }

      widget.setChemObj(laidOut);
      } catch (e) {
        console.error("Erro ao inicializar Kekule.js:", e);
      }
    }

    load();
    const key = getMoleculeKey(smiles, sdf);
    setCurrentMolKey(key);

    return () => {
      disposed = true;
      widget?.finalize?.();
    };
  }, [smiles, sdf, setCurrentMolKey]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full rounded-md overflow-hidden bg-white dark:bg-zinc-900"
      title={t("tooltip")}
    />
  );
}
