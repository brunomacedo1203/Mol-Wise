import { useCallback, useRef, useState } from "react";
import { ViewBox } from "../types/viewer2d.types";
import { writeViewBox, clampViewBox } from "../utils/viewBoxUtils";
import {
  WHEEL_ZOOM_SENSITIVITY,
  MIN_ZOOM,
  MAX_ZOOM,
  WHEEL_PAN_SENSITIVITY,
} from "../constants/viewer2d.constants";

interface UseViewer2DInteractionsProps {
  svgElRef: React.RefObject<SVGSVGElement | null>;
  svgHostRef: React.RefObject<HTMLDivElement | null>;
  vbRef: React.RefObject<ViewBox | null>;
  vbInitialRef: React.RefObject<ViewBox | null>;
  contentBoundsRef: React.RefObject<ViewBox | null>;
}

export function useViewer2DInteractions({
  svgElRef,
  svgHostRef,
  vbRef,
  vbInitialRef,
  contentBoundsRef,
}: UseViewer2DInteractionsProps) {
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number; vb: ViewBox | null }>({
    x: 0,
    y: 0,
    vb: null,
  });

  const resetViewBox = useCallback(() => {
    const svg = svgElRef.current;
    if (!svg || !vbInitialRef.current) return;
    vbRef.current = { ...vbInitialRef.current };
    writeViewBox(svg, vbRef.current);
  }, [svgElRef, vbRef, vbInitialRef]);

  // Zoom (scroll)
  const handleWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      const svg = svgElRef.current;
      if (!svg || !vbRef.current || !vbInitialRef.current) return;
      e.preventDefault();

      const rect = svg.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width;
      const relY = (e.clientY - rect.top) / rect.height;

      const vb = vbRef.current;
      const zoom = Math.pow(1 + WHEEL_ZOOM_SENSITIVITY, e.deltaY);
      const newWidth = vb.width * zoom;

      const init = vbInitialRef.current;
      const aspect = init.height / init.width;
      const minW = init.width * MIN_ZOOM;
      const maxW = init.width * MAX_ZOOM;

      const clampedW = Math.min(Math.max(newWidth, minW), maxW);
      const clampedH = clampedW * aspect;

      const dx = (vb.width - clampedW) * relX;
      const dy = (vb.height - clampedH) * relY;

      const next: ViewBox = {
        minX: vb.minX + dx,
        minY: vb.minY + dy,
        width: clampedW,
        height: clampedH,
      };

      // Aplica limites ao viewBox para zoom extremo
      const clamped = clampViewBox(next, init, contentBoundsRef.current);
      vbRef.current = clamped;
      writeViewBox(svg, clamped);
    },
    [svgElRef, vbRef, vbInitialRef, contentBoundsRef]
  );

  // Pan (Shift + scroll)
  const handleWheelPan = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      if (!e.shiftKey) return;
      const svg = svgElRef.current;
      if (!svg || !vbRef.current || !vbInitialRef.current) return;
      e.preventDefault();

      const vb = vbRef.current;
      const next: ViewBox = {
        minX: vb.minX + vb.width * WHEEL_PAN_SENSITIVITY * e.deltaY,
        minY: vb.minY + vb.height * WHEEL_PAN_SENSITIVITY * e.deltaX,
        width: vb.width,
        height: vb.height,
      };

      // Aplica limites ao viewBox
      const clamped = clampViewBox(next, vbInitialRef.current, contentBoundsRef.current);
      vbRef.current = clamped;
      writeViewBox(svg, clamped);
    },
    [svgElRef, vbRef, vbInitialRef, contentBoundsRef]
  );

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!vbRef.current) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      vb: { ...vbRef.current },
    };
    if (svgHostRef.current) {
      const svg = svgHostRef.current.querySelector("svg");
      if (svg) svg.style.cursor = "grabbing";
    }
  }, [vbRef, svgHostRef]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (
        !isDragging ||
        !dragStartRef.current.vb ||
        !vbRef.current ||
        !vbInitialRef.current
      )
        return;

      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;

      const svg = svgElRef.current;
      if (!svg) return;

      const rect = svg.getBoundingClientRect();
      const scaleX = vbRef.current.width / rect.width;
      const scaleY = vbRef.current.height / rect.height;

      const next: ViewBox = {
        minX: dragStartRef.current.vb.minX - dx * scaleX,
        minY: dragStartRef.current.vb.minY - dy * scaleY,
        width: vbRef.current.width,
        height: vbRef.current.height,
      };

      // Aplica limites ao viewBox durante o drag
      const clamped = clampViewBox(next, vbInitialRef.current, contentBoundsRef.current);
      vbRef.current = clamped;
      writeViewBox(svg, clamped);
    },
    [isDragging, svgElRef, vbRef, vbInitialRef, contentBoundsRef]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (svgHostRef.current) {
      const svg = svgHostRef.current.querySelector("svg");
      if (svg) svg.style.cursor = "grab";
    }
  }, [svgHostRef]);

  // Touch
  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (!vbRef.current || e.touches.length !== 1) return;
      setIsDragging(true);
      dragStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        vb: { ...vbRef.current },
      };
    },
    [vbRef]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (
        !isDragging ||
        !dragStartRef.current.vb ||
        !vbRef.current ||
        !vbInitialRef.current ||
        e.touches.length !== 1
      )
        return;
      e.preventDefault();

      const dx = e.touches[0].clientX - dragStartRef.current.x;
      const dy = e.touches[0].clientY - dragStartRef.current.y;

      const svg = svgElRef.current;
      if (!svg) return;

      const rect = svg.getBoundingClientRect();
      const scaleX = vbRef.current.width / rect.width;
      const scaleY = vbRef.current.height / rect.height;

      const next: ViewBox = {
        minX: dragStartRef.current.vb.minX - dx * scaleX,
        minY: dragStartRef.current.vb.minY - dy * scaleY,
        width: vbRef.current.width,
        height: vbRef.current.height,
      };

      // Aplica limites ao viewBox durante o touch
      const clamped = clampViewBox(next, vbInitialRef.current, contentBoundsRef.current);
      vbRef.current = clamped;
      writeViewBox(svg, clamped);
    },
    [isDragging, svgElRef, vbRef, vbInitialRef, contentBoundsRef]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDoubleClick = useCallback(() => {
    resetViewBox();
  }, [resetViewBox]);

  const onWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      if (e.shiftKey) handleWheelPan(e);
      else handleWheel(e);
    },
    [handleWheel, handleWheelPan]
  );

  return {
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleDoubleClick,
    onWheel,
  };
}