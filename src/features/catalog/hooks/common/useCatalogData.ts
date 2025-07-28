import { useMemo, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useCatalogStore } from '../../store/catalogStore';
import { useCompoundData } from './useCompoundData';
import type { ExtendedCompound } from './useCompoundData';

export function useCatalogData() {
  const t = useTranslations();
  const { compounds: rawCompounds, isLoading, error } = useCompoundData();
  
  // Estado do store
  const {
    searchTerm,
    selectedCategory,
    selectedCategories,
    sortColumn,
    sortOrder,
    currentPage,
    rowsPerPage,
    setCompounds,
    setIsLoading,
    setError,
  } = useCatalogStore();

  // Atualiza o store com os dados
  useEffect(() => {
    setCompounds(rawCompounds);
    setIsLoading(isLoading);
    setError(error);
  }, [rawCompounds, isLoading, error, setCompounds, setIsLoading, setError]);

  // Filtros
  const filteredData = useMemo(() => {
    let result = rawCompounds;
    const term = searchTerm.toLowerCase();
    
    result = result.filter((compound) => {
      const matchesSearch =
        (compound.name ?? '').toLowerCase().includes(term) ||
        (compound.commonName ?? '').toLowerCase().includes(term) ||
        (compound.formula ?? '').toLowerCase().includes(term) ||
        (compound.synonym ?? '').toLowerCase().includes(term) ||
        (compound.casNumber ?? '').toLowerCase().includes(term) ||
        (compound.solubility ?? '').toLowerCase().includes(term);

      const matchesCategory =
        selectedCategory === 'todas' || compound.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    if (selectedCategories.length > 0) {
      result = result.filter((compound) =>
        selectedCategories.includes(compound.category)
      );
    }
    
    return result;
  }, [rawCompounds, searchTerm, selectedCategory, selectedCategories]);

  // Ordenação
  const sortedData = useMemo(() => {
    const getTranslatedValue = (compound: ExtendedCompound, column: keyof ExtendedCompound) => {
      if (column === 'name') {
        try {
          const translated = compound.formula
            ? t(`catalog.compoundNames.${compound.formula}`, { fallback: '' })
            : '';
          return translated || compound.name || '';
        } catch {
          return compound.name || '';
        }
      }
      if (column === 'commonName') {
        return compound.commonName || '';
      }
      if (column === 'synonym') {
        try {
          const translated = compound.formula
            ? t(`catalog.compoundSynonyms.${compound.formula}`, { fallback: '' })
            : '';
          return translated || compound.synonym || '';
        } catch {
          return compound.synonym || '';
        }
      }
      if (column === 'physicalForm') return compound.physicalForm || '';
      if (column === 'solubility') return compound.solubility || '';
      return compound[column] || '';
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

  // Paginação
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(start, start + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return {
    // Dados
    compounds: rawCompounds,
    filteredData,
    sortedData,
    paginatedData,
    isLoading,
    error,
    
    // Paginação
    currentPage,
    rowsPerPage,
    totalPages,
    
    // Filtros
    searchTerm,
    selectedCategory,
    selectedCategories,
    
    // Ordenação
    sortColumn,
    sortOrder,
    
    // Estatísticas
    totalCompounds: rawCompounds.length,
    filteredCount: filteredData.length,
  };
} 