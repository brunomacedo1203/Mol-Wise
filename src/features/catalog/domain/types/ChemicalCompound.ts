export interface ChemicalCompound {
    id: number;                  // No. (Número sequencial na tabela)
    name: string;                // Name (Nome do composto)
    synonym?: string;            // Synonym (Sinônimo)
    formula: string;             // Mol. Form. (Fórmula molecular)
    casNumber: string;           // CAS RN (Número CAS)
    molarMass: number;           // Mol. Wt. (Massa molecular)
    physicalForm?: string;       // Physical Form (Forma física)
    meltingPoint?: number;       // mp/°C (Ponto de fusão)
    boilingPoint?: number;       // bp/°C (Ponto de ebulição)
    density?: number;            // den/g cm³ (Densidade)
    refractiveIndex?: number | null; // nD (Índice de refração)
    solubility: string;          // Solubility (Solubilidade)
  }
  