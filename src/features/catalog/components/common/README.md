# Arquitetura de Pastas

Abaixo está a estrutura de pastas e arquivos principais relacionados à tabela de compostos químicos. Essa organização facilita a reutilização e manutenção dos componentes e hooks.

```
common/
├── CompoundTable.tsx           # Componente principal da tabela de compostos
├── CompoundTableToolbar.tsx    # Barra de ferramentas (busca, seleção de colunas)
├── CompoundTableHeader.tsx     # Cabeçalho da tabela (ordenação, títulos)
├── CompoundTableRows.tsx       # Linhas da tabela (dados, tratamento de vazio)
├── AdvancedFiltersPanel.tsx    # Painel de filtros avançados (faixas de valores)
├── TablePagination.tsx         # Paginação da tabela
├── useCompoundData.ts          # Hook para buscar e normalizar dados
├── useCompoundTable.ts         # Hook de estado da tabela (legado - migrado para Zustand)
├── useCompoundColumns.tsx      # Hook para definição das colunas
├── useColumnWidths.ts          # Hook para cálculo dinâmico das larguras
├── compoundFormatters.ts       # Utilitários de formatação/tradução de células
├── extractLabelText.ts         # Utilitário para extrair texto de labels
└── README.md                   # Documentação e guia de uso

store/
├── catalogStore.ts             # Zustand store para estado do catálogo
└── ...

hooks/
├── useCatalogData.ts           # Hook que integra store com dados
└── ...

domain/
├── types/
│   ├── ChemicalCompound.ts     # Tipos para compostos e filtros avançados
│   └── TableColumnKey.ts       # Tipos para chaves de colunas
└── ...
```

> Outros diretórios podem existir para entidades diferentes, seguindo o mesmo padrão de organização.

---

# Mapa de Arquivos do Catálogo

Este diretório contém os principais arquivos responsáveis pela renderização e funcionamento da tabela de compostos químicos (catálogo). Veja abaixo um mapa dos arquivos e suas funções:

## Componentes Visuais

- **CompoundTable.tsx**: Componente principal da tabela de compostos. Orquestra hooks de dados, estado e renderiza os subcomponentes visuais.
- **CompoundTableToolbar.tsx**: Barra de ferramentas da tabela, incluindo busca e seleção de colunas.
- **CompoundTableHeader.tsx**: Cabeçalho da tabela, responsável por ordenação e exibição dos títulos das colunas.
- **CompoundTableRows.tsx**: Renderiza as linhas da tabela, incluindo tratamento para ausência de resultados e formatação de fórmulas.
- **AdvancedFiltersPanel.tsx**: Painel de filtros avançados com faixas de valores, formas físicas e tipos de solubilidade.
- **TablePagination.tsx**: Componente de paginação da tabela.

## Hooks e Estado

- **useCompoundData.ts**: Hook para buscar e normalizar os dados dos compostos.
- **useCatalogData.ts**: Hook que integra o Zustand store com dados e filtros avançados.
- **useCompoundTable.ts**: Hook legado para gerenciar o estado da tabela (migrado para Zustand).
- **useCompoundColumns.tsx**: Hook que define as colunas da tabela, com suporte a tradução e labels dinâmicos.
- **useColumnWidths.ts**: Hook para cálculo dinâmico das larguras das colunas.

## Store e Estado Global

- **catalogStore.ts**: Zustand store centralizado para estado do catálogo (busca, filtros, ordenação, paginação, colunas visíveis, filtros avançados).

## Utilitários

- **compoundFormatters.ts**: Funções utilitárias para formatação e tradução dos dados das células.
- **extractLabelText.ts**: Função utilitária para extrair texto de labels ReactNode.

## Tipos

- **ChemicalCompound.ts**: Tipos para compostos químicos, filtros avançados e interfaces relacionadas.
- **TableColumnKey.ts**: Tipos para chaves de colunas da tabela.

> Estes arquivos trabalham juntos para fornecer uma tabela de catálogo flexível, reutilizável e fácil de manter, com suporte a filtros avançados e estado persistente.

# Compound Table Components

## Visão Geral da Arquitetura

Esta pasta contém a implementação modular da tabela de compostos químicos, seguindo boas práticas de separação de responsabilidades e reutilização de código. A arquitetura foi desenhada para facilitar a manutenção, extensão e criação de novas tabelas com comportamentos similares.

### 🆕 **Nova Arquitetura com Zustand**

A tabela agora utiliza **Zustand** para gerenciamento de estado global, oferecendo:

- **Estado persistente** (localStorage)
- **Filtros avançados** com faixas de valores
- **Reutilização** para futuros catálogos (orgânicos)
- **Performance otimizada** com memoização

### Componentes e Hooks

- **CompoundTable.tsx**: Componente principal. Orquestra os hooks de dados, estado e renderiza os subcomponentes visuais.
- **CompoundTableToolbar.tsx**: Renderiza o campo de busca e o dropdown de seleção de colunas.
- **CompoundTableHeader.tsx**: Renderiza o cabeçalho da tabela, incluindo ordenação e alinhamento.
- **CompoundTableRows.tsx**: Renderiza as linhas da tabela, incluindo tratamento para "sem resultados" e formatação de fórmulas.
- **AdvancedFiltersPanel.tsx**: Painel de filtros avançados com faixas de valores e seleções múltiplas.
- **TablePagination.tsx**: Renderiza a paginação da tabela.

#### Hooks e Utilitários

- **useCompoundColumns.tsx**: Hook que define as colunas da tabela, com suporte a tradução e labels dinâmicos.
- **useColumnWidths.ts**: Hook que calcula dinamicamente as larguras ideais das colunas.
- **useCatalogData.ts**: Hook que integra o Zustand store com dados e aplica filtros avançados.
- **compoundFormatters.ts**: Funções utilitárias para formatação e tradução de dados das células.
- **extractLabelText.ts**: Função utilitária para extrair texto de qualquer ReactNode de label.

---

## Fluxo de Dados e Responsabilidades

### **🔄 Novo Fluxo com Zustand**

1. **Dados**: O hook `useCompoundData` busca e normaliza os dados dos compostos.
2. **Estado Global**: O Zustand store (`catalogStore`) gerencia todo o estado da tabela.
3. **Integração**: O hook `useCatalogData` integra dados com estado e aplica filtros avançados.
4. **Colunas**: O hook `useCompoundColumns` define as colunas e labels.
5. **Renderização**: O componente principal orquestra os subcomponentes visuais.
6. **Formatação**: Utilitários centralizam a lógica de formatação/tradução.

### **🎯 Filtros Avançados (Fase 1)**

- **Faixas de valores**: Ponto de fusão, ebulição, densidade, massa molar
- **Seleções múltiplas**: Formas físicas, tipos de solubilidade
- **Estado persistente**: Filtros são salvos no localStorage
- **Interface intuitiva**: Painel expansível com controles visuais

---

## Como Criar Outras Tabelas Reutilizando a Arquitetura

### 1. Crie um novo componente principal (ex: `MyEntityTable.tsx`)

```tsx
import { useMyEntityData } from "../hooks/useMyEntityData";
import { useMyEntityStore } from "../store/myEntityStore";
import { useMyEntityColumns } from "./useMyEntityColumns";
import { useColumnWidths } from "../hooks/useColumnWidths";
import { CompoundTableToolbar } from "./CompoundTableToolbar";
import { CompoundTableHeader } from "./CompoundTableHeader";
import { CompoundTableRows } from "./CompoundTableRows";
import { TablePagination } from "./TablePagination";

export function MyEntityTable() {
  const { entities, isLoading, error } = useMyEntityData();
  const {
    searchTerm, setSearchTerm, currentPage, setCurrentPage,
    rowsPerPage, setRowsPerPage, totalPages, paginatedData,
    visibleColumns, setVisibleColumns, sortColumn, sortOrder, handleSort
  } = useMyEntityStore();
  const allColumns = useMyEntityColumns();
  const columnWidths = useColumnWidths(entities, allColumns, getCellValue);

  // Defina getCellValue conforme a estrutura dos seus dados

  return (
    <div className="...">
      <CompoundTableToolbar ... />
      <Table>
        <CompoundTableHeader ... />
        <CompoundTableRows ... />
      </Table>
      <TablePagination ... />
    </div>
  );
}
```

### 2. Crie um Zustand store para sua entidade

```tsx
// store/myEntityStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MyEntityState {
  // Estado similar ao catalogStore
  searchTerm: string;
  currentPage: number;
  rowsPerPage: number;
  sortColumn: string;
  sortOrder: "asc" | "desc";
  visibleColumns: Record<string, boolean>;
  // ... outros estados
}

export const useMyEntityStore = create<MyEntityState>()(
  persist(
    (set) => ({
      // Implementação similar ao catalogStore
    }),
    {
      name: "molwise_my_entity",
      partialize: (state) => ({
        // Persistir apenas os estados necessários
      }),
    }
  )
);
```

### 3. Crie um hook de colunas para sua entidade

```tsx
// useMyEntityColumns.tsx
import { useTranslations } from "next-intl";
import { useMemo } from "react";
export function useMyEntityColumns() {
  const t = useTranslations();
  return useMemo(
    () => [
      { key: "id", label: t("myEntity.tableHeaders.id") },
      { key: "name", label: t("myEntity.tableHeaders.name") },
      // ...outras colunas
    ],
    [t]
  );
}
```

### 4. Adapte o hook de estado e os utilitários conforme necessário

- Use o padrão de `catalogStore` para gerenciar estado global com Zustand.
- Adapte os utilitários de formatação conforme a necessidade dos seus dados.
- Implemente filtros avançados específicos para sua entidade, se necessário.

### 5. Reutilize os subcomponentes visuais

- Os componentes `CompoundTableToolbar`, `CompoundTableHeader` e `CompoundTableRows` são genéricos e podem ser usados em outras tabelas.
- O `AdvancedFiltersPanel` pode ser adaptado para diferentes tipos de filtros.
- Se necessário, crie variações específicas para sua entidade, mas mantenha a estrutura modular.

---

## 🆕 Funcionalidades Implementadas

### **Filtros Avançados (Fase 1)**

- ✅ **Faixas de valores numéricos**: Ponto de fusão, ebulição, densidade, massa molar
- ✅ **Seleções múltiplas**: Formas físicas, tipos de solubilidade
- ✅ **Estado persistente**: Filtros salvos automaticamente
- ✅ **Interface intuitiva**: Painel expansível com controles visuais
- ✅ **Contadores ativos**: Badge mostrando filtros aplicados

### **Estado Global com Zustand**

- ✅ **Persistência**: Estado salvo no localStorage
- ✅ **Performance**: Memoização e otimizações
- ✅ **Reutilização**: Preparado para catálogo de orgânicos
- ✅ **Debugging**: DevTools integrado

### **Melhorias na UX**

- ✅ **Formatação de fórmulas**: Subscritos automáticos (H₂O, CO₂)
- ✅ **Ordenação melhorada**: Suporte a traduções
- ✅ **Responsividade**: Layout adaptativo
- ✅ **Acessibilidade**: Tooltips e navegação por teclado

---

## Próximas Fases (Roadmap)

### **Fase 2: Filtros Avançados (Agrupamento)**

- [ ] Agrupar por categoria química
- [ ] Agrupar por faixas de valores
- [ ] Agrupar por solubilidade

### **Fase 3: Exportação de Dados**

- [ ] Exportar para PDF
- [ ] Exportar para Excel
- [ ] Exportar para CSV

### **Fase 4: Filtros Específicos para Orgânicos**

- [ ] Filtros por grupos funcionais
- [ ] Filtros por cadeias de carbono
- [ ] Filtros por reatividade

---

## Boas Práticas

- **Mantenha a lógica de dados e estado fora dos componentes visuais.**
- **Use Zustand para estado global e persistente.**
- **Prefira hooks e utilitários para lógica reutilizável.**
- **Documente as props e responsabilidades de cada subcomponente.**
- **Evite duplicação: extraia padrões comuns para hooks/utilitários.**
- **Teste os filtros avançados com diferentes conjuntos de dados.**

---

## Dúvidas ou Sugestões?

Abra uma issue ou contribua com melhorias!
