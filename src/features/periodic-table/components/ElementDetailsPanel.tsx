import React from "react";

interface ElementDetailsPanelProps {
  element: {
    symbol: string;
    name: string;
    atomicNumber: number;
    molarMass: number;
    standardState?: string;
    electronConfiguration?: string;
    oxidationStates?: string;
    electronegativity?: number;
    atomicRadius?: string;
    ionizationEnergy?: string;
    electronAffinity?: string;
    meltingPoint?: string;
    boilingPoint?: string;
    density?: string;
    yearDiscovered?: string;
    category?: string;
  } | null;
}

export default function ElementDetailsPanel({
  element,
}: ElementDetailsPanelProps) {
  if (!element) {
    return (
      <div className="w-full h-[120px] flex items-center justify-center text-zinc-400 text-xl mb-4">
        Passe o mouse sobre um elemento para ver detalhes
      </div>
    );
  }
  return (
    <div
      className="absolute left-1/2 top-[110px] z-30 w-[700px] h-[220px] bg-white border-2 border-cyan-600 rounded-lg shadow-lg flex overflow-hidden"
      style={{ transform: "translateX(-50%)" }}
    >
      {/* Coluna do símbolo */}
      <div className="flex flex-col items-center justify-center w-[180px] h-full bg-cyan-50 border-r border-cyan-200">
        <span className="text-7xl font-extrabold text-cyan-600 leading-none">
          {element.symbol}
        </span>
        <span className="text-base text-zinc-700 font-semibold mt-2">
          {element.name}
        </span>
      </div>
      {/* Coluna das informações */}
      <div className="flex-1 flex flex-col justify-center px-6 py-4 text-zinc-800 text-[15px]">
        <div className="flex flex-wrap gap-x-8 gap-y-1">
          <div className="w-1/2">
            <span className="font-semibold">Número Atômico:</span>{" "}
            {element.atomicNumber}
          </div>
          <div className="w-1/2">
            <span className="font-semibold">Massa Atômica:</span>{" "}
            {element.molarMass}
          </div>
          {element.category && (
            <div className="w-1/2">
              <span className="font-semibold">Categoria:</span>{" "}
              {element.category}
            </div>
          )}
          {element.standardState && (
            <div className="w-1/2">
              <span className="font-semibold">Estado padrão:</span>{" "}
              {element.standardState}
            </div>
          )}
          {element.electronConfiguration && (
            <div className="w-full">
              <span className="font-semibold">Configuração eletrônica:</span>{" "}
              <span className="break-all">{element.electronConfiguration}</span>
            </div>
          )}
          {element.oxidationStates && (
            <div className="w-1/2">
              <span className="font-semibold">Estados de oxidação:</span>{" "}
              {element.oxidationStates}
            </div>
          )}
          {element.electronegativity !== undefined && (
            <div className="w-1/2">
              <span className="font-semibold">Eletronegatividade:</span>{" "}
              {element.electronegativity}
            </div>
          )}
          {element.atomicRadius && (
            <div className="w-1/2">
              <span className="font-semibold">Raio atômico:</span>{" "}
              {element.atomicRadius}
            </div>
          )}
          {element.ionizationEnergy && (
            <div className="w-1/2">
              <span className="font-semibold">Energia de ionização:</span>{" "}
              {element.ionizationEnergy}
            </div>
          )}
          {element.electronAffinity && (
            <div className="w-1/2">
              <span className="font-semibold">Afinidade eletrônica:</span>{" "}
              {element.electronAffinity}
            </div>
          )}
          {element.meltingPoint && (
            <div className="w-1/2">
              <span className="font-semibold">Ponto de fusão:</span>{" "}
              {element.meltingPoint}
            </div>
          )}
          {element.boilingPoint && (
            <div className="w-1/2">
              <span className="font-semibold">Ponto de ebulição:</span>{" "}
              {element.boilingPoint}
            </div>
          )}
          {element.density && (
            <div className="w-1/2">
              <span className="font-semibold">Densidade:</span>{" "}
              {element.density}
            </div>
          )}
          {element.yearDiscovered && (
            <div className="w-1/2">
              <span className="font-semibold">Ano de descoberta:</span>{" "}
              {element.yearDiscovered}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
