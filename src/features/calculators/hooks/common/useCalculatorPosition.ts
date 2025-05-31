import { useCallback } from "react";
import { RndDragCallback, RndResizeCallback } from "react-rnd";
import { Position } from "@/features/calculators/domain/types";
import { containerStyles } from "../../styles/containerStyles";

interface UseCalculatorPositionProps {
  initialPosition?: Position;
  onPositionChange?: (position: Position & { width: number }) => void;
}

interface UseCalculatorPositionReturn {
  defaultPosition: Position & { width: number; height: number };
  handlePositionChange: (position: Position & { width: number }) => void;
  handleDragStop: RndDragCallback;
  handleResizeStop: RndResizeCallback;
}

/**
 * Hook para gerenciar o posicionamento e redimensionamento da calculadora
 * @param initialPosition - Posição inicial opcional da calculadora
 * @param onPositionChange - Callback chamado quando a posição muda
 * @returns Objeto com posição padrão e handlers de eventos
 */
export function useCalculatorPosition({
  initialPosition,
  onPositionChange,
}: UseCalculatorPositionProps): UseCalculatorPositionReturn {
  const handlePositionChange = useCallback(
    (position: Position & { width: number }) => {
      onPositionChange?.(position);
    },
    [onPositionChange]
  );

  const defaultPosition = {
    x: initialPosition?.x ?? 100,
    y: initialPosition?.y ?? 100,
    width: containerStyles.rnd.defaultWidth,
    height: containerStyles.rnd.defaultHeight,
  };

  const handleDragStop: RndDragCallback = useCallback(
    (_, { x, y }) => {
      handlePositionChange({
        x,
        y,
        width: containerStyles.rnd.defaultWidth,
      });
    },
    [handlePositionChange]
  );

  const handleResizeStop: RndResizeCallback = useCallback(
    (_, __, ref, ___, { x, y }) => {
      handlePositionChange({
        x,
        y,
        width: ref.offsetWidth,
      });
    },
    [handlePositionChange]
  );

  return {
    defaultPosition,
    handlePositionChange,
    handleDragStop,
    handleResizeStop,
  };
} 