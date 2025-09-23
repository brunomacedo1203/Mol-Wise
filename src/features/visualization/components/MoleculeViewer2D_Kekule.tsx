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
}

interface KekuleIO {
  loadFormatData: (data: string, format: string) => unknown;
}

interface KekuleChemWidget {
  Viewer: new (container: HTMLElement) => KekuleViewer;
}

interface KekuleLib {
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

        widget = new Kekule.ChemWidget.Viewer(containerRef.current);
        widget.setPredefinedSetting("basic");
        widget.setEnableToolbar(false);
        widget.setEnableEdit(false);
        
        console.log("smiles recebido:", smiles);
        console.log("tipo de smiles:", typeof smiles);
        
        widget.setChemObj(Kekule.IO.loadFormatData(smiles, "smi"));
        widget.setViewSize({ width: "100%", height: "100%" });
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
