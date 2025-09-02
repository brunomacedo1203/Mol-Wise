"use client";

import { useTranslations } from "next-intl";
import { 
  MousePointer, 
  Pen, 
  Eraser, 
  RotateCw, 
  Move,
  Eye,
  EyeOff
} from "lucide-react";
import type { EditTool, KekuleToolbarProps } from "../types/kekuleViewer.types";
import { EDIT_TOOL_LABELS } from "../constants/kekuleViewer.constants";

interface KekuleEditToolbarProps extends KekuleToolbarProps {
  showControls?: boolean;
  onToggleControls?: () => void;
  className?: string;
}

export function KekuleEditToolbar({
  enabledTools,
  currentTool,
  onToolChange,
  onToolToggle,
  showControls = true,
  onToggleControls,
  className = "",
}: KekuleEditToolbarProps) {
  const _t = useTranslations("visualization.controls");

  const getToolIcon = (tool: EditTool) => {
    switch (tool) {
      case 'select': return MousePointer;
      case 'draw': return Pen;
      case 'erase': return Eraser;
      case 'rotate': return RotateCw;
      case 'move': return Move;
      default: return MousePointer;
    }
  };

  const isToolEnabled = (tool: EditTool) => {
    return enabledTools.includes(tool);
  };

  const toggleTool = (tool: EditTool) => {
    onToolToggle(tool);
  };

  const selectTool = (tool: EditTool) => {
    if (isToolEnabled(tool)) {
      onToolChange(tool);
    }
  };

  return (
    <div className={`flex items-center gap-1 p-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-sm ${className}`}>
      {/* Ferramentas de Edição */}
      <div className="flex items-center gap-1">
        {(['select', 'draw', 'erase', 'rotate', 'move'] as EditTool[]).map((tool) => {
          const Icon = getToolIcon(tool);
          const isEnabled = isToolEnabled(tool);
          const isActive = currentTool === tool;

          return (
            <div key={tool} className="relative">
              <button
                onClick={() => selectTool(tool)}
                disabled={!isEnabled}
                className={`
                  w-8 h-8 flex items-center justify-center rounded
                  transition-all duration-200
                  ${isEnabled 
                    ? isActive
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                    : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-600 cursor-not-allowed'
                  }
                `}
                title={EDIT_TOOL_LABELS[tool]}
              >
                <Icon className="w-4 h-4" />
              </button>

              {/* Toggle para habilitar/desabilitar ferramenta */}
              <button
                onClick={() => toggleTool(tool)}
                className={`
                  absolute -top-1 -right-1 w-3 h-3 rounded-full text-xs
                  ${isEnabled 
                    ? 'bg-green-500 text-white' 
                    : 'bg-red-500 text-white'
                  }
                  hover:scale-110 transition-transform
                `}
                title={isEnabled ? 'Desabilitar ferramenta' : 'Habilitar ferramenta'}
              >
                {isEnabled ? '✓' : '✗'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Separador */}
      <div className="w-px h-6 bg-zinc-300 dark:bg-zinc-600 mx-1" />

      {/* Controles de Visualização */}
      <div className="flex items-center gap-1">
        <button
          onClick={onToggleControls}
          className="w-8 h-8 flex items-center justify-center rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          title={showControls ? 'Ocultar controles' : 'Mostrar controles'}
        >
          {showControls ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      {/* Indicador de ferramenta ativa */}
      {currentTool && (
        <div className="ml-2 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs font-medium">
          {EDIT_TOOL_LABELS[currentTool]}
        </div>
      )}
    </div>
  );
}
