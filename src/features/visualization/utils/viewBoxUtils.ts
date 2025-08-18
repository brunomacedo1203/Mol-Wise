import { ViewBox } from "../types/viewer2d.types";

/** Lê o viewBox de um elemento SVG */
export function readViewBox(svg: SVGSVGElement): ViewBox | null {
  const vb = svg.getAttribute("viewBox");
  if (!vb) return null;
  const parts = vb.trim().split(/\s+/).map(Number);
  if (parts.length !== 4 || parts.some((n) => Number.isNaN(n))) return null;
  const [minX, minY, width, height] = parts;
  return { minX, minY, width, height };
}

/** Escreve o viewBox em um elemento SVG */
export function writeViewBox(svg: SVGSVGElement, vb: ViewBox) {
  svg.setAttribute(
    "viewBox",
    `${vb.minX} ${vb.minY} ${vb.width} ${vb.height}`
  );
}

/** Nova função de limitação baseada no conteúdo real */
export function clampViewBox(
  vb: ViewBox,
  init: ViewBox,
  contentBounds: ViewBox | null
): ViewBox {
  if (!contentBounds) {
    // Fallback para o comportamento anterior se não conseguirmos calcular os bounds
    const maxOffsetX = init.width * 0.37;
    const maxOffsetY = init.height * 0.25;

    const clampedMinX = Math.max(
      init.minX - maxOffsetX,
      Math.min(init.minX + maxOffsetX, vb.minX)
    );
    const clampedMinY = Math.max(
      init.minY - maxOffsetY,
      Math.min(init.minY + maxOffsetY, vb.minY)
    );

    const maxWidth = init.width * 4.0;
    const maxHeight = init.height * 4.0;

    return {
      minX: clampedMinX,
      minY: clampedMinY,
      width: Math.min(vb.width, maxWidth),
      height: Math.min(vb.height, maxHeight),
    };
  }

  // Limites de zoom baseados no tamanho inicial
  const minWidth = init.width * 0.1;
  const maxWidth = init.width * 4.0;
  const aspect = init.height / init.width;

  // Clamp do zoom
  const clampedWidth = Math.min(Math.max(vb.width, minWidth), maxWidth);
  const clampedHeight = clampedWidth * aspect;

  // Calcula os limites para que a molécula não saia da vista
  // A molécula deve estar sempre pelo menos parcialmente visível
  const moleculeLeft = contentBounds.minX;
  const moleculeRight = contentBounds.minX + contentBounds.width;
  const moleculeTop = contentBounds.minY;
  const moleculeBottom = contentBounds.minY + contentBounds.height;

  // Limites do viewBox: deve mostrar pelo menos uma parte da molécula
  // Permite que a molécula chegue até as bordas, mas não desapareça completamente
  const maxMinX = moleculeRight - clampedWidth * 0.1; // Mostra pelo menos 10% da molécula
  const minMinX = moleculeLeft - clampedWidth * 0.9; // Mostra pelo menos 10% da molécula
  const maxMinY = moleculeBottom - clampedHeight * 0.1;
  const minMinY = moleculeTop - clampedHeight * 0.9;

  // Aplica os limites
  const clampedMinX = Math.max(minMinX, Math.min(maxMinX, vb.minX));
  const clampedMinY = Math.max(minMinY, Math.min(maxMinY, vb.minY));

  return {
    minX: clampedMinX,
    minY: clampedMinY,
    width: clampedWidth,
    height: clampedHeight,
  };
}