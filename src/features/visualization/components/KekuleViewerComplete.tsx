"use client";

import { useState } from "react";
import { KekuleViewerWithFallback } from "./KekuleViewerWithFallback";
import { KekuleViewerControls } from "./KekuleViewerControls";
import { KekuleEditToolbar } from "./KekuleEditToolbar";
import { useKekuleConfig } from "../hooks/useKekuleConfig";
import { useKekuleEditTools } from "../hooks/useKekuleEditTools";
import type { KekuleViewerProps } from "../types/kekuleViewer.types";

interface KekuleViewerCompleteProps extends KekuleViewerProps {
  showControls?: boolean;
  showToolbar?: boolean;
  toolbarPosition?: "top" | "bottom" | "left" | "right";
  controlsPosition?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export function KekuleViewerComplete({
  showControls = true,
  showToolbar = true,
  toolbarPosition = "top",
  controlsPosition = "right",
  className = "",
  config: initialConfig,
  onMoleculeChange,
  onError,
  ...props
}: KekuleViewerCompleteProps) {
  const [showControlsPanel, setShowControlsPanel] = useState(true);

  // Configurações
  const { config, updateConfig } = useKekuleConfig(initialConfig);

  // Ferramentas de edição
  const { currentTool, enabledTools, isEditing, setCurrentTool, toggleTool } =
    useKekuleEditTools(config.enabledTools);

  // Atualiza configurações quando ferramentas mudam
  const handleConfigChange = (updates: Record<string, unknown>) => {
    updateConfig(updates);
  };

  // Atualiza ferramentas habilitadas na configuração
  const handleToolToggle = (tool: Parameters<typeof toggleTool>[0]) => {
    toggleTool(tool);
    // Atualiza a configuração com as ferramentas habilitadas
    updateConfig({ enabledTools: enabledTools });
  };

  // Posicionamento dos controles
  const getControlsPosition = () => {
    switch (controlsPosition) {
      case "top":
        return "absolute top-0 left-0 right-0 z-10";
      case "bottom":
        return "absolute bottom-0 left-0 right-0 z-10";
      case "left":
        return "absolute top-0 left-0 bottom-0 z-10";
      case "right":
        return "absolute top-0 right-0 bottom-0 z-10";
      default:
        return "absolute top-0 right-0 z-10";
    }
  };

  const getToolbarPosition = () => {
    switch (toolbarPosition) {
      case "top":
        return "absolute top-0 left-0 right-0 z-20";
      case "bottom":
        return "absolute bottom-0 left-0 right-0 z-20";
      case "left":
        return "absolute top-0 left-0 bottom-0 z-20";
      case "right":
        return "absolute top-0 right-0 bottom-0 z-20";
      default:
        return "absolute top-0 left-0 right-0 z-20";
    }
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Viewer Principal */}
      <div className="w-full h-full">
        <KekuleViewerWithFallback
          config={config}
          onMoleculeChange={onMoleculeChange}
          onError={onError}
          {...props}
        />
      </div>

      {/* Toolbar de Edição */}
      {showToolbar && (
        <div className={getToolbarPosition()}>
          <div className="p-2">
            <KekuleEditToolbar
              enabledTools={enabledTools}
              currentTool={currentTool}
              onToolChange={setCurrentTool}
              onToolToggle={handleToolToggle}
              showControls={showControlsPanel}
              onToggleControls={() => setShowControlsPanel(!showControlsPanel)}
            />
          </div>
        </div>
      )}

      {/* Painel de Controles */}
      {showControls && showControlsPanel && (
        <div className={getControlsPosition()}>
          <div className="p-2 max-w-sm">
            <KekuleViewerControls
              config={config}
              onConfigChange={handleConfigChange}
            />
          </div>
        </div>
      )}

      {/* Indicador de modo de edição */}
      {isEditing && (
        <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs z-30">
          Modo Edição Ativo
        </div>
      )}
    </div>
  );
}
