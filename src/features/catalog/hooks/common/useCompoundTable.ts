import { useMemo, useState, useEffect } from 'react';
import { ExtendedCompound } from '@/features/catalog/domain/types/ChemicalCompound';
import { useTranslations } from 'next-intl';

type SortOrder = 'asc' | 'desc';

// Colunas extras que não estão no tipo original
type ExtraColumn = "solubilityNumeric" | "solubilityQualitative";
type TableColumnKey = keyof ExtendedCompound | ExtraColumn;

// Categorias possíveis para o filtro
export type CompoundCategory = "ácido" | "base" | "sal" | "óxido" | "desconhecida" | "todas";

interface UseCompoundTableProps {
  data: ExtendedCompound[];
}

export function useCompoundTable({ data }: UseCompoundTableProps) {
  const t = useTranslations();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CompoundCategory>('todas');
  const [currentPage, setCurrentPage] = useState(1);

  const [rowsPerPage, setRowsPerPage] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("catalogRowsPerPage");
      return saved ? Number(saved) : 10;
    }
    return 10;
  });

  useEffect(() => {
    localStorage.setItem("catalogRowsPerPage", String(rowsPerPage));
  }, [rowsPerPage]);

  const [sortColumn, setSortColumn] = useState<keyof ExtendedCompound>('id');
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
    commonName: true,
    category: false, // mesmo que não exibida, ainda faz parte do tipo
  });

  // 🔍 Filtro por texto + categoria
  const filteredData = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return data.filter((compound) => {
      const matchesSearch =
        (compound.name ?? '').toLowerCase().includes(term) ||
        (compound.formula ?? '').toLowerCase().includes(term) ||
        (compound.synonym ?? '').toLowerCase().includes(term) ||
        (compound.casNumber ?? '').toLowerCase().includes(term) ||
        (compound.solubility ?? '').toLowerCase().includes(term);

      const matchesCategory =
        selectedCategory === 'todas' || compound.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [data, searchTerm, selectedCategory]);

  // 🔀 Ordenação (mantida)
  const sortedData = useMemo(() => {
    const getTranslatedValue = (compound: ExtendedCompound, column: keyof ExtendedCompound) => {
      if (column === 'name') {
        try {
          return compound.formula
            ? t(`catalog.compoundNames.${compound.formula}`, { fallback: '' }) || compound.name
            : compound.name;
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
      if (column === 'physicalForm') return compound.physicalForm || '';
      if (column === 'solubility') return compound.solubility;
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

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(start, start + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  function handleSort(column: keyof ExtendedCompound) {
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
    selectedCategory,
    setSelectedCategory,
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
