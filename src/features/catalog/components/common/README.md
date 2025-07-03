# Mapa de Arquivos do Catálogo

Este diretório contém os principais arquivos responsáveis pela renderização e funcionamento da tabela de compostos químicos (catálogo). Veja abaixo um mapa dos arquivos e suas funções:

- **CompoundTable.tsx**: Componente principal da tabela de compostos. Orquestra hooks de dados, estado e renderiza os subcomponentes visuais.
- **CompoundTableToolbar.tsx**: Barra de ferramentas da tabela, incluindo busca e seleção de colunas.
- **CompoundTableHeader.tsx**: Cabeçalho da tabela, responsável por ordenação e exibição dos títulos das colunas.
- **CompoundTableRows.tsx**: Renderiza as linhas da tabela, incluindo tratamento para ausência de resultados.
- **TablePagination.tsx**: Componente de paginação da tabela.
- **useCompoundData.ts**: Hook para buscar e normalizar os dados dos compostos.
- **useCompoundTable.ts**: Hook para gerenciar o estado da tabela (busca, ordenação, paginação, colunas visíveis).
- **useCompoundColumns.tsx**: Hook que define as colunas da tabela, com suporte a tradução e labels dinâmicos.
- **useColumnWidths.ts**: Hook para cálculo dinâmico das larguras das colunas.
- **compoundFormatters.ts**: Funções utilitárias para formatação e tradução dos dados das células.
- **extractLabelText.ts**: Função utilitária para extrair texto de labels ReactNode.

> Estes arquivos trabalham juntos para fornecer uma tabela de catálogo flexível, reutilizável e fácil de manter.

# Compound Table Components

## Visão Geral da Arquitetura

Esta pasta contém a implementação modular da tabela de compostos químicos, seguindo boas práticas de separação de responsabilidades e reutilização de código. A arquitetura foi desenhada para facilitar a manutenção, extensão e criação de novas tabelas com comportamentos similares.

### Componentes e Hooks

- **CompoundTable.tsx**: Componente principal. Orquestra os hooks de dados, estado e renderiza os subcomponentes visuais.
- **CompoundTableToolbar.tsx**: Renderiza o campo de busca e o dropdown de seleção de colunas.
- **CompoundTableHeader.tsx**: Renderiza o cabeçalho da tabela, incluindo ordenação e alinhamento.
- **CompoundTableRows.tsx**: Renderiza as linhas da tabela, incluindo tratamento para "sem resultados".
- **TablePagination.tsx**: (Já existente) Renderiza a paginação da tabela.

#### Hooks e Utilitários

- **useCompoundColumns.tsx**: Hook que define as colunas da tabela, com suporte a tradução e labels dinâmicos.
- **useColumnWidths.ts**: Hook que calcula dinamicamente as larguras ideais das colunas.
- **useCompoundTable.ts**: Hook que centraliza o estado da tabela (busca, ordenação, paginação, colunas visíveis).
- **compoundFormatters.ts**: Funções utilitárias para formatação e tradução de dados das células.
- **extractLabelText.ts**: Função utilitária para extrair texto de qualquer ReactNode de label.

---

## Fluxo de Dados e Responsabilidades

1. **Dados**: O hook `useCompoundData` busca e normaliza os dados dos compostos.
2. **Estado da Tabela**: O hook `useCompoundTable` gerencia busca, ordenação, paginação e colunas visíveis.
3. **Colunas**: O hook `useCompoundColumns` define as colunas e labels, podendo ser customizado para outras tabelas.
4. **Renderização**: O componente principal orquestra os subcomponentes visuais, passando apenas as props necessárias.
5. **Formatação**: Utilitários centralizam a lógica de formatação/tradução, facilitando testes e reutilização.

---

## Como Criar Outras Tabelas Reutilizando a Arquitetura

### 1. Crie um novo componente principal (ex: `MyEntityTable.tsx`)

```tsx
import { useMyEntityData } from "../hooks/useMyEntityData";
import { useMyEntityTable } from "../hooks/useMyEntityTable";
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
  } = useMyEntityTable({ data: entities });
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

### 2. Crie um hook de colunas para sua entidade

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

### 3. Adapte o hook de estado e os utilitários conforme necessário

- Use o padrão de `useCompoundTable` para gerenciar busca, ordenação, paginação e colunas visíveis.
- Use/utilize/utilize ou adapte os utilitários de formatação conforme a necessidade dos seus dados.

### 4. Reutilize os subcomponentes visuais

- Os componentes `CompoundTableToolbar`, `CompoundTableHeader` e `CompoundTableRows` são genéricos e podem ser usados em outras tabelas, desde que as props estejam de acordo.
- Se necessário, crie variações específicas para sua entidade, mas mantenha a estrutura modular.

---

## Boas Práticas

- **Mantenha a lógica de dados e estado fora dos componentes visuais.**
- **Prefira hooks e utilitários para lógica reutilizável.**
- **Documente as props e responsabilidades de cada subcomponente.**
- **Evite duplicação: extraia padrões comuns para hooks/utilitários.**

---

## Dúvidas ou Sugestões?

Abra uma issue ou contribua com melhorias!
