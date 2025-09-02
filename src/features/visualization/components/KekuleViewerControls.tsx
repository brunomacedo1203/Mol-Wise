"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { 
  Palette, 
  Eye, 
  Settings, 
  ChevronDown, 
  ChevronUp
} from "lucide-react";
import type { RenderStyle, KekuleViewerConfig } from "../types/kekuleViewer.types";
import { RENDER_STYLE_LABELS, DEFAULT_ELEMENT_COLORS } from "../constants/kekuleViewer.constants";

interface KekuleViewerControlsProps {
  config: KekuleViewerConfig;
  onConfigChange: (config: Partial<KekuleViewerConfig>) => void;
  className?: string;
}

export function KekuleViewerControls({
  config,
  onConfigChange,
  className = "",
}: KekuleViewerControlsProps) {
  const _t = useTranslations("visualization.controls");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const updateConfig = (updates: Partial<KekuleViewerConfig>) => {
    onConfigChange(updates);
  };

  const updateElementColor = (element: string, color: string) => {
    const newColors = { ...config.elementColors, [element]: color };
    updateConfig({ elementColors: newColors });
  };

  const resetElementColors = () => {
    updateConfig({ elementColors: DEFAULT_ELEMENT_COLORS });
  };

  return (
    <div className={`bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4 ${className}`}>
      <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-4">
        Configurações de Visualização
      </h3>

      {/* Estilo de Renderização */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection('renderStyle')}
          className="flex items-center justify-between w-full text-left p-2 rounded hover:bg-zinc-50 dark:hover:bg-zinc-800"
        >
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            <span className="text-sm font-medium">Estilo de Renderização</span>
          </div>
          {expandedSection === 'renderStyle' ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {expandedSection === 'renderStyle' && (
          <div className="mt-2 space-y-2">
            {Object.entries(RENDER_STYLE_LABELS).map(([key, label]) => (
              <label key={key} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="renderStyle"
                  value={key}
                  checked={config.renderStyle === key}
                  onChange={(e) => updateConfig({ renderStyle: e.target.value as RenderStyle })}
                  className="w-3 h-3 text-blue-600"
                />
                <span className="text-sm">{label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Cores dos Elementos */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection('elementColors')}
          className="flex items-center justify-between w-full text-left p-2 rounded hover:bg-zinc-50 dark:hover:bg-zinc-800"
        >
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            <span className="text-sm font-medium">Cores dos Elementos</span>
          </div>
          {expandedSection === 'elementColors' ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {expandedSection === 'elementColors' && (
          <div className="mt-2">
            <div className="grid grid-cols-2 gap-2 mb-3">
              {Object.entries(config.elementColors).slice(0, 10).map(([element, color]) => (
                <div key={element} className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <div
                      className="w-3 h-3 rounded border border-zinc-300 dark:border-zinc-600"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-xs font-mono">{element}</span>
                  </div>
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => updateElementColor(element, e.target.value)}
                    className="w-6 h-6 rounded border border-zinc-300 dark:border-zinc-600 cursor-pointer"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={resetElementColors}
              className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Restaurar cores padrão
            </button>
          </div>
        )}
      </div>

      {/* Configurações Avançadas */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection('advanced')}
          className="flex items-center justify-between w-full text-left p-2 rounded hover:bg-zinc-50 dark:hover:bg-zinc-800"
        >
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            <span className="text-sm font-medium">Configurações Avançadas</span>
          </div>
          {expandedSection === 'advanced' ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {expandedSection === 'advanced' && (
          <div className="mt-2 space-y-3">
            {/* Raio dos Átomos */}
            <div>
              <label className="block text-xs font-medium mb-1">
                Raio dos Átomos: {config.atomRadius}px
              </label>
              <input
                type="range"
                min="6"
                max="20"
                value={config.atomRadius}
                onChange={(e) => updateConfig({ atomRadius: Number(e.target.value) })}
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Largura das Ligações */}
            <div>
              <label className="block text-xs font-medium mb-1">
                Largura das Ligações: {config.bondWidth}px
              </label>
              <input
                type="range"
                min="1"
                max="6"
                value={config.bondWidth}
                onChange={(e) => updateConfig({ bondWidth: Number(e.target.value) })}
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Opções de Exibição */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.showHydrogens}
                  onChange={(e) => updateConfig({ showHydrogens: e.target.checked })}
                  className="w-3 h-3 text-blue-600"
                />
                <span className="text-xs">Mostrar hidrogênios</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.showCharges}
                  onChange={(e) => updateConfig({ showCharges: e.target.checked })}
                  className="w-3 h-3 text-blue-600"
                />
                <span className="text-xs">Mostrar cargas</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.showIsotopes}
                  onChange={(e) => updateConfig({ showIsotopes: e.target.checked })}
                  className="w-3 h-3 text-blue-600"
                />
                <span className="text-xs">Mostrar isótopos</span>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
