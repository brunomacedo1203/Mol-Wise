# Stores do Catálogo - Zustand

Este diretório contém os stores Zustand para gerenciamento de estado das tabelas de catálogo.

## Estrutura

```
store/
├── catalogStore.ts           # Store para compostos inorgânicos
├── organicCatalogStore.ts    # Store para compostos orgânicos (futuro)
└── README.md                 # Esta documentação
```

## Stores Disponíveis

### 1. `catalogStore.ts` - Compostos Inorgânicos

**Estado gerenciado:**

- Busca e filtros
- Paginação
- Ordenação
- Colunas visíveis
- Dados dos compostos

**Persistência:**

- Configurações do usuário (filtros, colunas, paginação)
- Dados não são persistidos (carregados dinamicamente)

### 2. `organicCatalogStore.ts` - Compostos Orgânicos

**Estado gerenciado:**

- Tudo do store inorgânico
- Filtros avançados (futuro):
  - Filtro por estado físico
  - Faixas de ponto de fusão/ebulição
  - Agrupamento

## Como Usar

### Hook Integrado (Recomendado)

```tsx
import { useCatalogData } from "@/features/catalog/hooks/common/useCatalogData";

function MyComponent() {
  const {
    paginatedData,
    isLoading,
    error,
    currentPage,
    totalPages,
    searchTerm,
    selectedCategories,
    sortColumn,
    sortOrder,
  } = useCatalogData();

  // Actions do store
  const {
    setSearchTerm,
    setCurrentPage,
    setSelectedCategories,
    toggleSortOrder,
  } = useCatalogStore();

  return <div>{/* Seu componente */}</div>;
}
```

### Acesso Direto ao Store

```tsx
import { useCatalogStore } from "@/features/catalog/store/catalogStore";

function MyComponent() {
  // Estado
  const searchTerm = useCatalogStore((state) => state.searchTerm);
  const currentPage = useCatalogStore((state) => state.currentPage);

  // Actions
  const setSearchTerm = useCatalogStore((state) => state.setSearchTerm);
  const resetFilters = useCatalogStore((state) => state.resetFilters);

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={resetFilters}>Limpar Filtros</button>
    </div>
  );
}
```

## Vantagens do Zustand

### ✅ **Reutilização**

- Mesma estrutura para compostos inorgânicos e orgânicos
- Componentes podem ser compartilhados
- Lógica de filtros reutilizável

### ✅ **Persistência**

- Configurações salvas automaticamente
- Usuário não perde preferências
- Filtros mantidos entre sessões

### ✅ **Performance**

- Renderização otimizada
- Apenas componentes necessários re-renderizam
- Estado centralizado

### ✅ **Desenvolvimento**

- DevTools para debug
- Tipagem forte
- Fácil de testar

## Migração do Hook Local

### Antes (useCompoundTable)

```tsx
const {
  searchTerm,
  setSearchTerm,
  currentPage,
  setCurrentPage,
  // ... mais props
} = useCompoundTable({ data: compounds });
```

### Depois (useCatalogData + Store)

```tsx
const {
  paginatedData,
  currentPage,
  totalPages,
  // ... dados processados
} = useCatalogData();

const {
  setSearchTerm,
  setCurrentPage,
  // ... actions
} = useCatalogStore();
```

## Implementação para Compostos Orgânicos

Para implementar a tabela de compostos orgânicos:

1. **Criar hook de dados:**

```tsx
// useOrganicCatalogData.ts
export function useOrganicCatalogData() {
  const { compounds, isLoading, error } = useOrganicCompoundData();
  const store = useOrganicCatalogStore();

  // Lógica similar ao useCatalogData
  // mas com filtros avançados
}
```

2. **Criar componente:**

```tsx
// OrganicCompoundTable.tsx
export function OrganicCompoundTable() {
  const data = useOrganicCatalogData();
  const actions = useOrganicCatalogStore();

  // Reutilizar componentes existentes
  return (
    <CompoundTableToolbar {...data} {...actions} />
    <CompoundTableHeader {...data} {...actions} />
    <CompoundTableRows {...data} />
  );
}
```

3. **Reutilizar componentes:**

- `CompoundTableToolbar`
- `CompoundTableHeader`
- `CompoundTableRows`
- `TablePagination`

## Próximos Passos

1. ✅ **Corrigir ordenação das colunas** (feito)
2. 🔄 **Migrar para Zustand** (em progresso)
3. 📋 **Implementar filtros avançados**
4. 📊 **Adicionar agrupamento**
5. 📤 **Implementar exportação**
6. 🧪 **Criar tabela de compostos orgânicos**

## Boas Práticas

- **Use o hook `useCatalogData`** para dados processados
- **Use o store diretamente** para actions simples
- **Mantenha a tipagem forte** em todos os stores
- **Documente novos filtros** no store
- **Teste a persistência** antes de fazer deploy
