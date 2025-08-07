"use client";

import { useEffect, useRef, useState } from "react";

interface MoleculeViewer2DProps {
  smiles: string;
}

// Interfaces para tipagem do RDKit
interface RDKitModule {
  get_mol: (smiles: string) => RDKitMolecule | null;
  version: () => string;
}

interface RDKitMolecule {
  get_svg: (width: number, height: number) => string;
  delete: () => void;
}

interface RDKitLoader {
  (): Promise<RDKitModule>;
}

export function MoleculeViewer2D({ smiles }: MoleculeViewer2DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [RDKit, setRDKit] = useState<RDKitModule | null>(null);

  // Inicializa o RDKit ao carregar o componente (apenas no cliente)
  useEffect(() => {
    let isMounted = true;
    async function loadRDKit() {
      try {
        // Importação dinâmica
        const RDKitModule = await import("@rdkit/rdkit");
        const rdkitModule = await (RDKitModule as unknown as RDKitLoader)();
        if (isMounted) setRDKit(rdkitModule);
      } catch (error) {
        console.error("Erro ao inicializar o RDKit:", error);
      }
    }
    loadRDKit();
    return () => {
      isMounted = false;
    };
  }, []);

  // Renderiza a molécula quando o módulo estiver pronto
  useEffect(() => {
    if (!RDKit || !smiles) return;
    try {
      const mol = RDKit.get_mol(smiles);
      if (!mol) throw new Error("SMILES inválido");
      const svg = mol.get_svg(300, 300);
      if (containerRef.current) {
        containerRef.current.innerHTML = svg;
      }
      mol.delete();
    } catch (error) {
      console.error("Erro ao renderizar a molécula:", error);
    }
  }, [RDKit, smiles]);

  return (
    <div
      ref={containerRef}
      className="border p-2 rounded bg-white dark:bg-zinc-800"
    />
  );
}
