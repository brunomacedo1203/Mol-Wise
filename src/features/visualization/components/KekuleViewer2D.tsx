"use client";

import { useRef, useEffect } from "react";
import { useVisualizationStore } from "../store/visualizationStore";
import { useKekuleRenderer } from "../hooks/useKekuleRenderer";
import { DEFAULT_KEKULE_CONFIG } from "../constants/kekuleViewer.constants";
import type { KekuleViewerProps } from "../types/kekuleViewer.types";

export function KekuleViewer2D({
  config = {},
  onMoleculeChange,
  onError,
  className = "",
  style,
}: KekuleViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Dados do store
  const smiles = useVisualizationStore((s) => s.smilesData);
  const sdf = useVisualizationStore((s) => s.sdfData);

  // Configuração mesclada com padrões
  const mergedConfig = {
    ...DEFAULT_KEKULE_CONFIG,
    ...config,
  };

  // Hook de renderização
  const {
    isReady,
    hasError,
    errorMessage,
    isEditing,
    currentTool,
    molecule,
    _widget,
    _loadMolecule,
    _applyConfigToWidget,
  } = useKekuleRenderer({
    containerRef,
    smiles,
    sdf,
    config: mergedConfig,
    onMoleculeChange,
    onError,
  });

  // Aplica tema claro/escuro
  useEffect(() => {
    if (!containerRef.current) return;

    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      const container = containerRef.current;
      
      if (container) {
        if (isDark) {
          container.classList.add("dark");
          container.classList.remove("light");
        } else {
          container.classList.add("light");
          container.classList.remove("dark");
        }
      }
    };

    // Aplica tema inicial
    updateTheme();

    // Observa mudanças de tema
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`w-full h-full relative ${className}`}
      style={style}
    >
      {/* Container principal do Kekule */}
      <div
        ref={containerRef}
        className="w-full h-full relative overflow-hidden"
        style={{
          contain: "layout style paint",
          backgroundColor: mergedConfig.backgroundColor,
        }}
      >
        {/* Estado de carregamento */}
        {!isReady && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-zinc-900">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Carregando Kekule.js...
              </p>
            </div>
          </div>
        )}

        {/* Estado de erro */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-zinc-900">
            <div className="text-center p-4">
              <div className="text-red-500 mb-2">
                <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                Erro ao carregar visualizador
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-500">
                {errorMessage}
              </p>
            </div>
          </div>
        )}

        {/* Indicador de ferramenta ativa */}
        {isReady && currentTool && (
          <div className="absolute top-2 left-2 bg-white dark:bg-zinc-800 px-2 py-1 rounded text-xs text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
            Ferramenta: {currentTool}
          </div>
        )}

        {/* Indicador de modo de edição */}
        {isReady && isEditing && (
          <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs">
            Modo Edição
          </div>
        )}
      </div>

      {/* Overlay de informações quando não há molécula */}
      {isReady && !molecule && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center p-4 bg-white/80 dark:bg-zinc-900/80 rounded-lg">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Nenhuma molécula carregada
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">
              Use a barra de busca para carregar uma molécula
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
