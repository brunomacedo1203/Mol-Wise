import type { OpenChemLibModule } from "../types/viewer2d.types";

export function normalizeMolecule(
  mol: import("openchemlib").Molecule,
  OCL: OpenChemLibModule
) {
  try {
    // Remove hidrogênios explícitos ligados a carbono
    if (typeof mol.removeExplicitHydrogens === "function") {
      const atomCount = mol.getAllAtoms();
      for (let i = atomCount - 1; i >= 0; i--) {
        const atomicNo = mol.getAtomicNo(i);
        if (atomicNo === 1) {
          const connAtoms = mol.getAllConnAtoms?.(i) ?? 0;
          if (connAtoms === 1) {
            const neighborIdx = mol.getConnAtom?.(i, 0);
            if (neighborIdx !== undefined) {
              const neighborAtomicNo = mol.getAtomicNo(neighborIdx);
              if (neighborAtomicNo === 6) {
                mol.deleteAtom?.(i);
              }
            }
          }
        }
      }
    }

    if (mol.getAllAtoms() > 0) {
      mol.inventCoordinates();
    }

    mol.ensureHelperArrays?.(
      OCL.Molecule.cHelperNeighbours |
        OCL.Molecule.cHelperRings |
        OCL.Molecule.cHelperParities
    );

    // Corrige duplas com "X" (paridade/desconhecida)
    clearUnknownDoubleBondStereo(mol, OCL);
  } catch (error) {
    console.warn("⚠️ Erro ao preparar molécula:", error);
  }
}

function clearUnknownDoubleBondStereo(
  mol: import("openchemlib").Molecule,
  OCL: OpenChemLibModule
) {
  const bondCount = mol.getAllBonds();
  for (let b = 0; b < bondCount; b++) {
    if (mol.getBondOrder(b) !== 2) continue;

    const isCross =
      (typeof mol.getBondType === "function" &&
        mol.getBondType(b) === OCL.Molecule.cBondTypeCross) ||
      (typeof (mol as import("openchemlib").Molecule).isBondParityUnknownOrNone === "function" &&
        (mol as import("openchemlib").Molecule).isBondParityUnknownOrNone(b));

    if (isCross) {
      mol.setBondParity?.(b, OCL.Molecule.cBondParityNone, false);
      mol.setBondType?.(b, OCL.Molecule.cBondTypeDouble);
    }
  }
}