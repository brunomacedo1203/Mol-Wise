import { useEffect, useState } from "react";
import { MIN_CANVAS_WIDTH, MIN_CANVAS_HEIGHT } from "../constants/viewer3d.constants";
import { getElementSize } from "../utils/elementSize";

export function useViewer3DContainerReady(
  containerRef: React.RefObject<HTMLDivElement | null>
) {
  const [containerReady, setContainerReady] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const checkDimensions = () => {
      const { width, height } = getElementSize(el);

      if (width >= MIN_CANVAS_WIDTH && height >= MIN_CANVAS_HEIGHT) {
        setContainerReady(true);
        return true;
      }
      return false;
    };

    if (checkDimensions()) return;

    const observer = new ResizeObserver(() => {
      if (checkDimensions()) observer.disconnect();
    });
    observer.observe(el);

    const timeoutId = setTimeout(() => {
      if (checkDimensions()) observer.disconnect();
    }, 100);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [containerRef]);

  return containerReady;
}