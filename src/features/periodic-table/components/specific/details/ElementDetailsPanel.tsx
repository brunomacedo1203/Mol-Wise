import { X } from "lucide-react";
import { ElementDetailsPanelProps } from "../../../domain/types/table";

/**
 * Painel de detalhes de um elemento químico
 */
export function ElementDetailsPanel({
  element,
  onClose,
}: ElementDetailsPanelProps) {
  if (!element) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-background border-l shadow-lg">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-xl font-bold">
          {element.name} ({element.symbol})
        </h2>
        <button
          onClick={onClose}
          className="p-1 hover:bg-muted rounded-full"
          aria-label="Fechar detalhes"
        >
          <X size={20} />
        </button>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">
            Informações Básicas
          </h3>
          <dl className="mt-2 space-y-2">
            <div className="flex justify-between">
              <dt className="text-sm">Número Atômico</dt>
              <dd className="text-sm font-medium">{element.atomicNumber}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm">Massa Atômica</dt>
              <dd className="text-sm font-medium">
                {element.molarMass.toFixed(2)} u
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm">Categoria</dt>
              <dd className="text-sm font-medium capitalize">
                {element.category}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm">Estado Físico</dt>
              <dd className="text-sm font-medium capitalize">
                {element.standardState}
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <h3 className="text-sm font-medium text-muted-foreground">
            Propriedades Físicas
          </h3>
          <dl className="mt-2 space-y-2">
            <div className="flex justify-between">
              <dt className="text-sm">Densidade</dt>
              <dd className="text-sm font-medium">{element.density} g/cm³</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm">Ponto de Fusão</dt>
              <dd className="text-sm font-medium">{element.meltingPoint} K</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm">Ponto de Ebulição</dt>
              <dd className="text-sm font-medium">{element.boilingPoint} K</dd>
            </div>
          </dl>
        </div>

        <div>
          <h3 className="text-sm font-medium text-muted-foreground">
            Propriedades Químicas
          </h3>
          <dl className="mt-2 space-y-2">
            <div className="flex justify-between">
              <dt className="text-sm">Eletronegatividade</dt>
              <dd className="text-sm font-medium">
                {element.electronegativity
                  ? element.electronegativity.toFixed(2)
                  : "N/A"}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm">Energia de Ionização</dt>
              <dd className="text-sm font-medium">
                {element.ionizationEnergy} kJ/mol
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm">Configuração Eletrônica</dt>
              <dd className="text-sm font-medium">
                {element.electronConfiguration}
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <h3 className="text-sm font-medium text-muted-foreground">
            Informações Adicionais
          </h3>
          <dl className="mt-2 space-y-2">
            <div className="flex justify-between">
              <dt className="text-sm">Raio Atômico</dt>
              <dd className="text-sm font-medium">{element.atomicRadius}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm">Estados de Oxidação</dt>
              <dd className="text-sm font-medium">{element.oxidationStates}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm">Afinidade Eletrônica</dt>
              <dd className="text-sm font-medium">
                {element.electronAffinity || "N/A"}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm">Ano de Descoberta</dt>
              <dd className="text-sm font-medium">{element.yearDiscovered}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
