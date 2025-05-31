import { useCallback } from "react";
import { RndDragCallback, RndResizeCallback } from "react-rnd";
import { PositionWithWidth } from "../domain/types/calculator";
import { CALCULATOR_CONSTANTS } from "../config/constants";

interface UseCalculatorPositionProps {
  initialPosition?: PositionWithWidth;
  onPositionChange?: (position: PositionWithWidth) => void;
}

interface UseCalculatorPositionReturn {
  defaultPosition: {
    x: number;
    y: number;
    width: number;
    height: string;
  };
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
    (position: PositionWithWidth) => {
      onPositionChange?.(position);
    },
    [onPositionChange]
  );

  const handleDragStop: RndDragCallback = useCallback(
    (_, { x, y }) => {
      handlePositionChange({
        x,
        y,
        width: CALCULATOR_CONSTANTS.DIMENSIONS.DEFAULT_WIDTH,
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

  const defaultPosition = {
    x: initialPosition?.x ?? CALCULATOR_CONSTANTS.DIMENSIONS.DEFAULT_X,
    y: initialPosition?.y ?? CALCULATOR_CONSTANTS.DIMENSIONS.DEFAULT_Y,
    width: CALCULATOR_CONSTANTS.DIMENSIONS.DEFAULT_WIDTH,
    height: CALCULATOR_CONSTANTS.DIMENSIONS.DEFAULT_HEIGHT,
  };

  return {
    defaultPosition,
    handleDragStop,
    handleResizeStop,
  };
} 