"use client";

import { useState } from "react";
import { MoleculeViewer2D } from "./MoleculeViewer2D";
import { MoleculeViewer3D } from "./MoleculeViewer3D";
import { MoleculeToolbar } from "./MoleculeToolbar";
import { KekuleViewerComplete } from "./KekuleViewerComplete";
import { useVisualizationStore } from "../store/visualizationStore";
import { useTranslations } from "next-intl";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Atom, FlaskConical } from "lucide-react";

export function VisualizationPageContent() {
  const t = useTranslations("visualization");
  const { viewMode, smilesData, sdfData } = useVisualizationStore();
  const [viewerType, setViewerType] = useState<'legacy' | 'kekule'>('kekule');

  return (
    <div className="flex flex-col w-full h-full">
      {/* Toolbar horizontal */}
      <MoleculeToolbar />

      {/* Seletor de tipo de viewer */}
      <div className="flex items-center justify-center gap-2 p-2 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700">
        <Tabs value={viewerType} onValueChange={(value) => setViewerType(value as 'legacy' | 'kekule')} className="w-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="kekule" className="flex items-center gap-2">
              <FlaskConical className="w-4 h-4" />
              Kekule.js (2D Avançado)
            </TabsTrigger>
            <TabsTrigger value="legacy" className="flex items-center gap-2">
              <Atom className="w-4 h-4" />
              OpenChemLib (2D/3D)
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Área principal sem restrições */}
      <div className="flex-1 min-h-0 p-0 relative overflow-hidden">
        {viewerType === 'kekule' ? (
          <KekuleViewerComplete
            showControls={true}
            showToolbar={true}
            toolbarPosition="top"
            controlsPosition="right"
            config={{
              renderStyle: 'complete',
              elementColors: {
                C: '#000000',
                H: '#FFFFFF',
                N: '#0000FF',
                O: '#FF0000',
                S: '#FFFF00',
                P: '#FFA500',
                F: '#00FF00',
                Cl: '#00FF00',
              },
              atomRadius: 12,
              bondWidth: 2,
              showHydrogens: true,
              showCharges: true,
              showIsotopes: true,
              backgroundColor: 'transparent',
              enabledTools: ['select', 'draw', 'erase', 'rotate', 'move'],
            }}
            onMoleculeChange={(molecule) => {
              console.log('KekuleViewer - Molécula carregada:', molecule);
            }}
            onError={(error) => {
              console.error('KekuleViewer - Erro:', error);
            }}
            className="w-full h-full"
          />
        ) : (
          viewMode === "2D" ? <MoleculeViewer2D /> : <MoleculeViewer3D />
        )}
      </div>

      {/* Dica quando nada é carregado */}
      {!smilesData && !sdfData && (
        <div className="text-center py-6">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            💡 <b>{t("tip")}:</b> {t("example")} <b>benzene</b>, <b>NaCl</b>,{" "}
            <b>C1=CC=CC=C1</b>, <b>241</b>.
          </p>
          {viewerType === 'kekule' && (
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2">
              🆕 Experimente o novo visualizador Kekule.js com ferramentas de edição avançadas!
            </p>
          )}
        </div>
      )}
    </div>
  );
}
