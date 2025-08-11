"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useVisualizationStore } from "../store/visualizationStore";
import { useTranslations } from "next-intl";

type OpenChemLibModule = typeof import("openchemlib");

type ViewBox = { minX: number; minY: number; width: number; height: number };

function tightenViewBox(svg: string, scaleFactor = 1.3): string {
  const m = svg.match(/viewBox="([\d.\-\s]+)"/);
  if (!m) return svg;
  const [minX, minY, width, height] = m[1].trim().split(/\s+/).map(Number) as [
    number,
    number,
    number,
    number
  ];

  const newW = width / scaleFactor;
  const dx = (width - newW) / 2;
  const dy = (height - height / scaleFactor) / 2;

  const newMinX = minX + dx;
  const newMinY = minY + dy;

  return svg.replace(
    /viewBox="[^"]+"/,
    `viewBox="${newMinX} ${newMinY} ${newW} ${height / scaleFactor}"`
  );
}

export function MoleculeViewer2D() {
  const svgHostRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);

  const smiles = useVisualizationStore((s) => s.smilesData);
  const sdf = useVisualizationStore((s) => s.sdfData);

  const oclRef = useRef<OpenChemLibModule | null>(null);
  const svgElRef = useRef<SVGSVGElement | null>(null);

  // Guarda o viewBox atual e o inicial (para reset)
  const vbRef = useRef<ViewBox | null>(null);
  const vbInitialRef = useRef<ViewBox | null>(null);

  useEffect(() => {
    let disposed = false;
    async function loadOCL() {
      try {
        const mod: OpenChemLibModule = await import("openchemlib");
        const OCL: OpenChemLibModule =
          (mod as unknown as { default?: OpenChemLibModule }).default ?? mod;
        if (disposed) return;
        oclRef.current = OCL;
        setReady(true);
      } catch (e) {
        console.error(e);
      }
    }
    void loadOCL();
    return () => {
      disposed = true;
    };
  }, []);

  // Helpers p/ ler/escrever viewBox
  const readViewBox = useCallback((svg: SVGSVGElement): ViewBox | null => {
    const vb = svg.getAttribute("viewBox");
    if (!vb) return null;
    const parts = vb.trim().split(/\s+/).map(Number);
    if (parts.length !== 4 || parts.some((n) => Number.isNaN(n))) return null;
    const [minX, minY, width, height] = parts;
    return { minX, minY, width, height };
  }, []);

  const writeViewBox = useCallback((svg: SVGSVGElement, vb: ViewBox) => {
    svg.setAttribute(
      "viewBox",
      `${vb.minX} ${vb.minY} ${vb.width} ${vb.height}`
    );
  }, []);

  // Reset para o estado inicial
  const resetViewBox = useCallback(() => {
    const svg = svgElRef.current;
    if (!svg || !vbInitialRef.current) return;
    vbRef.current = { ...vbInitialRef.current };
    writeViewBox(svg, vbRef.current);
  }, [writeViewBox]);

  // Zoom com a roda (centralizado no cursor)
  const handleWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      const svg = svgElRef.current;
      if (!svg || !vbRef.current) return;
      e.preventDefault();

      const rect = svg.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width; // 0..1
      const relY = (e.clientY - rect.top) / rect.height; // 0..1

      const vb = vbRef.current;
      // deltaY > 0 => out; deltaY < 0 => in
      const zoom = Math.pow(1.0015, e.deltaY);
      const newWidth = vb.width * zoom;

      // Limites de zoom relativos ao inicial
      const init = vbInitialRef.current ?? vb;
      const aspect = init.height / init.width;
      const minW = init.width * 0.1; // 10% (máxima aproximação)
      const maxW = init.width * 4.0; // 400% (máximo afastamento)

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

      vbRef.current = next;
      writeViewBox(svg, next);
    },
    [writeViewBox]
  );

  // Pan com Shift + roda (opcional)
  const handleWheelPan = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      if (!e.shiftKey) return;
      const svg = svgElRef.current;
      if (!svg || !vbRef.current) return;
      e.preventDefault();

      const vb = vbRef.current;
      const panFactor = 0.0015; // maior = pan mais rápido
      const next: ViewBox = {
        minX: vb.minX + vb.width * panFactor * e.deltaY,
        minY: vb.minY + vb.height * panFactor * e.deltaX,
        width: vb.width,
        height: vb.height,
      };

      vbRef.current = next;
      writeViewBox(svg, next);
    },
    [writeViewBox]
  );

  // Estado para controlar o arrastar
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number; vb: ViewBox | null }>({ x: 0, y: 0, vb: null });

  // Iniciar o arrastar
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!vbRef.current) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      vb: { ...vbRef.current }
    };
    // Mudar o cursor para indicar que está arrastando
    if (svgHostRef.current) {
      const svg = svgHostRef.current.querySelector('svg');
      if (svg) svg.style.cursor = 'grabbing';
    }
  }, []);

  // Arrastar
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !dragStartRef.current.vb || !vbRef.current) return;
    
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
      height: vbRef.current.height
    };
    
    vbRef.current = next;
    writeViewBox(svg, next);
  }, [isDragging, writeViewBox]);

  // Finalizar o arrastar
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    // Restaurar o cursor
    if (svgHostRef.current) {
      const svg = svgHostRef.current.querySelector('svg');
      if (svg) svg.style.cursor = 'grab';
    }
  }, []);

  // Eventos de toque para dispositivos móveis
  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!vbRef.current || e.touches.length !== 1) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      vb: { ...vbRef.current }
    };
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !dragStartRef.current.vb || !vbRef.current || e.touches.length !== 1) return;
    e.preventDefault(); // Prevenir scroll da página
    
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
      height: vbRef.current.height
    };
    
    vbRef.current = next;
    writeViewBox(svg, next);
  }, [isDragging, writeViewBox]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Duplo clique para resetar
  const handleDoubleClick = useCallback(() => {
    resetViewBox();
  }, [resetViewBox]);

  useEffect(() => {
    async function render() {
      const host = svgHostRef.current;
      const OCL = oclRef.current;
      if (!host || !OCL || !ready) return;

      try {
        let mol: import("openchemlib").Molecule | null = null;

        if (sdf) {
          try {
            mol = OCL.Molecule.fromMolfile(sdf);
          } catch {}
        }
        if (!mol && smiles) {
          try {
            mol = OCL.Molecule.fromSmiles(smiles);
          } catch {}
        }
        if (!mol) {
          host.innerHTML = "";
          svgElRef.current = null;
          vbRef.current = null;
          vbInitialRef.current = null;
          return;
        }
        try {
          mol.addImplicitHydrogens?.();
        } catch {}
        try {
          mol.ensureHelperArrays?.(OCL.Molecule?.cHelperNeighbours ?? 0);
        } catch {}

        // Baseia o desenho no tamanho real do host
        const w = Math.max(800, Math.floor(host.clientWidth || 800));
        const h = Math.max(600, Math.floor(host.clientHeight || 600));

        const svg = (
          mol as unknown as {
            toSVG: (w: number, h: number, opts?: unknown) => string;
          }
        ).toSVG(w, h, {
          autoCrop: true,
          margin: 6, // menos espaço “morto” ao redor
        });

        // 🔎 Aumenta o tamanho INICIAL apertando o viewBox (ex.: 30%)
        const initialZoomed = tightenViewBox(svg, 1.3);

        // Responsivo + centralizado
        const svgWithStyle = initialZoomed
          .replace("<svg", '<svg preserveAspectRatio="xMidYMid meet"')
          .replace(
            "<svg",
            '<svg style="max-width: 100%; max-height: 100%; width: auto; height: auto; display: block; cursor: grab; touch-action: none;"'
          );

        host.innerHTML = svgWithStyle;

        // Guarda referências pós-zoom-inicial
        const svgEl = host.querySelector("svg") as SVGSVGElement | null;
        svgElRef.current = svgEl;

        const vb = svgEl ? readViewBox(svgEl) : null;
        if (vb) {
          vbRef.current = { ...vb };
          vbInitialRef.current = { ...vb }; // inicial já “apertado” = estado de reset
        }
      } catch (e) {
        console.error(e);
      }
    }
    void render();
  }, [sdf, smiles, ready, readViewBox]);

  // Handlers no wrapper
  const onWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      if (e.shiftKey) {
        handleWheelPan(e);
      } else {
        handleWheel(e);
      }
    },
    [handleWheel, handleWheelPan]
  );

  // Obter traduções para os controles
  const t = useTranslations("visualization.controls");

  return (
    <div className="w-full h-full">
      <div
        ref={svgHostRef}
        onWheel={onWheel}
        onDoubleClick={handleDoubleClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        className="w-full h-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 overflow-hidden flex items-center justify-center select-none"
        style={{ touchAction: "none" }}
        title={t("tooltip")}
      />
      {!ready && (
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Carregando motor 2D…
        </p>
      )}
    </div>
  );
}
