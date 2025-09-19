import { useMemo, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useCatalogStore } from '../../store/catalogStore';
import { useCompoundData } from './useCompoundData';
import type { ExtendedCompound } from './useCompoundData';
import type { BasicAdvancedFilters } from '../../domain/types/ChemicalCompound';

export function useCatalogData() {
  const t = useTranslations();
  const { compounds: rawCompounds, isLoading, error } = useCompoundData();
  
  // Estado do store
  const {
    searchTerm,
    selectedCategory,
    selectedCategories,
    advancedFilters,
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

  // Função para aplicar filtros avançados
  const applyAdvancedFilters = (compounds: ExtendedCompound[], filters: BasicAdvancedFilters) => {
    return compounds.filter((compound) => {
      // Filtro por ponto de fusão
      if (filters.meltingPoint.min !== null && compound.meltingPoint !== undefined) {
        if (compound.meltingPoint < filters.meltingPoint.min) return false;
      }
      if (filters.meltingPoint.max !== null && compound.meltingPoint !== undefined) {
        if (compound.meltingPoint > filters.meltingPoint.max) return false;
      }

      // Filtro por ponto de ebulição
      if (filters.boilingPoint.min !== null && compound.boilingPoint !== undefined) {
        if (compound.boilingPoint < filters.boilingPoint.min) return false;
      }
      if (filters.boilingPoint.max !== null && compound.boilingPoint !== undefined) {
        if (compound.boilingPoint > filters.boilingPoint.max) return false;
      }

      // Filtro por densidade
      if (filters.density.min !== null && compound.density !== undefined) {
        if (compound.density < filters.density.min) return false;
      }
      if (filters.density.max !== null && compound.density !== undefined) {
        if (compound.density > filters.density.max) return false;
      }

      // Filtro por massa molar
      if (filters.molarMass.min !== null && compound.molarMass !== undefined) {
        if (compound.molarMass < filters.molarMass.min) return false;
      }
      if (filters.molarMass.max !== null && compound.molarMass !== undefined) {
        if (compound.molarMass > filters.molarMass.max) return false;
      }

      // Filtro por forma física - CORRIGIDO para busca por substring
      if (filters.physicalForms.length > 0 && compound.physicalForm) {
        const compoundForm = compound.physicalForm.toLowerCase();
        const matchesForm = filters.physicalForms.some(form => 
          compoundForm.includes(form.toLowerCase())
        );
        if (!matchesForm) return false;
      }

      // Filtro por solubilidade
      if (filters.solubilityTypes.length > 0 && compound.solubility) {
        const compoundSolubility = compound.solubility.toLowerCase();
        const matchesSolubility = filters.solubilityTypes.some(type => 
          compoundSolubility.includes(type.toLowerCase())
        );
        if (!matchesSolubility) return false;
      }

      return true;
    });
  };

  // Filtros básicos
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

    // Aplica filtros avançados se estiverem ativos
    if (advancedFilters.isActive) {
      result = applyAdvancedFilters(result, advancedFilters.filters);
    }
    
    return result;
  }, [rawCompounds, searchTerm, selectedCategory, selectedCategories, advancedFilters]);

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
        try {
          const translated = compound.commonName
            ? t(`catalog.CommonName.${compound.commonName}`, { fallback: '' })
            : '';
          return translated || compound.commonName || '';
        } catch {
          return compound.commonName || '';
        }
      }
      if (column === 'synonym') {
        try {
          const translated = compound.commonName
            ? t(`catalog.CommonName.${compound.commonName}`, { fallback: '' })
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
    
    // Filtros básicos
    searchTerm,
    selectedCategory,
    selectedCategories,
    
    // Filtros avançados
    advancedFilters,
    
    // Ordenação
    sortColumn,
    sortOrder,
    
    // Estatísticas
    totalCompounds: rawCompounds.length,
    filteredCount: filteredData.length,
  };
}