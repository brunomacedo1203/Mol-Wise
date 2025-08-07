"use client";

import { useEffect, useRef } from "react";

interface MoleculeViewer3DProps {
  sdfData: string;
}

export function MoleculeViewer3D({ sdfData }: MoleculeViewer3DProps) {
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sdfData) return;

    const script = document.createElement("script");
    script.src = "https://3Dmol.org/build/3Dmol-min.js";
    script.async = true;
    script.onload = () => {
      if (viewerRef.current && window.$3Dmol) {
        const $3Dmol = window.$3Dmol;
        viewerRef.current.innerHTML = "";

        const viewer = $3Dmol.createViewer(viewerRef.current, {
          backgroundColor: "white",
        });

        viewer.addModel(sdfData, "sdf");
        viewer.setStyle(
          {},
          { stick: { radius: 0.15 }, sphere: { scale: 0.25 } }
        );
        viewer.zoomTo();
        viewer.render();
      }
    };

    document.body.appendChild(script);
  }, [sdfData]);

  return <div ref={viewerRef} style={{ width: "100%", height: "500px" }} />;
}
