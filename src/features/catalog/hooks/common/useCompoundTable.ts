import { useMemo, useState } from 'react';
import { ChemicalCompound } from '@/features/catalog/domain/types/ChemicalCompound';
import { useTranslations } from 'next-intl';

type SortOrder = 'asc' | 'desc';

// Adicionar tipos extras para as novas colunas
type ExtraColumn = "solubilityNumeric" | "solubilityQualitative";
type TableColumnKey = keyof ChemicalCompound | ExtraColumn;

interface UseCompoundTableProps {
  data: ChemicalCompound[];
}

export function useCompoundTable({ data }: UseCompoundTableProps) {
  const t = useTranslations();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [sortColumn, setSortColumn] = useState<keyof ChemicalCompound>('id');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const [visibleColumns, setVisibleColumns] = useState<
    Record<TableColumnKey, boolean>
  >({
    id: true,
    name: true,
    synonym: false,
    formula: true,
    casNumber: true,
    molarMass: true,
    physicalForm: true,
    meltingPoint: true,
    boilingPoint: true,
    density: true,
    refractiveIndex: false,
    solubility: false,
    solubilityNumeric: true,
    solubilityQualitative: true,
  });

  // 🔍 Filtro por texto
  const filteredData = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return data.filter((compound) =>
      (compound.name ?? '').toLowerCase().includes(term) ||
      (compound.formula ?? '').toLowerCase().includes(term) ||
      (compound.synonym ?? '').toLowerCase().includes(term) ||
      (compound.casNumber ?? '').toLowerCase().includes(term) ||
      (compound.solubility ?? '').toLowerCase().includes(term)
    );
  }, [data, searchTerm]);
  
  

  // 🔀 Ordenação corrigida
  const sortedData = useMemo(() => {
    // Função para obter valor traduzido para ordenação
    const getTranslatedValue = (compound: ChemicalCompound, column: keyof ChemicalCompound) => {
      if (column === 'name') {
        try {
          return compound.formula
          ? t(`catalog.compoundNames.${compound.formula}`, { fallback: '' }) || compound.name
          : compound.name
        
        } catch {
          return compound.name;
        }
      }
      if (column === 'synonym') {
        try {
          return t(`catalog.compoundSynonyms.${compound.formula}`) || compound.synonym || '';
        } catch {
          return compound.synonym || '';
        }
      }
      if (column === 'physicalForm') {
        return compound.physicalForm || '';
      }
      if (column === 'solubility') {
        return compound.solubility;
      }
      return compound[column];
    };

    return [...filteredData].sort((a, b) => {
      const aVal = getTranslatedValue(a, sortColumn);
      const bVal = getTranslatedValue(b, sortColumn);

      if (aVal === undefined || bVal === undefined) return 0;

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
      }

      return sortOrder === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [filteredData, sortColumn, sortOrder, t]);

  // 📄 Paginação
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(start, start + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  function handleSort(column: keyof ChemicalCompound) {
    if (sortColumn === column) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  }

  return {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    totalPages,
    paginatedData,
    visibleColumns,
    setVisibleColumns,
    sortColumn,
    sortOrder,
    handleSort,
  };
}
