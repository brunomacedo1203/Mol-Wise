import { useCallback, useMemo } from "react";
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

  const defaultPosition = useMemo(() => {
    if (typeof window !== "undefined") {
      const viewportWidth = window.innerWidth;
      const availableWidth = Math.max(
        containerStyles.rnd.minWidth,
        Math.min(containerStyles.rnd.defaultWidth, viewportWidth)
      );
      const width = Math.min(containerStyles.rnd.defaultWidth, availableWidth);

      const desiredX = initialPosition?.x ?? 100;
      const horizontalSpace = Math.max(0, viewportWidth - width);
      const margin = Math.min(12, horizontalSpace / 2);
      const minX = margin;
      const maxX = Math.max(minX, viewportWidth - width - margin);
      const x = Math.min(Math.max(minX, desiredX), maxX);

      return {
        x,
        y: initialPosition?.y ?? 100,
        width,
        height: containerStyles.rnd.defaultHeight,
      };
    }

    return {
      x: initialPosition?.x ?? 100,
      y: initialPosition?.y ?? 100,
      width: containerStyles.rnd.defaultWidth,
      height: containerStyles.rnd.defaultHeight,
    };
  }, [initialPosition?.x, initialPosition?.y]);

  const handleDragStop: RndDragCallback = useCallback(
    (_, { x, y }) => {
      handlePositionChange({
        x,
        y,
        width: defaultPosition.width,
      });
    },
    [defaultPosition.width, handlePositionChange]
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
