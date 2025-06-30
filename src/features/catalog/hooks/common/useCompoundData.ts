import { useEffect, useState } from 'react';
import { ChemicalCompound } from '@/features/catalog/domain/types/ChemicalCompound';

// Tipo para os dados brutos do JSON
export type RawCompound = {
  "No.": number;
  "Name": string;
  "Synonym"?: string;
  "Formula": string;
  "CAS Reg No.": string;
  "Mol. Weight": number;
  "Physical Form"?: string;
  "mp/°C"?: number;
  "bp/°C"?: number;
  "Density g cm–3"?: number;
  "Refractive Index"?: number | null;
  "Qualitative Solubility": string;
  "Solubility g/100 g H2O"?: string;
};

export function useCompoundData() {
  const [compounds, setCompounds] = useState<ChemicalCompound[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/inorganic-compounds.json");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        // Normalizar os dados para garantir que 'formula' exista
        const normalized = (data as RawCompound[]).map((item) => ({
          id: item["No."],
          name: item["Name"],
          synonym: item["Synonym"],
          formula: item["Formula"],
          casNumber: item["CAS Reg No."],
          molarMass: item["Mol. Weight"],
          physicalForm: item["Physical Form"],
          meltingPoint: item["mp/°C"],
          boilingPoint: item["bp/°C"],
          density: item["Density g cm–3"],
          refractiveIndex: item["Refractive Index"],
          solubility: item["Qualitative Solubility"],
          solubilityNumeric: item["Solubility g/100 g H2O"],
        }));
        
        setCompounds(normalized);
        
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    compounds,
    isLoading,
    error,
  };
}
