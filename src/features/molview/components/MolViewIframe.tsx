"use client";

import { MolViewIframeProps } from "../types/molview.types";

export function MolViewIframe({
  width = "100%",
  height = "600px",
  className,
}: MolViewIframeProps) {
  return (
    <iframe
      src="https://molview.org/"
      width={width}
      height={height}
      className={`border-0 rounded-lg shadow-lg ${className}`}
      title="MolView - Visualizador de Moléculas"
      sandbox="allow-scripts allow-same-origin allow-forms"
      loading="lazy"
    />
  );
}
