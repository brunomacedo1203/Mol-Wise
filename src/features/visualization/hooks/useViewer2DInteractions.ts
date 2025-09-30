// src/features/visualization/hooks/useViewer2DInteractions.ts
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

  // acesso à store p/ persistir zoom
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

  const resetViewBox = useCallback(() => {
    const svg = svgElRef.current;
    if (!svg || !vbRef.current || !vbInitialRef.current) return;
    const init = vbInitialRef.current;
    vbRef.current = { ...init };
    writeViewBox(svg, init);
    saveVB(init); // persiste reset
    
    // Track reset interaction
    const moleculeName = getMoleculeKey(smiles, sdf);
    trackMolecule2DInteraction({
      molecule_name: moleculeName,
      interaction_type: "reset_view",
      section: "molecule_viewer_2d",
    });
  }, [svgElRef, vbRef, vbInitialRef, saveVB, smiles, sdf]);

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

      const clamped = clampViewBox(next, vbInitialRef.current, contentBoundsRef.current);
      vbRef.current = clamped;
      writeViewBox(svg, clamped);
      saveVB(clamped);
      
      // Track wheel zoom interaction
      const moleculeName = getMoleculeKey(smiles, sdf);
      trackMolecule2DInteraction({
        molecule_name: moleculeName,
        interaction_type: "wheel_zoom",
        interaction_value: zoom > 1 ? "zoom_in" : "zoom_out",
        section: "molecule_viewer_2d",
      });
    },
    [svgElRef, vbRef, vbInitialRef, contentBoundsRef, saveVB, smiles, sdf]
  );

  // Pan com wheel (Shift)
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
      
      // Track wheel pan interaction
      const moleculeName = getMoleculeKey(smiles, sdf);
      trackMolecule2DInteraction({
        molecule_name: moleculeName,
        interaction_type: "pan",
        interaction_value: "wheel_pan",
        section: "molecule_viewer_2d",
      });
    },
    [svgElRef, vbRef, vbInitialRef, contentBoundsRef, saveVB, smiles, sdf]
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
      // não salva a cada move para não sobrecarregar; salvamos no mouseUp
    },
    [isDragging, svgElRef, vbRef, vbInitialRef, contentBoundsRef]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (svgHostRef.current) {
      const svg = svgHostRef.current.querySelector("svg");
      if (svg) svg.style.cursor = "grab";
    }
    if (vbRef.current) {
      saveVB(vbRef.current);
      
      // Track pan interaction on mouse up
      const moleculeName = getMoleculeKey(smiles, sdf);
      trackMolecule2DInteraction({
        molecule_name: moleculeName,
        interaction_type: "pan",
        interaction_value: "mouse_drag",
        section: "molecule_viewer_2d",
      });
    }
  }, [svgHostRef, vbRef, saveVB, smiles, sdf]);

  // Touch
  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!vbRef.current) return;
    setIsDragging(true);
    const t = e.touches[0];
    dragStartRef.current = {
      x: t.clientX,
      y: t.clientY,
      vb: { ...vbRef.current },
    };
  }, [vbRef]);

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
      // salvar apenas no touchEnd
    },
    [isDragging, svgElRef, vbRef, vbInitialRef, contentBoundsRef]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    if (vbRef.current) {
      saveVB(vbRef.current);
      
      // Track pan interaction on touch end
      const moleculeName = getMoleculeKey(smiles, sdf);
      trackMolecule2DInteraction({
        molecule_name: moleculeName,
        interaction_type: "pan",
        interaction_value: "touch_drag",
        section: "molecule_viewer_2d",
      });
    }
  }, [saveVB, vbRef, smiles, sdf]);

  const handleDoubleClick = useCallback(() => {
    resetViewBox();
    
    // Track double click interaction
    const moleculeName = getMoleculeKey(smiles, sdf);
    trackMolecule2DInteraction({
      molecule_name: moleculeName,
      interaction_type: "double_click",
      interaction_value: "reset_view",
      section: "molecule_viewer_2d",
    });
  }, [resetViewBox, smiles, sdf]);

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
