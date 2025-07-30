# Zustand Store - Catálogo de Compostos

## Visão Geral

O Zustand store centraliza todo o estado do catálogo de compostos químicos, oferecendo gerenciamento de estado global com persistência automática e performance otimizada.

## Arquitetura

### **Estado Centralizado**

```typescript
interface CatalogState {
  // Dados
  compounds: ExtendedCompound[];
  isLoading: boolean;
  error: string | null;

  // Busca e Filtros
  searchTerm: string;
  selectedCategory: CompoundCategory;
  selectedCategories: CompoundCategory[];

  // Ordenação
  sortColumn: keyof ExtendedCompound;
  sortOrder: "asc" | "desc";

  // Paginação
  currentPage: number;
  rowsPerPage: number;

  // Colunas Visíveis
  visibleColumns: Record<TableColumnKey, boolean>;

  // Filtros Avançados
  advancedFilters: AdvancedFilterState;
}
```

### **Actions Disponíveis**

```typescript
interface CatalogActions {
  // Dados
  setCompounds: (compounds: ExtendedCompound[]) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Busca e Filtros
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: CompoundCategory) => void;
  setSelectedCategories: (categories: CompoundCategory[]) => void;

  // Ordenação
  setSortColumn: (column: keyof ExtendedCompound) => void;
  toggleSortOrder: () => void;

  // Paginação
  setCurrentPage: (page: number) => void;
  setRowsPerPage: (rows: number) => void;

  // Colunas
  toggleColumn: (key: TableColumnKey) => void;

  // Filtros Avançados
  setAdvancedFiltersOpen: (isOpen: boolean) => void;
  setAdvancedFilters: (filters: BasicAdvancedFilters) => void;
  resetAdvancedFilters: () => void;

  // Reset
  resetFilters: () => void;
  resetTableState: () => void;
}
```

## Implementação

### **Store Principal**

```typescript
// catalogStore.ts
export const useCatalogStore = create<CatalogState>()(
  persist(
    (set) => ({
      // Estado inicial
      compounds: [],
      isLoading: false,
      error: null,
      searchTerm: "",
      selectedCategory: "todas",
      selectedCategories: [],
      sortColumn: "id",
      sortOrder: "asc",
      currentPage: 1,
      rowsPerPage: 10,
      visibleColumns: defaultVisibleColumns,
      advancedFilters: {
        isOpen: false,
        filters: defaultAdvancedFilters,
        isActive: false,
      },

      // Actions
      setCompounds: (compounds) => set({ compounds }),
      setIsLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      setSearchTerm: (searchTerm) => set({ searchTerm, currentPage: 1 }),
      setSelectedCategory: (selectedCategory) =>
        set({ selectedCategory, currentPage: 1 }),
      setSelectedCategories: (selectedCategories) =>
        set({ selectedCategories, currentPage: 1 }),
      setSortColumn: (sortColumn) => set({ sortColumn, sortOrder: "asc" }),
      toggleSortOrder: () =>
        set((state) => ({
          sortOrder: state.sortOrder === "asc" ? "desc" : "asc",
        })),
      setCurrentPage: (currentPage) => set({ currentPage }),
      setRowsPerPage: (rowsPerPage) => set({ rowsPerPage, currentPage: 1 }),
      toggleColumn: (key) =>
        set((state) => ({
          visibleColumns: {
            ...state.visibleColumns,
            [key]: !state.visibleColumns[key],
          },
        })),
      setAdvancedFiltersOpen: (isOpen) =>
        set((state) => ({
          advancedFilters: {
            ...state.advancedFilters,
            isOpen,
          },
        })),
      setAdvancedFilters: (filters) =>
        set((state) => ({
          advancedFilters: {
            ...state.advancedFilters,
            filters,
            isActive: true,
          },
        })),
      resetAdvancedFilters: () =>
        set((state) => ({
          advancedFilters: {
            ...state.advancedFilters,
            filters: defaultAdvancedFilters,
            isActive: false,
          },
        })),
      resetFilters: () =>
        set({
          searchTerm: "",
          selectedCategory: "todas",
          selectedCategories: [],
          advancedFilters: {
            isOpen: false,
            filters: defaultAdvancedFilters,
            isActive: false,
          },
          currentPage: 1,
        }),
      resetTableState: () =>
        set({
          sortColumn: "id",
          sortOrder: "asc",
          currentPage: 1,
          rowsPerPage: 10,
          visibleColumns: defaultVisibleColumns,
        }),
    }),
    {
      name: "molwise_catalog",
      partialize: (state) => ({
        searchTerm: state.searchTerm,
        selectedCategory: state.selectedCategory,
        selectedCategories: state.selectedCategories,
        sortColumn: state.sortColumn,
        sortOrder: state.sortOrder,
        currentPage: state.currentPage,
        rowsPerPage: state.rowsPerPage,
        visibleColumns: state.visibleColumns,
        advancedFilters: state.advancedFilters,
      }),
    }
  )
);
```

## Integração com Hooks

### **Hook de Dados**

```typescript
// useCatalogData.ts
export function useCatalogData() {
  const { compounds: rawCompounds, isLoading, error } = useCompoundData();
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

  // Aplicar filtros e ordenação
  const filteredData = useMemo(() => {
    let result = rawCompounds;

    // Busca
    if (searchTerm) {
      result = result.filter(/* lógica de busca */);
    }

    // Filtros de categoria
    if (selectedCategories.length > 0) {
      result = result.filter(/* lógica de categoria */);
    }

    // Filtros avançados
    if (advancedFilters.isActive) {
      result = applyAdvancedFilters(result, advancedFilters.filters);
    }

    return result;
  }, [rawCompounds, searchTerm, selectedCategories, advancedFilters]);

  // Ordenação
  const sortedData = useMemo(() => {
    return [...filteredData].sort(/* lógica de ordenação */);
  }, [filteredData, sortColumn, sortOrder]);

  // Paginação
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(start, start + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage]);

  return {
    paginatedData,
    isLoading,
    error,
    currentPage,
    rowsPerPage,
    totalPages: Math.ceil(filteredData.length / rowsPerPage),
    searchTerm,
    selectedCategories,
    sortColumn,
    sortOrder,
    totalCompounds: rawCompounds.length,
    filteredCount: filteredData.length,
    advancedFilters,
  };
}
```

## Vantagens do Zustand

### **1. Simplicidade**

- API simples e intuitiva
- Menos boilerplate que Redux
- TypeScript nativo

### **2. Performance**

- Renderizações otimizadas
- Memoização automática
- Bundle size pequeno

### **3. Persistência**

- Middleware de persistência integrado
- Controle granular sobre o que persistir
- Recuperação automática do estado

### **4. DevTools**

- Integração com Redux DevTools
- Debugging facilitado
- Time-travel debugging

### **5. Reutilização**

- Preparado para catálogo de orgânicos
- Padrão replicável para outras entidades
- Estado compartilhado entre componentes

## Padrões de Uso

### **1. Acessar Estado**

```typescript
const { searchTerm, setSearchTerm } = useCatalogStore();
```

### **2. Atualizar Estado**

```typescript
const { setSearchTerm, setCurrentPage } = useCatalogStore();

const handleSearch = (term: string) => {
  setSearchTerm(term);
  setCurrentPage(1); // Reset para primeira página
};
```

### **3. Estado Derivado**

```typescript
const { compounds } = useCatalogStore();
const totalCompounds = compounds.length;
```

### **4. Reset de Estado**

```typescript
const { resetFilters, resetTableState } = useCatalogStore();

const handleReset = () => {
  resetFilters();
  resetTableState();
};
```

## Persistência

### **Configuração**

```typescript
{
  name: "molwise_catalog", // Chave no localStorage
  partialize: (state) => ({
    // Apenas os campos que devem ser persistidos
    searchTerm: state.searchTerm,
    selectedCategory: state.selectedCategory,
    // ... outros campos
  }),
}
```

### **Campos Persistidos**

- `searchTerm`: Termo de busca
- `selectedCategory`: Categoria selecionada
- `selectedCategories`: Categorias múltiplas
- `sortColumn`: Coluna de ordenação
- `sortOrder`: Ordem de classificação
- `currentPage`: Página atual
- `rowsPerPage`: Linhas por página
- `visibleColumns`: Colunas visíveis
- `advancedFilters`: Filtros avançados

### **Campos Não Persistidos**

- `compounds`: Dados dos compostos (carregados dinamicamente)
- `isLoading`: Estado de carregamento
- `error`: Estado de erro

## Migração de Estado Local

### **Antes (useState)**

```typescript
const [searchTerm, setSearchTerm] = useState("");
const [currentPage, setCurrentPage] = useState(1);
const [sortColumn, setSortColumn] = useState("id");
// ... mais estados locais
```

### **Depois (Zustand)**

```typescript
const {
  searchTerm,
  setSearchTerm,
  currentPage,
  setCurrentPage,
  sortColumn,
  setSortColumn,
} = useCatalogStore();
```

## Benefícios da Migração

### **1. Estado Centralizado**

- Todos os estados relacionados em um lugar
- Eliminação de prop drilling
- Facilita debugging

### **2. Persistência Automática**

- Estado salvo automaticamente
- Recuperação ao recarregar
- Melhor UX

### **3. Reutilização**

- Preparado para catálogo de orgânicos
- Padrão replicável
- Menos duplicação de código

### **4. Performance**

- Renderizações otimizadas
- Memoização automática
- Bundle size reduzido

## Troubleshooting

### **Estado não persiste**

1. Verifique se o localStorage está habilitado
2. Confirme se o campo está no `partialize`
3. Verifique se não há erros no console

### **Performance lenta**

1. Use `partialize` para persistir apenas campos necessários
2. Evite persistir dados grandes
3. Considere usar `shallow` para comparações

### **Estado não atualiza**

1. Verifique se está usando as actions corretas
2. Confirme se o componente está inscrito no store
3. Verifique se não há erros de TypeScript

## Próximos Passos

### **1. Catálogo de Orgânicos**

- Reutilizar o padrão do store
- Adicionar filtros específicos
- Manter compatibilidade

### **2. Otimizações**

- Implementar seletores específicos
- Adicionar middleware customizado
- Otimizar persistência

### **3. Funcionalidades**

- Adicionar mais filtros avançados
- Implementar exportação
- Adicionar agrupamento

## Dúvidas ou Sugestões?

Abra uma issue ou contribua com melhorias!
