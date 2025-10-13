import { useEffect } from "react";
import { ViewBox } from "../types/viewer2d.types";
import { writeViewBox, centerViewBox } from "../utils/viewBoxUtils";
import { getMoleculeKey } from "../utils/moleculeKey";

interface UseInitialViewBoxParams {
  ready: boolean;
  svgElRef: React.MutableRefObject<SVGSVGElement | null>;
  svgHostRef: React.MutableRefObject<HTMLDivElement | null>;
  vbRef: React.MutableRefObject<ViewBox | null>;
  vbInitialRef: React.MutableRefObject<ViewBox | null>;
  contentBoundsRef: React.MutableRefObject<ViewBox | null>;
  smiles: string | null;
  sdf: string | null;
  getZoom2D: (key: string) => ViewBox | null;
  setCurrentMolKey: (key: string) => void;
  mountedRef: React.MutableRefObject<boolean>;
}

export function useInitialViewBox({
  ready,
  svgElRef,
  svgHostRef,
  vbRef,
  vbInitialRef,
  contentBoundsRef,
  smiles,
  sdf,
  getZoom2D,
  setCurrentMolKey,
  mountedRef,
}: UseInitialViewBoxParams) {
  useEffect(() => {
    if (!mountedRef.current) return;

    const key = getMoleculeKey(smiles, sdf);
    setCurrentMolKey(key);

    if (ready && svgElRef.current && mountedRef.current) {
      const saved = getZoom2D(key);

      if (saved) {
        writeViewBox(svgElRef.current, saved);
        vbRef.current = saved;
      } else if (contentBoundsRef.current && svgHostRef.current) {
        const containerRect = svgHostRef.current.getBoundingClientRect();
        const newViewBox = centerViewBox(
          svgElRef.current,
          contentBoundsRef.current,
          containerRect.width,
          containerRect.height
        );

        vbRef.current = newViewBox;
        vbInitialRef.current = newViewBox;
      }
    }
    // Dependências idênticas ao efeito original
  }, [ready, smiles, sdf, svgElRef, svgHostRef, vbRef, vbInitialRef, contentBoundsRef, getZoom2D, setCurrentMolKey, mountedRef]);
}
