import { useMemo, useState, useEffect, useCallback } from 'react';
import { ExtendedCompound } from '@/features/catalog/domain/types/ChemicalCompound';
import { useTranslations } from 'next-intl';
import type { CompoundCategory as BaseCompoundCategory } from "@/features/catalog/domain/types/ChemicalCompound";
import { 
  trackCatalogSearch, 
  trackCatalogFilter, 
  trackCatalogSort,
  trackCatalogPagination,
  trackCatalogColumnToggle
} from '../../events/catalogEvents';
type FilterCategory = BaseCompoundCategory | "desconhecida" | "todas";

type SortOrder = 'asc' | 'desc';

// Colunas extras que não estão no tipo original
type ExtraColumn = "solubilityNumeric" | "solubilityQualitative";
type TableColumnKey = keyof ExtendedCompound | ExtraColumn;

interface UseCompoundTableProps {
  data: ExtendedCompound[];
}

export function useCompoundTable({ data }: UseCompoundTableProps) {
  const t = useTranslations();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('todas');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<BaseCompoundCategory[]>([]);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

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
    category: false, 
  });

  // 🔍 Filtro por texto + categoria - VERSÃO CORRIGIDA
  const filteredData = useMemo(() => {
    let result = data;
    const term = searchTerm.toLowerCase();
    
    result = result.filter((compound) => {
      // Funções para obter valores traduzidos (reutilizando a lógica já existente)
      const getTranslatedName = (compound: ExtendedCompound) => {
        try {
          const translated = compound.formula
            ? t(`catalog.compoundNames.${compound.formula}`, { fallback: '' })
            : '';
          return translated || compound.name || '';
        } catch {
          return compound.name || '';
        }
      };

      const getTranslatedCommonName = (compound: ExtendedCompound) => {
        try {
          const translated = compound.commonName
            ? t(`catalog.CommonName.${compound.commonName}`, { fallback: '' })
            : '';
          return translated || compound.commonName || '';
        } catch {
          return compound.commonName || '';
        }
      };

      const getTranslatedSynonym = (compound: ExtendedCompound) => {
        try {
          const translated = compound.commonName
            ? t(`catalog.CommonName.${compound.commonName}`, { fallback: '' })
            : '';
          return translated || compound.synonym || '';
        } catch {
          return compound.synonym || '';
        }
      };

      // Busca expandida incluindo traduções e ID
      const matchesSearch =
        // Campos originais
        (compound.name ?? '').toLowerCase().includes(term) ||
        (compound.commonName ?? '').toLowerCase().includes(term) ||
        (compound.formula ?? '').toLowerCase().includes(term) ||
        (compound.synonym ?? '').toLowerCase().includes(term) ||
        (compound.casNumber ?? '').toLowerCase().includes(term) ||
        (compound.solubility ?? '').toLowerCase().includes(term) ||
        // Campos traduzidos
        getTranslatedName(compound).toLowerCase().includes(term) ||
        getTranslatedCommonName(compound).toLowerCase().includes(term) ||
        getTranslatedSynonym(compound).toLowerCase().includes(term) ||
        // Busca por ID
        compound.id.toString().includes(term) ||
        // Busca por categoria traduzida (se necessário)
        (compound.category ?? '').toLowerCase().includes(term);

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
  }, [data, searchTerm, selectedCategory, selectedCategories, t]);

  // Tracking de busca com debounce
  useEffect(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    if (searchTerm.trim() !== "") {
      const timer = setTimeout(() => {
        // Detectar tipo de busca baseado no termo
        const detectSearchType = (term: string): "name" | "formula" | "cas" | "synonym" | "common_name" | "solubility" | "mixed" => {
          const lowerTerm = term.toLowerCase();
          
          // Se contém apenas números e hífens, provavelmente é CAS
          if (/^[\d-]+$/.test(term)) {
            return "cas";
          }
          
          // Se contém caracteres químicos típicos, provavelmente é fórmula
          if (/[A-Z][a-z]?\d*/.test(term) && /[A-Z]/.test(term)) {
            return "formula";
          }
          
          // Se contém palavras relacionadas à solubilidade
          if (lowerTerm.includes('solubil') || lowerTerm.includes('solúvel') || lowerTerm.includes('insolúvel')) {
            return "solubility";
          }
          
          // Se contém vírgulas ou espaços, provavelmente é nome comum
          if (term.includes(',') || term.includes(' ')) {
            return "common_name";
          }
          
          // Se contém parênteses, provavelmente é sinônimo
          if (term.includes('(') && term.includes(')')) {
            return "synonym";
          }
          
          // Se contém apenas letras, provavelmente é nome
          if (/^[a-zA-Z\s]+$/.test(term)) {
            return "name";
          }
          
          return "mixed";
        };

        trackCatalogSearch({
          search_term: searchTerm,
          result_count: filteredData.length,
          search_type: detectSearchType(searchTerm),
        });
      }, 500); // 500ms de debounce
      setDebounceTimer(timer);
    }

    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [searchTerm, filteredData.length, debounceTimer]);

  // 🔀 Ordenação (mantida)
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

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(start, start + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  function handleSort(column: keyof ExtendedCompound) {
    const newOrder = sortColumn === column ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc';
    
    if (sortColumn === column) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
    
    // Tracking de ordenação
    trackCatalogSort({
      sort_column: column.toString(),
      sort_order: newOrder,
    });
  }

  // Tracking de mudança de categoria
  const handleCategoryChange = useCallback((category: FilterCategory) => {
    setSelectedCategory(category);
    
    trackCatalogFilter({
      filter_type: "category",
      filter_value: category,
      result_count: filteredData.length,
    });
  }, [filteredData.length]);

  // Tracking de mudança de página
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    
    trackCatalogPagination({
      page_number: page,
      items_per_page: rowsPerPage,
      total_items: filteredData.length,
    });
  }, [rowsPerPage, filteredData.length]);

  // Tracking de mudança de itens por página
  const handleRowsPerPageChange = useCallback((newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1); // Reset para primeira página
    
    trackCatalogPagination({
      page_number: 1,
      items_per_page: newRowsPerPage,
      total_items: filteredData.length,
    });
  }, [filteredData.length]);

  // Tracking de toggle de colunas
  const handleColumnToggle = useCallback((column: TableColumnKey) => {
    const newVisibleColumns = {
      ...visibleColumns,
      [column]: !visibleColumns[column]
    };
    setVisibleColumns(newVisibleColumns);
    
    trackCatalogColumnToggle({
      column_name: column.toString(),
      column_visible: newVisibleColumns[column],
    });
  }, [visibleColumns]);

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory: handleCategoryChange,
    currentPage,
    setCurrentPage: handlePageChange,
    rowsPerPage,
    setRowsPerPage: handleRowsPerPageChange,
    totalPages,
    paginatedData,
    visibleColumns,
    setVisibleColumns,
    toggleColumn: handleColumnToggle,
    sortColumn,
    sortOrder,
    handleSort,
    selectedCategories,
    setSelectedCategories,
  };
}