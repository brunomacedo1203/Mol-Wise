import { useContext } from "react";
import { PeriodicTableContext } from "../contexts/PeriodicTableContext";
import { Element } from "../domain/types/element";
import type { PeriodicTableConfig } from "../domain/types/config";

export interface UsePeriodicTableReturn {
  /**
   * Elemento químico atualmente selecionado
   */
  selectedElement: Element | null;

  /**
   * Função para atualizar o elemento selecionado
   */
  setSelectedElement: (element: Element | null) => void;

  /**
   * Configuração atual da tabela periódica
   */
  config: PeriodicTableConfig;

  /**
   * Função para atualizar a configuração
   */
  setConfig: (config: Partial<PeriodicTableConfig>) => void;
}

/**
 * Hook para gerenciar o estado da tabela periódica
 */
export function usePeriodicTable(): UsePeriodicTableReturn {
  const context = useContext(PeriodicTableContext);

  if (!context) {
    throw new Error(
      "usePeriodicTable deve ser usado dentro de um PeriodicTableProvider"
    );
  }

  return {
    selectedElement: context.selectedElement,
    setSelectedElement: context.setSelectedElement,
    config: context.config,
    setConfig: context.setConfig,
  };
} 