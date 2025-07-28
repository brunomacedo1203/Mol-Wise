import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ExtendedCompound } from "../hooks/common/useCompoundData";
import type { CompoundCategory } from "../domain/types/ChemicalCompound";
import type { TableColumnKey } from "../domain/types/TableColumnKey";

type SortOrder = 'asc' | 'desc';
type FilterCategory = CompoundCategory | "desconhecida" | "todas";

interface CatalogState {
  // Estado da tabela
  searchTerm: string;
  currentPage: number;
  rowsPerPage: number;
  sortColumn: keyof ExtendedCompound;
  sortOrder: SortOrder;
  
  // Filtros
  selectedCategory: FilterCategory;
  selectedCategories: CompoundCategory[];
  
  // Colunas visíveis
  visibleColumns: Record<TableColumnKey, boolean>;
  
  // Dados
  compounds: ExtendedCompound[];
  isLoading: boolean;
  error: Error | null;
  
  // Actions
  setSearchTerm: (term: string) => void;
  setCurrentPage: (page: number) => void;
  setRowsPerPage: (rows: number) => void;
  setSortColumn: (column: keyof ExtendedCompound) => void;
  setSortOrder: (order: SortOrder) => void;
  toggleSortOrder: () => void;
  
  setSelectedCategory: (category: FilterCategory) => void;
  setSelectedCategories: (categories: CompoundCategory[]) => void;
  
  setVisibleColumns: (columns: Record<TableColumnKey, boolean>) => void;
  toggleColumn: (column: TableColumnKey) => void;
  
  setCompounds: (compounds: ExtendedCompound[]) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  
  // Utilitários
  resetFilters: () => void;
  resetTableState: () => void;
}

const defaultVisibleColumns: Record<TableColumnKey, boolean> = {
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
};

export const useCatalogStore = create<CatalogState>()(
  persist(
    (set) => ({
      // Estado inicial
      searchTerm: '',
      currentPage: 1,
      rowsPerPage: 10,
      sortColumn: 'id',
      sortOrder: 'asc',
      
      selectedCategory: 'todas',
      selectedCategories: [],
      
      visibleColumns: defaultVisibleColumns,
      
      compounds: [],
      isLoading: false,
      error: null,
      
      // Actions
      setSearchTerm: (term) => set({ searchTerm: term, currentPage: 1 }),
      setCurrentPage: (page) => set({ currentPage: page }),
      setRowsPerPage: (rows) => set({ rowsPerPage: rows, currentPage: 1 }),
      setSortColumn: (column) => set({ sortColumn: column, sortOrder: 'asc' }),
      setSortOrder: (order) => set({ sortOrder: order }),
      toggleSortOrder: () => set((state) => ({ 
        sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc' 
      })),
      
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      setSelectedCategories: (categories) => set({ selectedCategories: categories }),
      
      setVisibleColumns: (columns) => set({ visibleColumns: columns }),
      toggleColumn: (column) => set((state) => ({
        visibleColumns: {
          ...state.visibleColumns,
          [column]: !state.visibleColumns[column]
        }
      })),
      
      setCompounds: (compounds) => set({ compounds }),
      setIsLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      
      // Utilitários
      resetFilters: () => set({
        searchTerm: '',
        selectedCategory: 'todas',
        selectedCategories: [],
        currentPage: 1
      }),
      
      resetTableState: () => set({
        searchTerm: '',
        currentPage: 1,
        sortColumn: 'id',
        sortOrder: 'asc',
        selectedCategory: 'todas',
        selectedCategories: [],
        visibleColumns: defaultVisibleColumns
      }),
    }),
    {
      name: "molwise_catalog",
      partialize: (state) => ({
        // Persiste apenas configurações do usuário, não os dados
        rowsPerPage: state.rowsPerPage,
        sortColumn: state.sortColumn,
        sortOrder: state.sortOrder,
        visibleColumns: state.visibleColumns,
        selectedCategory: state.selectedCategory,
        selectedCategories: state.selectedCategories,
      }),
    }
  )
); 