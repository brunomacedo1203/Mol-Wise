import { Element } from "../domain/types/element";

/**
 * Dados dos elementos químicos da tabela periódica
 */
export const elements: Element[] = [
  {
    atomicNumber: 1,
    symbol: "H",
    name: "Hidrogênio",
    atomicMass: 1.008,
    category: "nonmetal",
    phase: "gas",
    group: 1,
    period: 1,
    density: 0.00008988,
    meltingPoint: 14.01,
    boilingPoint: 20.28,
    electronegativity: 2.2,
    ionizationEnergy: 1312,
    electronConfiguration: "1s¹",
    description:
      "O hidrogênio é o elemento químico mais simples e abundante no universo. É um gás incolor, inodoro e altamente inflamável.",
  },
  {
    atomicNumber: 2,
    symbol: "He",
    name: "Hélio",
    atomicMass: 4.002602,
    category: "nonmetal",
    phase: "gas",
    group: 18,
    period: 1,
    density: 0.0001785,
    meltingPoint: 0.95,
    boilingPoint: 4.22,
    electronegativity: 0,
    ionizationEnergy: 2372.3,
    electronConfiguration: "1s²",
    description:
      "O hélio é um gás nobre incolor, inodoro e não inflamável. É o segundo elemento mais abundante no universo.",
  },
  // ... outros elementos serão adicionados posteriormente
]; 