# Tabela Periódica

Esta feature contém os componentes, hooks, contextos e tipos necessários para implementar uma tabela periódica interativa dos elementos químicos.

## Estrutura de Diretórios

```
periodic-table/
├── components/           # Componentes React
│   ├── common/          # Componentes comuns reutilizáveis
│   │   ├── PeriodicTableContainer.tsx
│   │   ├── PeriodicTableHeader.tsx
│   │   └── PeriodicTableLegend.tsx
│   └── specific/        # Componentes específicos da tabela
│       ├── cards/       # Componentes de cards dos elementos
│       │   ├── ElementCard.tsx
│       │   └── ElementCardsGrid.tsx
│       ├── details/     # Componentes de detalhes
│       │   └── ElementDetailsPanel.tsx
│       └── PeriodicTable.tsx
├── contexts/            # Contextos React
│   └── PeriodicTableContext.tsx
├── data/               # Dados dos elementos químicos
│   └── elements.ts
├── domain/             # Tipos e interfaces do domínio
│   └── types/
│       ├── config.ts   # Tipos de configuração
│       ├── element.ts  # Tipos dos elementos
│       └── table.ts    # Tipos da tabela
├── hooks/              # Hooks customizados
│   └── usePeriodicTable.ts
└── README.md
```

## Componentes

### Componentes Comuns

- `PeriodicTableContainer`: Container principal que fornece o contexto da tabela
- `PeriodicTableHeader`: Cabeçalho com controles de configuração
- `PeriodicTableLegend`: Legenda mostrando as categorias dos elementos

### Componentes Específicos

- `ElementCard`: Card individual de um elemento químico
- `ElementCardsGrid`: Grid responsável por organizar os cards dos elementos
- `ElementDetailsPanel`: Painel lateral com detalhes do elemento selecionado
- `PeriodicTable`: Componente principal que integra todos os outros

## Contextos

- `PeriodicTableContext`: Gerencia o estado global da tabela periódica, incluindo:
  - Elemento selecionado
  - Configurações de exibição
  - Funções de atualização

## Hooks

- `usePeriodicTable`: Hook para acessar e manipular o estado da tabela periódica

## Tipos

### Configuração

```typescript
interface PeriodicTableConfig {
  showAtomicNumber: boolean;
  showAtomicMass: boolean;
  showElementName: boolean;
  showElementSymbol: boolean;
}
```

### Elemento Químico

```typescript
interface Element {
  atomicNumber: number;
  symbol: string;
  name: string;
  atomicMass: number;
  category: "metal" | "nonmetal" | "metalloid";
  phase: "gas" | "liquid" | "solid";
  group: number;
  period: number;
  density: number;
  meltingPoint: number;
  boilingPoint: number;
  electronegativity: number;
  ionizationEnergy: number;
  electronConfiguration: string;
  description: string;
}
```

## Uso

```tsx
import { PeriodicTable } from "./components/specific/PeriodicTable";

function App() {
  const handleElementSelect = (element: Element | null) => {
    console.log("Elemento selecionado:", element);
  };

  const handleConfigChange = (config: PeriodicTableConfig) => {
    console.log("Configuração alterada:", config);
  };

  return (
    <PeriodicTable
      onElementSelect={handleElementSelect}
      onConfigChange={handleConfigChange}
    />
  );
}
```
