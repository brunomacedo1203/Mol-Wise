"use client";

import { useState, useEffect } from "react";
import { KekuleViewer2D } from "./KekuleViewer2D";
import { MoleculeViewer2D } from "./MoleculeViewer2D";
import type { KekuleViewerProps } from "../types/kekuleViewer.types";

interface KekuleViewerWithFallbackProps extends KekuleViewerProps {
  fallbackEnabled?: boolean;
  onFallbackUsed?: (reason: string) => void;
}

export function KekuleViewerWithFallback({
  fallbackEnabled = true,
  onFallbackUsed,
  onError,
  ...props
}: KekuleViewerWithFallbackProps) {
  const [useFallback, setUseFallback] = useState(false);
  const [fallbackReason, setFallbackReason] = useState<string | null>(null);

  // Detecta se Kekule.js está disponível
  useEffect(() => {
    if (!fallbackEnabled) return;

    const checkKekuleAvailability = async () => {
      try {
        // Tenta carregar Kekule.js
        await import('kekule');
        setUseFallback(false);
        setFallbackReason(null);
      } catch (error) {
        console.warn('⚠️ Kekule.js não disponível, usando fallback:', error);
        setUseFallback(true);
        setFallbackReason('Kekule.js não pôde ser carregado');
        onFallbackUsed?.('Kekule.js não pôde ser carregado');
      }
    };

    checkKekuleAvailability();
  }, [fallbackEnabled, onFallbackUsed]);

  // Handler de erro do Kekule para ativar fallback
  const handleKekuleError = (error: Error) => {
    if (fallbackEnabled) {
      console.warn('⚠️ Erro no Kekule.js, ativando fallback:', error);
      setUseFallback(true);
      setFallbackReason(`Erro no Kekule.js: ${error.message}`);
      onFallbackUsed?.(`Erro no Kekule.js: ${error.message}`);
    } else {
      onError?.(error);
    }
  };

  // Se usando fallback, renderiza o componente OpenChemLib
  if (useFallback) {
    return (
      <div className="w-full h-full relative">
        <MoleculeViewer2D />
        
        {/* Indicador de fallback */}
        {fallbackReason && (
          <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs z-10">
            Fallback: {fallbackReason}
          </div>
        )}
      </div>
    );
  }

  // Renderiza Kekule.js
  return (
    <KekuleViewer2D
      {...props}
      onError={handleKekuleError}
    />
  );
}
