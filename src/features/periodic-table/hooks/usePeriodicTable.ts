import { usePeriodicTableStore } from "../store/periodicTableStore";
import { Element } from "../domain/types/element";
import { PeriodicTableConfig } from "../domain/types/config";

interface UsePeriodicTableReturn {
  selectedElement: Element | null;
  setSelectedElement: (element: Element | null) => void;
  config: PeriodicTableConfig;
  setConfig: (config: Partial<PeriodicTableConfig>) => void;
}

export function usePeriodicTable(): UsePeriodicTableReturn {
  const selectedElement = usePeriodicTableStore((state) => state.selectedElement);
  const setSelectedElement = usePeriodicTableStore((state) => state.setSelectedElement);
  const config = usePeriodicTableStore((state) => state.config);
  const setConfig = usePeriodicTableStore((state) => state.setConfig);

  return {
    selectedElement,
    setSelectedElement,
    config,
    setConfig,
  };
} 