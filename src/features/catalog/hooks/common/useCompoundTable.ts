import { useMemo, useState } from 'react';
import { ChemicalCompound } from '@/features/catalog/domain/types/ChemicalCompound';

interface UseCompoundTableProps {
  data: ChemicalCompound[];
}

export function useCompoundTable({ data }: UseCompoundTableProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  // 🔍 Filtro de busca simples
  const filteredData = useMemo(() => {
    const term = searchTerm.toLowerCase();

    return data.filter((compound) =>
      compound.name.toLowerCase().includes(term) ||
      compound.formula.toLowerCase().includes(term) ||
      (compound.synonym?.toLowerCase().includes(term) ?? false) ||
      compound.casNumber.toLowerCase().includes(term) ||
      compound.solubility.toLowerCase().includes(term)
    );
  }, [data, searchTerm]);

  // 📄 Paginação
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredData.slice(start, end);
  }, [filteredData, currentPage, rowsPerPage]);

  // 👉 Controle de colunas visíveis (inicialmente todas visíveis)
  const [visibleColumns, setVisibleColumns] = useState<{
    [key: string]: boolean;
  }>({
    id: true,
    name: true,
    synonym: true,
    formula: true,
    casNumber: true,
    molarMass: true,
    physicalForm: true,
    meltingPoint: true,
    boilingPoint: true,
    density: true,
    refractiveIndex: true,
    solubility: true,
  });

  return {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    totalPages,
    paginatedData,
    filteredData,
    visibleColumns,
    setVisibleColumns,
  };
}
