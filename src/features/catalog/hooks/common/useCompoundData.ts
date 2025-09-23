import { useEffect, useState } from "react";
import { ChemicalCompound, CompoundCategory } from "@/features/catalog/domain/types/ChemicalCompound";
import rawExtendedMetadata from "../../../../../public/data/inorganic-compounds.json";

// Transform the array into a Record indexed by formula
const extendedMetadata: Record<string, { commonName: string; category: string }> = 
  rawExtendedMetadata.reduce((acc, compound) => {
    acc[compound.Formula] = {
      commonName: compound.commonName || "notAvailable",
      category: compound.category || "desconhecida"
    };
    return acc;
  }, {} as Record<string, { commonName: string; category: string }>);

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

export type ExtendedCompound = ChemicalCompound & {
  commonName: string;
  category: "ácido" | "base" | "sal" | "óxido" | "desconhecida";
};

export function useCompoundData() {
  const [compounds, setCompounds] = useState<ExtendedCompound[]>([]);
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

        // Normalizar os dados originais
        const normalized = (data as RawCompound[]).map((item) => {
          const base: ChemicalCompound = {
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
            category: "desconhecida" as CompoundCategory,
          };
          return base;
        });

        // Enriquecer com nome usual e categoria
        const enrichCompound = (compound: ChemicalCompound): ExtendedCompound => {
          const meta = extendedMetadata[compound.formula] ?? {};
          return {
            ...compound,
            commonName: meta.commonName ?? "notAvailable",
            category: (meta.category as ExtendedCompound["category"]) ?? "desconhecida",
          };
        };

        setCompounds(normalized.map(enrichCompound));
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
