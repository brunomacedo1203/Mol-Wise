import { useEffect } from "react";
import type { ThreeDMolViewer, MolView } from "../types/3dmol";
import { getMoleculeKey } from "../utils/moleculeKey";
import { trackMolecule3DView, trackMolecule3DError, trackMolecule3DInteraction } from "../events/molecule3DEvents";
import { getElementSize } from "../utils/elementSize";

export function useViewer3DModel({
  viewerRef,
  libReady,
  sdfData,
  smiles,
  getView3D,
  viewMode,
  setErr,
}: {
  viewerRef: React.RefObject<ThreeDMolViewer | null>;
  libReady: boolean;
  sdfData: string | null;
  smiles: string | null;
  getView3D: (key: string) => MolView | null;
  viewMode: "2D" | "3D" | string;
  setErr: (msg: string | null) => void;
}) {
  useEffect(() => {
    if (viewMode !== "3D") return;

    async function updateModel() {
      if (!viewerRef.current || !libReady || !sdfData) return;

      const startTime = performance.now();
      const moleculeName = getMoleculeKey(smiles ?? null, sdfData ?? null);

      try {
        const v = viewerRef.current;
        // Evita renderizar em canvas de tamanho inválido
        const container = (v as unknown as { container?: HTMLElement }).container || (document?.activeElement as HTMLElement | null);
        if (container) {
          const { width, height } = getElementSize(container);
          if (width < 1 || height < 1) {
            console.warn("Ignorando render 3D: container sem tamanho válido.");
            return;
          }
        }
        v.clear();
        v.addModel(sdfData, "sdf");
        v.setStyle({}, { stick: { radius: 0.15 }, sphere: { radius: 0.4 } });

        const key = getMoleculeKey(smiles ?? null, sdfData ?? null);
        const saved = getView3D(key);
        if (saved) {
          v.setView(saved);
          v.render();
        } else {
          await new Promise((resolve) => requestAnimationFrame(resolve));
          v.zoomTo();
          v.render();

          trackMolecule3DInteraction({
            molecule_name: moleculeName,
            interaction_type: "reset_view",
            interaction_value: "auto_zoom",
          });
        }

        v.render();
        await new Promise((resolve) => requestAnimationFrame(resolve));
        setErr(null);

        const renderTime = performance.now() - startTime;
        trackMolecule3DView({
          molecule_name: moleculeName,
          render_time: Math.round(renderTime),
          view_style: "stick_sphere",
          success: true,
        });
      } catch (e) {
        console.error("Erro ao renderizar modelo 3D:", e);
        setErr("Não foi possível renderizar o modelo 3D (SDF inválido?).");
        trackMolecule3DError({
          molecule_name: moleculeName,
          error_type: "render_failed",
          error_message: e instanceof Error ? e.message : "Unknown render error",
        });
      }
    }

    void updateModel();
  }, [sdfData, libReady, smiles, getView3D, viewMode, viewerRef, setErr]);
}