import { createContext, ReactNode, useState } from "react";
import { Element } from "../domain/types/element";
import { PeriodicTableConfig, defaultConfig } from "../domain/types/config";

interface PeriodicTableContextData {
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

interface PeriodicTableProviderProps {
  /**
   * Conteúdo do provider
   */
  children: ReactNode;

  /**
   * Configuração inicial da tabela periódica
   */
  initialConfig?: Partial<PeriodicTableConfig>;
}

/**
 * Contexto da tabela periódica
 */
export const PeriodicTableContext = createContext<PeriodicTableContextData>(
  {} as PeriodicTableContextData
);

/**
 * Provider do contexto da tabela periódica
 */
export function PeriodicTableProvider({
  children,
  initialConfig,
}: PeriodicTableProviderProps) {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [config, setConfig] = useState<PeriodicTableConfig>({
    ...defaultConfig,
    ...initialConfig,
  });

  const handleSetConfig = (newConfig: Partial<PeriodicTableConfig>) => {
    setConfig((prev: PeriodicTableConfig) => ({
      ...prev,
      ...newConfig,
    }));
  };

  return (
    <PeriodicTableContext.Provider
      value={{
        selectedElement,
        setSelectedElement,
        config,
        setConfig: handleSetConfig,
      }}
    >
      {children}
    </PeriodicTableContext.Provider>
  );
}
