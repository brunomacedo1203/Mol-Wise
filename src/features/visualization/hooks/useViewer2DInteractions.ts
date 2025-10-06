import { useCallback, useRef, useState } from "react";
import { ViewBox } from "../types/viewer2d.types";
import { writeViewBox, clampViewBox } from "../utils/viewBoxUtils";
import {
  WHEEL_ZOOM_SENSITIVITY,
  MIN_ZOOM,
  MAX_ZOOM,
  WHEEL_PAN_SENSITIVITY,
} from "../constants/viewer2d.constants";
import { useVisualizationStore } from "../store/visualizationStore";
import { getMoleculeKey } from "../utils/moleculeKey";
import { trackMolecule2DInteraction } from "../events/molecule2DEvents";

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

  const lastInteractionRef = useRef<{
    type: string;
    timestamp: number;
  }>({ type: "", timestamp: 0 });
  
  const interactionDebounceMs = 1000;

  const smiles = useVisualizationStore((s) => s.smilesData);
  const sdf = useVisualizationStore((s) => s.sdfData);
  const setZoom2D = useVisualizationStore((s) => s.setZoom2D);

  const saveVB = useCallback(
    (vb: ViewBox) => {
      const key = getMoleculeKey(smiles, sdf);
      setZoom2D(key, vb);
    },
    [smiles, sdf, setZoom2D]
  );

  const trackInteraction = useCallback(
    (type: "zoom" | "pan" | "reset_view" | "double_click" | "wheel_zoom" | "style_change", value?: string) => {
      const now = Date.now();
      const last = lastInteractionRef.current;
      
      if (last.type === type && now - last.timestamp < interactionDebounceMs) {
        return;
      }
      
      lastInteractionRef.current = { type, timestamp: now };
      
      const moleculeName = getMoleculeKey(smiles, sdf);
      trackMolecule2DInteraction({
        molecule_name: moleculeName,
        interaction_type: type,
        interaction_value: value,
        section: "molecule_viewer_2d",
      });
    },
    [smiles, sdf]
  );

  const resetViewBox = useCallback(() => {
    const svg = svgElRef.current;
    if (!svg || !vbRef.current || !vbInitialRef.current) return;
    const init = vbInitialRef.current;
    vbRef.current = { ...init };
    writeViewBox(svg, init);
    saveVB(init);
    
    trackInteraction("reset_view");
  }, [svgElRef, vbRef, vbInitialRef, saveVB, trackInteraction]);

  const handleWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      const svg = svgElRef.current;
      if (!svg || !vbRef.current || !vbInitialRef.current) return;
      e.preventDefault();

      const rect = svg.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width;
      const relY = (e.clientY - rect.top) / rect.height;

      const vb = vbRef.current;
      const zoom = Math.pow(1 + WHEEL_ZOOM_SENSITIVITY, -e.deltaY);
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

      const clamped = clampViewBox(next, vbInitialRef.current, contentBoundsRef.current);
      vbRef.current = clamped;
      writeViewBox(svg, clamped);
      saveVB(clamped);
      
      trackInteraction("zoom", zoom > 1 ? "zoom_in" : "zoom_out");
    },
    [svgElRef, vbRef, vbInitialRef, contentBoundsRef, saveVB, trackInteraction]
  );

  const handleWheelPan = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      const svg = svgElRef.current;
      if (!svg || !vbRef.current || !vbInitialRef.current) return;
      e.preventDefault();

      const vb = vbRef.current;
      const dx = e.deltaX * WHEEL_PAN_SENSITIVITY;
      const dy = e.deltaY * WHEEL_PAN_SENSITIVITY;

      const next: ViewBox = {
        minX: vb.minX + dx,
        minY: vb.minY + dy,
        width: vb.width,
        height: vb.height,
      };

      const clamped = clampViewBox(next, vbInitialRef.current, contentBoundsRef.current);
      vbRef.current = clamped;
      writeViewBox(svg, clamped);
      saveVB(clamped);
      
      trackInteraction("pan", "wheel_pan");
    },
    [svgElRef, vbRef, vbInitialRef, contentBoundsRef, saveVB, trackInteraction]
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      const scaleX = dragStartRef.current.vb.width / (svgElRef.current?.clientWidth || 1);
      const scaleY = dragStartRef.current.vb.height / (svgElRef.current?.clientHeight || 1);

      const next: ViewBox = {
        minX: dragStartRef.current.vb.minX - dx * scaleX,
        minY: dragStartRef.current.vb.minY - dy * scaleY,
        width: dragStartRef.current.vb.width,
        height: dragStartRef.current.vb.height,
      };

      const svg = svgElRef.current!;
      const clamped = clampViewBox(next, vbInitialRef.current, contentBoundsRef.current);
      vbRef.current = clamped;
      writeViewBox(svg, clamped);
    },
    [isDragging, svgElRef, vbRef, vbInitialRef, contentBoundsRef]
  );

  const handleMouseUp = useCallback(() => {
    const wasDragging = isDragging;
    setIsDragging(false);
    if (svgHostRef.current) {
      const svg = svgHostRef.current.querySelector("svg");
      if (svg) svg.style.cursor = "grab";
    }
    if (vbRef.current) {
      saveVB(vbRef.current);
      
      if (wasDragging) {
        trackInteraction("pan", "mouse_drag");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!vbRef.current) return;
    setIsDragging(true);
    const t = e.touches[0];
    dragStartRef.current = {
      x: t.clientX,
      y: t.clientY,
      vb: { ...vbRef.current },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (
        !isDragging ||
        !dragStartRef.current.vb ||
        !vbRef.current ||
        !vbInitialRef.current
      )
        return;

      const t = e.touches[0];
      const dx = t.clientX - dragStartRef.current.x;
      const dy = t.clientY - dragStartRef.current.y;

      const scaleX = dragStartRef.current.vb.width / (svgElRef.current?.clientWidth || 1);
      const scaleY = dragStartRef.current.vb.height / (svgElRef.current?.clientHeight || 1);

      const next: ViewBox = {
        minX: dragStartRef.current.vb.minX - dx * scaleX,
        minY: dragStartRef.current.vb.minY - dy * scaleY,
        width: dragStartRef.current.vb.width,
        height: dragStartRef.current.vb.height,
      };

      const svg = svgElRef.current!;
      const clamped = clampViewBox(next, vbInitialRef.current, contentBoundsRef.current);
      vbRef.current = clamped;
      writeViewBox(svg, clamped);
    },
    [isDragging, svgElRef, vbRef, vbInitialRef, contentBoundsRef]
  );

  const handleTouchEnd = useCallback(() => {
    const wasDragging = isDragging;
    setIsDragging(false);
    if (vbRef.current) {
      saveVB(vbRef.current);
      
      if (wasDragging) {
        trackInteraction("pan", "touch_drag");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);

  const handleDoubleClick = useCallback(() => {
    resetViewBox();
    trackInteraction("double_click", "reset_view");
  }, [resetViewBox, trackInteraction]);

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
