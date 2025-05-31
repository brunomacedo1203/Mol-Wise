// Entry point para exportar recursos da feature Tabela Periódica

// Componentes
export { PeriodicTable } from './components/specific/PeriodicTable';
export { PeriodicTableContainer } from './components/common/PeriodicTableContainer';
export { PeriodicTableHeader } from './components/common/PeriodicTableHeader';
export { PeriodicTableLegend } from './components/common/PeriodicTableLegend';
export { ElementCard } from './components/specific/cards/ElementCard';
export { ElementCardsGrid } from './components/specific/cards/ElementCardsGrid';
export { ElementDetailsPanel } from './components/specific/details/ElementDetailsPanel';

// Hooks
export { usePeriodicTable } from './hooks/usePeriodicTable';

// Tipos
export type { Element } from './domain/types/element';
export type { PeriodicTableConfig } from './domain/types/config';
export type {
  PeriodicTableProps,
  PeriodicTableContainerProps,
  ElementCardProps,
  ElementCardsGridProps,
  ElementDetailsPanelProps,
  PeriodicTableHeaderProps,
} from './domain/types/table';

// Contexto
export { PeriodicTableProvider } from './contexts/PeriodicTableContext';
